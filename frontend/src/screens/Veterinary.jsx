import { useState, useEffect } from "react";
import HomeTitle from "../components/home/HomeTitle";
import image from "../assets/about.jpg";
import { Row, Col, Form, Button, Card, Container } from "react-bootstrap";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const AboutScreen = () => {
  const [location, setLocation] = useState("");
  const [veterinaries, setVeterinaries] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([20, 78]); // Default center (India)
  const [route, setRoute] = useState(null);
  const apiKey = "5b3ce3597851110001cf6248d441e502ecae4e58832a077c03f07dfd"; // OpenRouteService API Key

  const defaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const greenIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Get user's current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const newLocation = [position.coords.latitude, position.coords.longitude];
        const snappedLocation = await getNearestRoadPoint(newLocation[0], newLocation[1]);
        setUserLocation(snappedLocation);
        setMapCenter(snappedLocation); // Center map on user's location
      },
      (error) => console.error("Error getting user location", error)
    );
  }, []);

  // Reverse geocode to find the nearest road point
  const getNearestRoadPoint = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.openrouteservice.org/geocode/reverse?api_key=${apiKey}&point.lat=${lat}&point.lon=${lon}`
      );
      return [res.data.features[0].geometry.coordinates[1], res.data.features[0].geometry.coordinates[0]];
    } catch (error) {
      console.error("Error getting nearest road point", error);
      return [lat, lon]; // Fallback to original coordinates
    }
  };

  // Fetch route between user and veterinary
  const fetchRoute = async (vetLocation) => {
    if (!userLocation || !vetLocation) {
      alert("User or veterinary location not available");
      return;
    }

    const userRoadPoint = await getNearestRoadPoint(userLocation[0], userLocation[1]);
    const vetRoadPoint = await getNearestRoadPoint(vetLocation[0], vetLocation[1]);

    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${userRoadPoint[1]},${userRoadPoint[0]}&end=${vetRoadPoint[1]},${vetRoadPoint[0]}&radiuses=500,500`;

    try {
      const response = await axios.get(url);
      const coordinates = response.data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
      setRoute(coordinates);
    } catch (error) {
      console.error("Error fetching route", error);
    }
  };

  // // Fetch veterinarians based on entered location
  // const fetchCoordinatesAndSearch = async () => {
  //   try {
  //     const geoRes = await axios.get(
  //       `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(location)}&apiKey=PSQL9IjSl3vts5U0otOTk76FteP_IeabyGj-sE9mx3o`
  //     );

  //     if (geoRes.data.items.length === 0) {
  //       alert("Location not found");
  //       return;
  //     }

  //     const { lat, lng } = geoRes.data.items[0].position;
  //     setMapCenter([lat, lng]); // Update map center to searched location

  //     const vetRes = await axios.get(
  //       `https://discover.search.hereapi.com/v1/discover?at=${lat},${lng}&q=veterinary&limit=10&apiKey=PSQL9IjSl3vts5U0otOTk76FteP_IeabyGj-sE9mx3o`
  //     );

  //     setVeterinaries(vetRes.data.items);
  //   } catch (error) {
  //     console.error("Error fetching data", error);
  //   }
  // };
// Fetch veterinarians based on entered location (using Nominatim + Overpass API)
const fetchCoordinatesAndSearch = async () => {
  try {
    // 1️⃣ Geocode the entered location using Nominatim
    const geoRes = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`
    );

    if (geoRes.data.length === 0) {
      alert("Location not found");
      return;
    }

    const { lat, lon } = geoRes.data[0];
    setMapCenter([parseFloat(lat), parseFloat(lon)]);

    // 2️⃣ Fetch nearby veterinary clinics from OpenStreetMap (Overpass API)
    const overpassQuery = `
      [out:json];
      node
        [amenity=veterinary]
        (around:5000,${lat},${lon});
      out;
    `;

    const vetRes = await axios.get(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`
    );

    // 3️⃣ Convert the response into your expected structure
    const vets = vetRes.data.elements.map((el, idx) => ({
      id: idx,
      title: el.tags.name || "Unnamed Veterinary Clinic",
      address: { label: el.tags["addr:full"] || "Address unavailable" },
      position: { lat: el.lat, lng: el.lon },
    }));

    setVeterinaries(vets);
  } catch (error) {
    console.error("Error fetching data", error);
  }
};
  return (
    <Container fluid>
      <Row>
        <Col>
          <img src={image} alt="About Us" className="w-100 rounded-3 mt-4" />
          <HomeTitle title="Veterinary" />
        </Col>
      </Row>

      {/* Search Bar */}
      <Row className="about-content">
        <Col md={{ span: 8, offset: 2 }}>
          <Form className="d-flex my-3">
            <Form.Control
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Button variant="primary" onClick={fetchCoordinatesAndSearch} className="ms-2">
              Search
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Full-width Map */}
      <Row>
        <Col>
          <MapContainer center={mapCenter} zoom={13} style={{ height: "500px", width: "100%" }} key={mapCenter.toString()}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {userLocation && (
              <Marker position={userLocation} icon={greenIcon}>
                <Popup>Your Location</Popup>
              </Marker>
            )}
            {veterinaries.map((vet) => (
              <Marker
                key={vet.id}
                position={[vet.position.lat, vet.position.lng]}
                icon={defaultIcon}
                eventHandlers={{ click: () => fetchRoute([vet.position.lat, vet.position.lng]) }}
              >
                <Popup>
                  <strong>{vet.title}</strong>
                  <br />
                  {vet.address.label}
                  <br />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(vet.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on Google Maps
                  </a>
                </Popup>
              </Marker>
            ))}
            {route && <Polyline positions={route} color="blue" />}
          </MapContainer>
        </Col>
      </Row>

      {/* Veterinary Listings Below */}
      <Row className="mt-4">
        <Col md={{ span: 8, offset: 2 }}>
          <h4 className="text-center mb-3">Nearby Veterinaries</h4>
          {veterinaries.length === 0 ? (
            <p className="text-center">No veterinary services found</p>
          ) : (
            veterinaries.map((vet) => (
              <Card key={vet.id} className="mb-3">
                <Card.Body>
                  <Card.Title>{vet.title}</Card.Title>
                  <Card.Text>{vet.address.label}</Card.Text>
                  <Button
                    variant="success"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(vet.title)}`}
                    target="_blank"
                  >
                    View on Google Maps
                  </Button>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AboutScreen;

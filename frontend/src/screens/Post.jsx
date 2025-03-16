import React, { useState } from "react";
import HomeTitle from "../components/home/HomeTitle";
import image from "../assets/about.jpg";
import { Row, Col, Form, Button, Alert } from "react-bootstrap";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../slices/productsApiSlice";

const Post = () => {
  const [petName, setPetName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(""); // NEW: Price state
  const [file, setFile] = useState(null);
  const [uploadError, setUploadError] = useState("");

  const [successAlert, setSuccessAlert] = useState(false);

  // RTK Query hooks
  const [createProduct, { isLoading: isCreating, error: createError }] =
    useCreateProductMutation();
  const [uploadProductImage, { isLoading: isUploading, error: uploadErrorResponse }] =
    useUploadProductImageMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = "";

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "petstop");

      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dootjqnrq/image/upload", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        imageUrl = data.secure_url;
        console.log("Uploaded to Cloudinary:", imageUrl);
      } catch (error) {
        console.error("Cloudinary upload failed:", error);
        setUploadError("Image upload to Cloudinary failed. Please try again.");
        return;
      }
    }

    // Build product data with the new price field
    const productData = {
      user: "64f2c25d7f8b9b1f343e9d56",
      name: petName,
      image: imageUrl,
      brand: "Product Brand",
      category: "animal",
      description,
      price: parseFloat(price), // NEW: Added price
      reviews: [],
      rating: 0,
      numReviews: 0,
      countInStock: 5,
      isPublished: true,
      isOnSale: false,
      salePrice: 0.0,
      isPopular: false,
      color: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await createProduct(productData).unwrap();
      console.log("Product created successfully!");
      setSuccessAlert(true);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <>
      <Row>
        <Col md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
          <img src={image} alt="POST" className="w-100 rounded-3 mt-4" />
        </Col>
        <HomeTitle title="Post A Pet" />
      </Row>
      <Row className="about-content">
        <Col md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
          {uploadError && <Alert variant="danger">{uploadError}</Alert>}
          {successAlert && <Alert variant="success">Successfully added the product</Alert>}
          {createError && <Alert variant="danger">Error creating product</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="petName" className="mb-3">
              <Form.Label>Pet Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pet name"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="petCategory" className="mb-3">
              <Form.Label>Category of Pet</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="petDescription" className="mb-3">
              <Form.Label>Description of Pet</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter a detailed description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="petPrice" className="mb-3"> {/* NEW: Price Field */}
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter pet price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="petImage" className="mb-3">
              <Form.Label>Upload Pet Picture</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isCreating || isUploading}>
              {isCreating || isUploading ? "Posting..." : "Post Pet"}
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Post;

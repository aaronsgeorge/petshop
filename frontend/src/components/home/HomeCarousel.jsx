import { Row, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeCarousel = () => {
  return (
    <Row>
      <Carousel pause="hover" fade>
        <Carousel.Item className="text-white text-right">
          <Link to="/products">
            <img
              className="d-block w-100"
              src="/images/carousel-1.jpg"
              alt="First slide"
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/products">
            <img
              className="d-block w-100"
              src="/images/carousel-3.jpg"
              alt="Second slide"
            />
          </Link>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/products">
            <img
              className="d-block w-100"
              src="/images/carousel-2.jpg"
              alt="Third slide"
            />
          </Link>
        </Carousel.Item>
      </Carousel>
    </Row>
  );
};

export default HomeCarousel;

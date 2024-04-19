import { Row, Carousel } from "react-bootstrap";

const HomeCarousel = () => {
  return (
    <Row>
      <Carousel pause="hover" fade>
        <Carousel.Item className="text-white text-right">
          <img
            className="d-block w-100"
            src="/images/carousel-1.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carousel-3.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carousel-2.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </Row>
  );
};

export default HomeCarousel;

import { Row, Carousel } from "react-bootstrap";

const HomeCarousel = () => {
  return (
    <Row>
      <Carousel pause="hover" fade>
        <Carousel.Item className="text-white text-right">
          <img
            className="d-block w-100"
            src="/images/carousel1.png"
            alt="First slide"
          />
        </Carousel.Item>
        {/* <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carousel1.png"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/images/carousel1.png"
            alt="Third slide"
          />
        </Carousel.Item> */}
      </Carousel>
    </Row>
  );
};

export default HomeCarousel;

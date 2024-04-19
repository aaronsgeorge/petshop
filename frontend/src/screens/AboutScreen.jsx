import HomeTitle from "../components/home/HomeTitle";
import image from "../assets/about.jpg";
import { Row, Col } from "react-bootstrap";

const AboutScreen = () => {
  return (
    <>
      <Row>
        <Col md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
          <img src={image} alt="About Us" className="w-100 rounded-3 mt-4" />
        </Col>
        <HomeTitle title="About Us" />
      </Row>
      <Row className="about-content">
        <Col md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
          <p>
            This website is a project I used to practice full-stack programming.
            I just make up the fllowing content to fill the space XD.
          </p>
          <h4>About</h4>
          <p>
            Petizen is a company that is passionate about pets and their owners.
            We believe that pets are part of the family and deserve the best
            possible care. That's why we offer a wide range of high-quality pet
            products, from food and treats to toys and accessories. We also
            provide helpful information and resources to help you keep your pet
            happy and healthy.
          </p>
          <h4>Our Mission</h4>
          <p>
            Our mission is to provide pet owners with everything they need to
            give their pets the best possible life. We strive to offer products
            that are safe, healthy, and affordable. We also want to be a
            valuable resource for pet owners, providing them with the
            information and support they need to care for their pets.
          </p>
          <h4>Our Values</h4>
          <p>We are committed to the following values:</p>
          <ul>
            <li>
              Quality: We only offer high-quality products that we believe in.
            </li>
            <li>
              Safety: We are committed to the safety of pets and their owners.
            </li>
            <li>
              Affordability: We want to make our products accessible to all pet
              owners.
            </li>
            <li>
              Education: We believe that pet owners should have access to the
              information they need to care for their pets.
            </li>
            <li>
              Community: We are committed to building a strong community of pet
              owners.
            </li>
          </ul>
          <h4>Our Team</h4>
          <p>
            Our team of pet lovers is dedicated to providing you with the best
            possible service. We have a wealth of knowledge about pets and their
            care, and we are always happy to help you find the right products
            for your pet.
          </p>
          <h4>Our Commitment to You</h4>
          <p>
            We are committed to providing you with the best possible products,
            service, and resources. We want to help you give your pet the best
            possible life.
          </p>
          <h4>Join the Family</h4>
          <p>
            We invite you to join the Petizen family. We are committed to
            providing you with everything you need to give your pet the best
            possible life.
          </p>
        </Col>
      </Row>
    </>
  );
};

export default AboutScreen;

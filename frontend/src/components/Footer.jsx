import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/logo-white.png";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col xs={6} md={3}>
            <img src={logo} alt="Petizen logo" width={100} />
          </Col>
          <Col xs={6} md={3} className="mb-5">
            <h5>Contact Us</h5>
            <p>
              1111 Street Name,
              <br /> San Jose, CA, USA
            </p>
            <p>Phone: 123-456-7890</p>
            <p>
              Email:{" "}
              <a href="mailto:" className="text-decoration-none text-white">
                hello@123.com
              </a>
            </p>
          </Col>
          <Col xs={6} md={3} className="mb-5">
            <h5>Start Shopping</h5>
            <p>All Products</p>
            <p>Sales</p>
            <p>Toys</p>
            <p>Treats</p>
            <p>Holidays</p>
          </Col>
          <Col xs={6} md={3} className="mb-5">
            <h5>About Us</h5>
            <p>Who we are</p>
            <h5 className="mt-4">Follow Us</h5>
            <div className="fs-4 gap-3 d-flex">
              <FaFacebook />
              <FaInstagram />
              <FaPinterest />
              <FaYoutube />
            </div>
          </Col>
        </Row>
        <Row className="text-center">
          <hr />
          <div>Ember © {currentYear} All rights reserved.</div>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;

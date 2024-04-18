import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
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
            <Link to="/products">
              <p>All Products</p>
            </Link>
            <Link to="/sales">
              <p>Sales</p>
            </Link>
            <Link to="/products">
              <p>Toys</p>
            </Link>
            <Link to="/products">
              <p>Treats</p>
            </Link>
            <Link to="/products">
              <p>Holidays</p>
            </Link>
          </Col>
          <Col xs={6} md={3} className="mb-5">
            <h5>About Us</h5>
            <Link to="/about">
              <p>Who we are</p>
            </Link>
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
          <p>Ember © {currentYear} All rights reserved.</p>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;

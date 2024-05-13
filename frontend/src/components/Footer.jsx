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
      <Container className="px-4">
        <Row>
          <Col xs={6} md={3}>
            <img src={logo} alt="Petizen logo" width={100} />
            <p class="mt-3 fw-bold">MERN Project</p>
          </Col>
          <Col xs={6} md={3} className="mb-5">
            <h5>Contact Me</h5>
            <p>Ember Chen</p>
            <p>
              Portfolio Site:
              <br />
              <a href="https://ember-chen.site">ember-chen.site</a>
            </p>
            <p>
              GitHub: <a href="https://github.com/cchen-00">cchen-00</a>
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
            <div className="fs-4 gap-3 d-flex mt-3">
              <FaFacebook />
              <FaInstagram />
              <FaPinterest />
              <FaYoutube />
            </div>
          </Col>
        </Row>
        <Row className="text-center">
          <hr />
          <p className="fw-bold mt-3">
            Designed and Developed by{" "}
            <a href="https://ember-chen.site">Ember Chen</a>
          </p>
          <p>Copyright © {currentYear} All rights reserved.</p>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;

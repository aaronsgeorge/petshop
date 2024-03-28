import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header>
      <Navbar
        bg="light"
        data-bs-theme="light"
        expand="md"
        collapseOnSelect
        className="border-bottom"
      >
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} alt="Petizen logo" style={{ width: "100px" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link>
                <FaShoppingCart className="mb-1" />
                <span> Cart</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

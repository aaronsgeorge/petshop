import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
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
            <img src={logo} alt="Petizen logo" style={{ width: "160px" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/login">
                <Button className="rounded-pill px-3">
                  <FaUser className="me-2" />
                  <span>Sign in</span>
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

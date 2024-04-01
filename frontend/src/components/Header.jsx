import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";

import { FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        bg="light"
        data-bs-theme="light"
        expand="md"
        collapseOnSelect
        className="border-bottom"
        style={{ height: "80px" }}
      >
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} alt="Petizen logo" style={{ width: "160px" }} />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username" align="end">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Sign out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="/login">
                  <Button className="rounded-pill px-3">
                    <FaUser className="me-2" />
                    <span>Sign in</span>
                  </Button>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

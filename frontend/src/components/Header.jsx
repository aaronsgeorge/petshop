import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar
        bg="light"
        data-bs-theme="light"
        className="border-bottom"
        style={{ height: "80px" }}
      >
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} alt="Petizen logo" style={{ width: "160px" }} />
          </Navbar.Brand>

          <Nav className="ms-auto">
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="username" align="end">
                {userInfo.isAdmin && (
                  <>
                    <NavDropdown.Item href="/admin">
                      Admin dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </>
                )}
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
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

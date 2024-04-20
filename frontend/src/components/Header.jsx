import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import CartButton from "./cart/CartButton";
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
      <div
        style={{
          backgroundColor: "#e06811",
        }}
      >
        <p className="text-white text-center p-1 fw-bold m-0">
          <small>
            🚚&nbsp;&nbsp;&nbsp;FREE SHIPPING WHEN YOU SPEND $35&nbsp; &#129395;
          </small>
        </p>
      </div>
      <Navbar
        bg="light"
        data-bs-theme="light"
        className="border-bottom"
        style={{ height: "114px" }}
      >
        <Container className="gap-4 fw-bold header-text">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/sales">Sales</Nav.Link>
          </Nav>
          <Navbar.Brand href="/" className="mx-auto">
            <img src={logo} alt="Petizen logo" style={{ width: "110px" }} />
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          {userInfo ? (
            <NavDropdown title={userInfo.name} id="username" align="end">
              {userInfo.isAdmin && (
                <>
                  <NavDropdown.Item href="/admin/orders">
                    Admin dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                </>
              )}
              <NavDropdown.Item href="/account">Account</NavDropdown.Item>
              <NavDropdown.Item onClick={logoutHandler}>
                <span className="text-primary">Sign out</span>
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link href="/login">
              <Button className="rounded-pill px-3 btn-primary" size="sm">
                <span>Sign in</span>
              </Button>
            </Nav.Link>
          )}
          <Nav>
            <Nav.Link href="/cart">
              <CartButton />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

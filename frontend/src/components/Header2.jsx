import { useNavigate } from "react-router-dom";
import logo2 from "../assets/logo2.png";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import CartButton from "./cart/CartButton";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";

const Header2 = () => {
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
        <div
          style={{
            opacity: "0.8",
            transform: "scale(0.8)",
          }}
          className="text-white text-center p-1 fw-bold"
        >
          🚚&nbsp;&nbsp;&nbsp;FREE SHIPPING WHEN YOU SPEND $35&nbsp; &#129395;
        </div>
      </div>
      <Navbar
        bg="light"
        data-bs-theme="light"
        className="border-bottom"
        style={{ height: "114px" }}
      >
        <Container className="gap-4 fw-bold">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/sales">Sales</Nav.Link>
          </Nav>
          <Navbar.Brand href="/" className="mx-auto">
            <img src={logo2} alt="Petizen logo" style={{ width: "110px" }} />
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          {userInfo ? (
            <NavDropdown
              title={userInfo.name}
              id="username"
              align="end"
            >
              {userInfo.isAdmin && (
                <>
                  <NavDropdown.Item href="/admin/products">
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

export default Header2;

import { useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import ShippingMessage from "./ShippingMessage";
import NavUserButtons from "./NavUserButtons";
import CartButton from "../header/CartButton";
import HeaderSearch from "../header/HeaderSearch";
import { FiSearch } from "react-icons/fi";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);

  const location = useLocation();

  function hideSearchHandler() {
    setShowSearch(false);
  }

  function showSearchHandler() {
    setShowSearch(true);
  }

  const onClickSearchHandler = () => {
    const segments = location.pathname.split("/");
    const slicedPath = segments[1];
    // do not show header search on All Products page
    if (slicedPath === "products" || slicedPath === "search") {
      return;
    }
    showSearchHandler();
  };

  return (
    <header>
      {/* mobile version */}
      <Navbar
        bg="light"
        data-bs-theme="light"
        className="border-bottom d-block d-md-none pt-0"
        collapseOnSelect
        expand="md"
      >
        <ShippingMessage />
        <Container className="fw-bold header-text mt-2 ">
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="header-toggle"
          />
          <Navbar.Brand href="/" className="me-auto ms-2">
            <img src={logo} alt="Petizen logo" style={{ width: "64px" }} />
          </Navbar.Brand>

          <NavUserButtons />

          <Nav.Link onClick={onClickSearchHandler}>
            <Button variant="light" className="rounded-pill me-2 ms-4">
              <FiSearch />
            </Button>
          </Nav.Link>
          <Nav.Link href="/cart">
            <CartButton />
          </Nav.Link>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/products">Products</Nav.Link>
              <Nav.Link href="/sales">Sales</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/vet">Veterinary</Nav.Link>
              <Nav.Link href="/post">Post A Pet</Nav.Link>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* desktop version */}
      <Navbar
        bg="light"
        data-bs-theme="light"
        className="border-bottom d-none d-md-block pt-0"
      >
        <ShippingMessage />
        <Container className="gap-4 fw-bold header-text pt-2">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/sales">Sales</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/vet">Veterinary</Nav.Link>
            <Nav.Link href="/post">Post A Pet</Nav.Link>
          </Nav>

          <Navbar.Brand href="/" className="mx-auto">
            <img src={logo} alt="Petizen logo" style={{ width: "110px" }} />
          </Navbar.Brand>

          <NavUserButtons />

          <Nav>
            <Nav.Link onClick={onClickSearchHandler}>
              <Button variant="light" className="rounded-pill">
                <FiSearch />
              </Button>
            </Nav.Link>
            <Nav.Link href="/cart">
              <CartButton />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <HeaderSearch show={showSearch} onHide={hideSearchHandler} />
    </header>
  );
};

export default Header;

import { useEffect } from "react";
import { Nav, Container } from "react-bootstrap";
import PageTitle from "../components/PageTitle";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/admin" || location.pathname === "/admin/") {
      navigate("/admin/orders");
    }
  }, [navigate, location]);

  const segments = location.pathname.split("/");
  const slicedPath = segments[2];

  return (
    <div>
      <PageTitle title="Admin Dashboard" />
      <Nav
        variant="tabs"
        defaultActiveKey="orders"
        activeKey={slicedPath}
        className="fw-bold"
      >
        <Nav.Item>
          <Nav.Link href="/admin/orders" eventKey="orders">
            Orders
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="users" href="/admin/users">
            Users
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="products" href="/admin/products">
            Products
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Container className="pt-3 px-0 pb-5">
        <Outlet />
      </Container>
    </div>
  );
};

export default AdminScreen;

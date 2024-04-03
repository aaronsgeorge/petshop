import { Nav, Container } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";

const AdminScreen = () => {
  const location = useLocation();
  return (
    <div>
      <h2 className="py-4">Admin Dashboard</h2>
      <Nav
        variant="tabs"
        defaultActiveKey="/admin/orders"
        activeKey={location.pathname}
      >
        <Nav.Item>
          <Nav.Link href="/admin/orders" eventKey="/admin/orders">
            Orders
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/admin/users" href="/admin/users">
            Users
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/admin/products" href="/admin/products">
            Products
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Container className="py-3 px-0">
        <Outlet />
      </Container>
    </div>
  );
};

export default AdminScreen;

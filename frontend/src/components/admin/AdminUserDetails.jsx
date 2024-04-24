import { Link, useParams } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import AdminUserInfo from "./AdminUserInfo";
import AdminOrderHistory from "./AdminOrderHistory";
import { FaAngleLeft } from "react-icons/fa";
import { useGetUserDetailsQuery } from "../../slices/usersApiSlice";

const AdminUserDetails = () => {
  const { userId } = useParams();

  const { data: user, isLoading, error } = useGetUserDetailsQuery(userId);

  return (
    <div>
      <h6 className="fw-bold text-primary mt-3">
        <Link to="/admin/users" className="text-primary back-link fs-5 me-1">
          <FaAngleLeft />
        </Link>
        User Details
      </h6>

      {isLoading && <p>Loading...</p>}

      {error && <p>Error: {error?.data?.message || error.error}</p>}

      {user && (
        <Row className="justify-content-center py-4">
          <Col sm={12} md={4}>
            <AdminUserInfo user={user} />
          </Col>
          <Col sm={12} md={8}>
            <Card className="p-3">
              <AdminOrderHistory />
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default AdminUserDetails;

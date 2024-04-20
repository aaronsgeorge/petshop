import { Link, useParams, useNavigate } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";
import { FaAngleLeft, FaUserCircle } from "react-icons/fa";
import {
  useGetUserDetailsQuery,
  useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";

const AdminEditUser = () => {
  const { userId } = useParams();

  const navigator = useNavigate();

  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);

  const shippingAddress = user?.shippingAddress;

  const [deleteUser] = useDeleteUserMutation();

  const handleDeleteUser = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(user._id);
        toast.success("User deleted successfully");
        navigator("/admin/users");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

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
          <Col sm={8} md={6} lg={4} xl={3}>
            <Card className="user-info p-4">
              <div className="user-avatar">
                <FaUserCircle size={96} className="user-icon" />
                {user.isAdmin && <div className="admin-label">Admin</div>}
              </div>

              <label>User name</label>
              <p>{user?.name}</p>
              <label>Email</label>
              <p> {user?.email}</p>
              <label>User ID</label>
              <p>{user?._id}</p>

              {shippingAddress && (
                <>
                  <label>Shipping Address</label>
                  <p>
                    {shippingAddress.firstName} {shippingAddress.lastName}
                    <br />
                    {shippingAddress.address}
                    {", "}
                    {shippingAddress.city}
                    {", "}
                    {shippingAddress.postalCode}
                    {", "}
                    {shippingAddress.country}
                  </p>
                </>
              )}
              
              <Row className="mt-2">
                <Col>
                  <Button
                    variant="primary"
                    className="rounded-pill w-100"
                    size="sm"
                  >
                    Edit User
                  </Button>
                </Col>
                <Col>
                  <Button
                    variant="outline-danger"
                    className="rounded-pill w-100"
                    size="sm"
                    onClick={handleDeleteUser}
                  >
                    Delete User
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default AdminEditUser;

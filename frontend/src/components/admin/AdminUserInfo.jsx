import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useDeleteUserMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";

const AdminUserInfo = ({ user }) => {
  const navigator = useNavigate();

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

      <Button
        variant="outline-danger"
        className="rounded-pill mt-2"
        size="sm"
        onClick={handleDeleteUser}
      >
        Delete User
      </Button>
    </Card>
  );
};

export default AdminUserInfo;

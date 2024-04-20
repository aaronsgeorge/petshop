import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import ResetPasswordModal from "./ResetPasswordModal";
import EditProfileModal from "./EditProfileModal";

const AccountInfo = () => {
  const [showResetPassword, setShowResetPassword] = useState(false);

  const [showEditProfile, setShowEditProfile] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const { shippingAddress } = userInfo;

  return (
    <Card className="user-info px-3 py-4 mb-5">
      <div className="user-avatar">
        <FaUserCircle size={96} className="user-icon" />
        {userInfo.isAdmin && <div className="admin-label">Admin</div>}
      </div>
      
      <label>User name</label>
      <p>{userInfo?.name}</p>
      <label>Email</label>
      <p> {userInfo?.email}</p>
      <label>User ID</label>
      <p>{userInfo?._id}</p>

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
        variant="primary"
        className="rounded-pill mb-3"
        size="sm"
        onClick={() => setShowEditProfile(true)}
      >
        Edit Profile
      </Button>

      <Button
        variant="outline-primary"
        className="rounded-pill"
        size="sm"
        onClick={() => setShowResetPassword(true)}
      >
        Reset Password
      </Button>

      <EditProfileModal
        show={showEditProfile}
        onClose={() => setShowEditProfile(false)}
      />

      <ResetPasswordModal
        show={showResetPassword}
        onClose={() => setShowResetPassword(false)}
      />
    </Card>
  );
};

export default AccountInfo;

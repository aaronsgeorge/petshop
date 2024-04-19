import { useState } from "react";
import Input from "../Input";
import { Card, Button, Modal, Form } from "react-bootstrap";
import Loader from "../Loader";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  useProfileMutation,
  useUserPasswordMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";

const AccountInfo = () => {
  const [enteredValues, setEnteredValues] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [showResetPassword, setShowResetPassword] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }

  // const [updateProfile, { isLoading }] = useProfileMutation();

  const [updatePassword, { isLoading }] = useUserPasswordMutation();

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    if (enteredValues.password === enteredValues.currentPassword) {
      toast.error("New password cannot be the same as the current password");
      return;
    }

    if (enteredValues.password !== enteredValues.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await updatePassword({
        currentPassword: enteredValues.currentPassword,
        password: enteredValues.password,
      }).unwrap();
      toast.success("Password updated successfully");
      handleReset();
      setShowResetPassword(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  function handleReset() {
    setEnteredValues({
      currentPassword: "",
      password: "",
      confirmPassword: "",
    });
  }

  const formInvalid =
    enteredValues.password === "" ||
    enteredValues.confirmPassword === "" ||
    enteredValues.currentPassword === "";

  return (
    <Card className="user-info px-3 py-4 mb-5">
      <FaUserCircle size={96} className="user-icon mb-3" />
      <label>User name</label>
      <p>{userInfo?.name}</p>
      <label>Email</label>
      <p> {userInfo?.email}</p>
      <label>User ID</label>
      <p>{userInfo?._id}</p>
      <label>Admin?</label>
      <p>{userInfo?.isAdmin ? "Yes" : "No"}</p>
      <Button variant="primary" className="rounded-pill" size="sm">
        Edit Profile
      </Button>
      <Button
        variant="outline-primary"
        className="rounded-pill mt-3"
        size="sm"
        onClick={() => setShowResetPassword(true)}
      >
        Reset Password
      </Button>

      <Modal
        show={showResetPassword}
        onHide={() => setShowResetPassword(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Form onSubmit={resetPasswordHandler}>
          <Modal.Body>
            <Input
              type="password"
              controlId="currentPassword"
              label="Current password"
              value={enteredValues.currentPassword}
              onChange={(e) =>
                handleInputChange("currentPassword", e.target.value)
              }
              required
            />
            <Input
              type="password"
              controlId="newPassword"
              label="Current password"
              value={enteredValues.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              required
            />
            <Input
              type="password"
              controlId="confirmPassword"
              label="Confirm new password"
              value={enteredValues.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              required
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              className="rounded-pill px-4"
              onClick={() => setShowResetPassword(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="rounded-pill px-4"
              disabled={isLoading || formInvalid}
            >
              {isLoading && <Loader />}
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Card>
  );
};

export default AccountInfo;

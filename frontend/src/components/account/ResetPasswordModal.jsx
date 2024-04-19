import { useState } from "react";
import Input from "../Input";
import { Form, Button, Modal } from "react-bootstrap";
import Loader from "../Loader";
import { useUserPasswordMutation } from "../../slices/usersApiSlice";
import { toast } from "react-toastify";

const ResetPasswordModal = ({ show, onClose }) => {
  const [enteredValues, setEnteredValues] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }
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
      onClose();
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
    <Modal show={show} onHide={onClose}>
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
            onClick={onClose}
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
  );
};

export default ResetPasswordModal;

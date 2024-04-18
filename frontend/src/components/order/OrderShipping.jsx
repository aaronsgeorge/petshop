import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../slices/cartSlice";

const OrderShipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [enteredValues, setEnteredValues] = useState({
    firstName: shippingAddress.firstName || "",
    lastName: shippingAddress.lastName || "",
    address: shippingAddress.address || "",
    city: shippingAddress.city || "",
    postalCode: shippingAddress.postalCode || "",
    country: shippingAddress.country || "",
  });

  const [isSaved, setIsSaved] = useState(shippingAddress.isSaved || false);

  const getLable = (key) => {
    return key
      .replace(/([A-Z])/, " $1") // Add space before any uppercase letter
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  };

  const handleInputChange = (key, value) => {
    setEnteredValues((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ ...enteredValues, isSaved: true }));
    setIsSaved(true);
  };

  const editHandler = () => {
    dispatch(saveShippingAddress({ ...shippingAddress, isSaved: false }));
    setIsSaved(false);
  };

  const isFormValid = Object.values(enteredValues).some((val) => val === "");

  return (
    <>
      {isSaved ? (
        <>
          <Row>
            {Object.keys(enteredValues).map((key) => {
              return (
                <Col md={6} key={`entered${key}`} className="mb-2">
                  <span className="fw-bold text-black-50">
                    {getLable(key) + ": "}
                  </span>
                  {enteredValues[key]}
                </Col>
              );
            })}
          </Row>
          <div className="ms-auto d-flex">
            <Button
              type="submit"
              variant="outline-primary"
              size="sm"
              className="rounded-pill px-4 ms-auto"
              onClick={editHandler}
            >
              Edit
            </Button>
          </div>
        </>
      ) : (
        <Form onSubmit={submitHandler}>
          <Row>
            {Object.keys(enteredValues).map((key) => {
              return (
                <Col md={6} key={key}>
                  <Input
                    as={Col}
                    label={getLable(key)}
                    controlId={key}
                    type="text"
                    onChange={(event) =>
                      handleInputChange(key, event.target.value)
                    }
                    value={enteredValues[key]}
                    required
                    error="required"
                  />
                </Col>
              );
            })}
          </Row>

          <div className="ms-auto d-flex">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="rounded-pill px-4 ms-auto"
              disabled={isFormValid}
            >
              Save
            </Button>
          </div>
        </Form>
      )}
    </>
  );
};

export default OrderShipping;

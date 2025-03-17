import { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { savePaymentMethod } from "../../slices/cartSlice";

const OrderPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!window.Razorpay) {
      console.error("Razorpay SDK not loaded!");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
  };

  const handleRazorpayPayment = async () => {
    const options = {
      key: "rzp_test_YJYLa4ysTlacAY", // Replace with your Razorpay Key ID
      amount: 10000, // Amount in paise (10000 paise = ₹100)
      currency: "INR",
      name: "Your Store Name",
      description: "Payment for Order",
      image: "https://yourwebsite.com/logo.png",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Col>
            <Form.Check
              className="my-2"
              type="radio"
              label="Razorpay"
              id="Razorpay"
              name="paymentMethod"
              value="Razorpay"
              checked={paymentMethod === "Razorpay"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>
        <div className="d-flex">
          <Button
            type="submit"
            variant="primary"
            size="sm"
            className="rounded-pill px-4 ms-auto"
          >
            Save
          </Button>
        </div>
      </Form>
      <Button
        variant="success"
        size="sm"
        className="rounded-pill px-4 ms-auto mt-2"
        onClick={handleRazorpayPayment}
      >
        Pay with Razorpay
      </Button>
    </>
  );
};

export default OrderPayment;

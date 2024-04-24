import { Button, ListGroup } from "react-bootstrap";
import { useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from "../../slices/ordersApiSlice";
import { toast } from "react-toastify";

const PayPalPayment = ({ order, onPaid }) => {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (Object.keys(order).length > 0 && !order.isPaid) {
        loadPaypalScript();
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function createPayPalOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onError(err) {
    toast.error("Failed to pay with PayPal");
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      const orderId = order._id;
      await paymentHandler({ orderId, details });
    });
  }

  const paymentHandler = async ({ orderId, details }) => {
    try {
      await payOrder({ orderId, details });
      toast.success("Order is paid");
      onPaid();
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
      throw error;
    }
  };

  const markPaidHandler = async () => {
    if (!window.confirm("Are you sure you want to mark this order as paid?")) {
      return;
    }
    await paymentHandler({ orderId: order._id, details: { payer: {} } });
  };

  return (
    <ListGroup>
      <ListGroup.Item className="pt-3">
        {loadingPay && <p>Loading pay</p>}
        {isPending ? (
          <p>isPending</p>
        ) : (
          <PayPalButtons
            createOrder={createPayPalOrder}
            onApprove={onApprove}
            onError={onError}
          ></PayPalButtons>
        )}
        <small>
          <span style={{ wordBreak: "break-all" }}>
            Test account: sb-yj643q30574991@personal.example.com
          </span>
          <br />
          Password: Rj^%1t+E
        </small>
      </ListGroup.Item>
      <ListGroup.Item>
        <div>
          <small>TEST ONLY: Mark order as paid without Paypal.</small>
        </div>
        <Button
          variant="outline-secondary"
          className="btn-block rounded-pill px-4 my-2"
          onClick={markPaidHandler}
          size="sm"
        >
          Mark Order as Paid
        </Button>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default PayPalPayment;

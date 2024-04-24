import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import OrderShipping from "../components/order/OrderShipping";
import OrderPayment from "../components/order/OrderPayment";
import OrderPrice from "../components/order/OrderPrice";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateOrderMutation,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { toast } from "react-toastify";

const ReviewOrderScreen = () => {
  const [order, setOrder] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { shippingAddress } = cart;

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (Object.keys(order).length > 0) {
        dispatch(clearCartItems());
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [order, dispatch]);

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
      await paymentHandler(orderId, details);
    });
  }

  const paymentHandler = async (orderId, details) => {
    try {
      await payOrder({ orderId, details });
      toast.success("Order is paid");
      dispatch(clearCartItems());
      navigate(`/ordersuccess/${orderId}`);
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
      throw error;
    }
  };

  const markPaidHandler = () => {
    paymentHandler({ orderId: order._id, details: { payer: {} } });
  };

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    const isNoItemsInCart = cartItems.length === 0;
    if (isNoItemsInCart) {
      toast.error("Your cart is empty");
      return;
    }

    const isAddressValid =
      Object.keys(shippingAddress).length > 0 &&
      shippingAddress.isSaved &&
      Object.values(shippingAddress).every((val) => Boolean(val));
    if (!isAddressValid) {
      toast.error("Please save shipping address");
      return;
    }

    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod || "PayPal",
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      toast.success("Order created successfully");
      setOrder(res);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create order");
    }
  };

  const isDisabledOrderBtn =
    cartItems.length === 0 ||
    isLoading ||
    Object.keys(shippingAddress).length === 0 ||
    !shippingAddress.isSaved;

  const getItemPrice = (item) => {
    return item.isOnSale ? (
      <>
        <span className="text-decoration-line-through text-black-50">
          ${item.price}
        </span>{" "}
        ${item.salePrice} x{item.qty} = $
        {(item.qty * item.salePrice).toFixed(2)}
      </>
    ) : (
      <span>
        ${item.price} x {item.qty} = ${(item.qty * item.price).toFixed(2)}
      </span>
    );
  };

  const orderIsCreated = Object.keys(order).length > 0;

  return (
    <>
      <PageTitle title="Review Order" />

      <Row className="pt-2 pb-5">
        <Col md={7} lg={8}>
          <Card>
            <Card.Header>
              <h4 className="fs-5 fw-bold mb-0 text-black-50">Order Items</h4>
            </Card.Header>
            <Card.Body>
              {cartItems.length > 0 && (
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col xs={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                            width={48}
                          />
                        </Col>
                        <Col xs={5}>
                          <Link
                            to={`/product/${item._id}`}
                            className="text-black"
                          >
                            {item.name}
                          </Link>
                        </Col>
                        <Col xs={5} className="text-end">
                          {getItemPrice(item)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Header>
              <h4 className="fs-5 fw-bold mb-0 text-black-50">
                Shipping Address
              </h4>
            </Card.Header>
            <Card.Body>
              <OrderShipping />
            </Card.Body>
          </Card>

          <Card className="my-4">
            <Card.Header>
              <h4 className="fs-5 fw-bold mb-0 text-black-50">Payment</h4>
            </Card.Header>
            <Card.Body>
              <OrderPayment />
            </Card.Body>
          </Card>
        </Col>

        <Col md={5} lg={4}>
          <Card className="py-2">
            <ListGroup variant="flush">
              <OrderPrice />
              <ListGroup.Item>
                <Button
                  className="btn-block rounded-pill px-4 mt-2"
                  disabled={isDisabledOrderBtn}
                  onClick={placeOrderHandler}
                >
                  Place Order for ${cart.totalPrice}
                </Button>
                {orderIsCreated && (
                  <ListGroup>
                    <ListGroup.Item className="mt-3">
                      <div className="pb-4 pt-3">
                        <p className="fs-6 fw-bold mb-0">Order Created</p>
                        <small>
                          Order ID: {order?._id}
                          <br />
                          Use the button below to pay with PayPal.
                        </small>
                      </div>
                      {loadingPay && <p>Loading pay</p>}
                      {isPending ? (
                        <p>isPending</p>
                      ) : (
                        <div>
                          <div>
                            <PayPalButtons
                              createOrder={createPayPalOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                          </div>
                        </div>
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
                        <small>Mark order as paid without Paypal.</small>
                      </div>
                      <Button
                        variant="outline-secondary"
                        className="btn-block rounded-pill px-4 my-2"
                        onClick={markPaidHandler}
                      >
                        Mark Order as Paid
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ReviewOrderScreen;

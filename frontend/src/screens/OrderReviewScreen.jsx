import { useEffect } from "react";
import PageTitle from "../components/PageTitle";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import OrderShipping from "../components/order/OrderShipping";
import OrderPayment from "../components/order/OrderPayment";
import OrderPrice from "../components/order/OrderPrice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import { toast } from "react-toastify";

const ReviewOrderScreen = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const { shippingAddress } = cart;

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, []);

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
      toast.success("Order placed successfully");
      dispatch(clearCartItems());
      navigate(`/ordersuccess/${res._id}`);
    } catch (err) {
      toast.error(err);
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

  return (
    <>
      <PageTitle title="Review Order" />

      <Row className="pt-2 pb-5">
        <Col md={8}>
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

        <Col md={4}>
          <Card className="py-2">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Button
                  className="btn-block rounded-pill px-4 mb-2"
                  disabled={isDisabledOrderBtn}
                  onClick={placeOrderHandler}
                >
                  Place Order for ${cart.totalPrice}
                </Button>
              </ListGroup.Item>

              <OrderPrice />
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ReviewOrderScreen;

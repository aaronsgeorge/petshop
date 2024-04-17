import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  return (
    <>
      <PageTitle title="Shopping Cart" />
      <Row className="py-2">
        <Col md={8}>
          {cartItems.length === 0 ? (
            <p>
              Your cart is empty <Link to="/">Go Back</Link>
            </p>
          ) : (
            <ListGroup variant="flush" className="mb-5">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col xs={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col xs={4}>
                      <Link to={`/product/${item._id}`} className="text-black">
                        {item.name}
                      </Link>
                    </Col>
                    <Col xs={2}>${item.price}</Col>
                    <Col xs={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        size="sm"
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col xs={2}>
                      <Button
                        type="button"
                        variant="light"
                        size="sm"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <RiDeleteBin6Line />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card className="py-2">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2 className="fs-5 fw-bold text-black-50">
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                  items)
                </h2>
                <span className="fs-5">$ {totalPrice}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block rounded-pill px-3 mt-2"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Continue to checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;

import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../components/PageTitle.jsx";
import OrderPrice from "../components/order/OrderPrice.jsx";
import { RiDeleteBin6Line } from "react-icons/ri";
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
    navigate("/login?redirect=/revieworder");
  };

  return (
    <>
      <PageTitle title="Shopping Cart" />

      <Row className="pt-2 pb-5">
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
              <OrderPrice isInCart />

              <ListGroup.Item>
                <Button
                  className="btn-block rounded-pill px-4 mt-2"
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

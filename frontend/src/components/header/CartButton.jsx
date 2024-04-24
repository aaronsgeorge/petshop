import { FiShoppingCart } from "react-icons/fi";
import { Button, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";

const CartButton = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <Button
      variant="light"
      style={{ position: "relative" }}
      className="rounded-pill"
    >
      <FiShoppingCart />
      {cartItems.length > 0 && (
        <Badge pill className="cart-badge">
          {cartItems.length}
        </Badge>
      )}
    </Button>
  );
};

export default CartButton;

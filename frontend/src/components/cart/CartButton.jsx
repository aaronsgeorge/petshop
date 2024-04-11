import { GrCart } from "react-icons/gr";
import { Button, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";

const CartButton = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <Button variant="light" style={{ position: "relative" }}>
      <GrCart />
      {cartItems.length > 0 && (
        <Badge pill style={{ position: "absolute", top: "-4px" }}>
          {cartItems.length}
        </Badge>
      )}
    </Button>
  );
};

export default CartButton;

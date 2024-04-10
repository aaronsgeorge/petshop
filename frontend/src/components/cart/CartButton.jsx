import { GrCart } from "react-icons/gr";
import { Button, Badge } from "react-bootstrap";

const CartButton = () => {
  return (
    <Button variant="light">
      <GrCart />

      <Badge
        pill
        bg="success"
        style={{ position: "relative", top: "-12px" }}
      >
        88
      </Badge>
    </Button>
  );
};

export default CartButton;

import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import ImageContainer from "./ImageContainer";
import { addToCart } from "../slices/cartSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const isInStock = product && product.countInStock > 0;

  const addToCartHandler = () => {
    if (!isInStock) return;
    dispatch(addToCart({ ...product, qty: 1 }));
  };

  return (
    <Card className="my-2 p-3 rounded shadow-sm product-card" border="light">
      <Link to={`/product/${product._id}`}>
        <ImageContainer size="100%" src={product.image} alt={product.name} />
      </Link>
      <Card.Body className="px-0 py-2 pb-0">
        <Card.Title as="div" className="fs-6 fw-bold text-truncate">
          {product.name}
        </Card.Title>
        <Card.Text className="fs-5 d-flex">
          <span>${product.price}</span>
          <Button
            variant="outline-primary"
            size="sm"
            className="ms-auto rounded-pill px-3"
            disabled={!isInStock}
            onClick={addToCartHandler}
          >
            Add
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;

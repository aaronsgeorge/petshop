import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImageContainer from "./ImageContainer";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <ImageContainer size="100%" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Card.Title as="div" className="fs-4 fw-bold">
          {product.name}
        </Card.Title>
        <Card.Text className="fs-4">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;

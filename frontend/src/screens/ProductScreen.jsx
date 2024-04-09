import { useState } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Container,
} from "react-bootstrap";
import ImageContainer from "../components/ImageContainer";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);

  const navigate = useNavigate();
  const { id: productId } = useParams();
  const {
    data: product,
    error,
    refetch,
    isLoading,
  } = useGetProductDetailsQuery(productId);

  const isInStock = product && product.countInStock > 0;

  const handleAddToCart = () => {
    //
  };

  return (
    <Container>
      <Button onClick={() => navigate(-1)} className="mb-4" variant="light">
        Back
      </Button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {product && (
        <Row>
          <Col md={5} className="mb-4">
            <ImageContainer
              size="100%"
              src={product.image}
              alt={product.name}
              borderRadius="8px"
            />
          </Col>
          <Col md={7}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>$ {product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{isInStock ? "In Stock" : "Out of Stock"}</Col>
                </Row>
              </ListGroup.Item>
              {isInStock && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty:</Col>
                    <Col>
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  onClick={handleAddToCart}
                  className="rounded-pill px-5 my-2"
                  type="button"
                  disabled={!isInStock}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="mb-1">Description:</div>
                {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductScreen;

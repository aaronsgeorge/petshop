import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaAngleLeft } from "react-icons/fa6";
import { Row, Col, ListGroup, Button, Container } from "react-bootstrap";
import ImageContainer from "../components/ImageContainer";
import SaleTag from "../components/SaleTag";
import PopularTag from "../components/PopularTag";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { id: productId } = useParams();
  const {
    data: product,
    error,
    refetch,
    isLoading,
  } = useGetProductDetailsQuery(productId);

  const isInStock = product?.countInStock > 0;

  const isShowTags = product?.isOnSale || product?.isPopular;

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
  };

  return (
    <Container className="pt-4 pb-5">
      <button
        onClick={() => navigate(-1)}
        className="mb-2 d-flex align-items-center"
      >
        <FaAngleLeft />
        <span className="ms-2">Back</span>
      </button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error?.data?.message || error.error}</p>}
      {product && (
        <Row className="justify-content-md-center">
          <Col md={4} lg={4} xl={3} className="mb-4">
            <ImageContainer
              size="100%"
              src={product.image}
              alt={product.name}
              borderRadius="8px"
            />
          </Col>
          <Col md={8} lg={8} xl={6}>
            <ListGroup variant="flush">
              <ListGroup.Item className="pt-0">
                {isShowTags && (
                  <div className="gap-2 d-flex mb-3">
                    {product.isPopular && <PopularTag />}
                    {product.isOnSale && <SaleTag />}
                  </div>
                )}

                <h4>{product.name}</h4>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row className="align-items-center">
                  <Col>Price:</Col>
                  <Col>
                    {product.isOnSale ? (
                      <span>
                        <span className="fs-3 me-2">₹{product.salePrice}</span>
                        <span className="text-decoration-line-through text-black-50 fs-6">
                          ₹{product.price}
                        </span>
                      </span>
                    ) : (
                      <span className="fs-3">₹{product.price}</span>
                    )}
                  </Col>
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
                  onClick={addToCartHandler}
                  className="rounded-pill px-4 my-2"
                  type="button"
                  disabled={!isInStock}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <small className="mb-1 fw-bold text-black-50">
                  Description:
                </small>
                <div style={{ whiteSpace: "pre-line" }}>
                  {product.description}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductScreen;

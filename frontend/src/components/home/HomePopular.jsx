import HomeTitle from "./HomeTitle.jsx";
import { FaArrowRight } from "react-icons/fa";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "../../components/Product";
import { useGetProductsQuery } from "../../slices/productsApiSlice";

const HomePopular = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  return (
    <>
      <HomeTitle title="Most Popular" />

      {isLoading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products && (
          <Row>
            {products.map((product) => (
              <Col key={product._id} xs={6} sm={6} md={4} lg={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )
      )}

      <Row className="justify-content-md-center mt-4">
        <Col md={{ span: 6, offset: 3 }}>
          <Link to="/products">
            <Button className="rounded-pill px-5 fw-bold" size="lg">
              <span className="me-2">Shop All Products</span>
              <FaArrowRight />
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default HomePopular;

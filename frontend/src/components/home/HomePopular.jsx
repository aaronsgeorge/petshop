import HomeTitle from "./HomeTitle.jsx";
import { Row, Col, Button } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Product from "../product/Product.jsx";
import { useGetProductsQuery } from "../../slices/productsApiSlice";

const HomePopular = () => {
  const { data, isLoading, error } = useGetProductsQuery({
    keyword: "",
    pageNumber: 1,
    isPublished: true,
    isPopular: true,
    pageSize: 4,
  });

  return (
    <>
      <HomeTitle title="Most Popular" />

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error?.data?.message || error.error}</p>
      ) : data?.products.length === 0 ? (
        <p>No products found</p>
      ) : (
        data?.products && (
          <Row>
            {data?.products.map((product) => (
              <Col key={product._id} xs={6} sm={6} md={4} lg={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )
      )}

      <Row className="mt-1 pb-2 text-center">
        <Link to="/products">
          <Button className="rounded-pill px-5 fw-bold">
            <span className="me-2">Shop All Products</span>
            <FaArrowRight />
          </Button>
        </Link>
      </Row>
    </>
  );
};

export default HomePopular;

import HomeTitle from "./HomeTitle.jsx";
import { Row, Col, Button } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Product from "../product/Product.jsx";
import { useGetProductsQuery } from "../../slices/productsApiSlice";

const HomeSales = () => {
  const { data, isLoading, error } = useGetProductsQuery({
    keyword: "",
    pageNumber: 1,
    isPublished: true,
    isOnSale: true,
    pageSize: 4,
  });

  return (
    <>
      <HomeTitle title="On Sales" />

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

      <Row className="mt-1 pb-5 text-center">
        <Link to="/sales">
          <Button className="rounded-pill px-5 fw-bold">
            <span className="me-2">View More</span>
            <FaArrowRight />
          </Button>
        </Link>
      </Row>
    </>
  );
};

export default HomeSales;

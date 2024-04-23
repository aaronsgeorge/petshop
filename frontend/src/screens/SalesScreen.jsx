import PageTitle from "../components/PageTitle";
import { Row, Col } from "react-bootstrap";
import Product from "../components/product/Product.jsx";
import NoProductsFound from "../components/product/NoProductsFound.jsx";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";

const SalesScreen = () => {
  const { data, isLoading, error } = useGetProductsQuery({
    isPublished: true,
    isOnSale: true,
  });

  return (
    <div className="pb-5">
      <PageTitle title="Sales" />

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error?.data?.message || error.error}</p>}

      {data?.products.length === 0 ? (
        <NoProductsFound />
      ) : (
        data?.products && (
          <Row className="products-list">
            {data.products.map((product) => (
              <Col key={product._id} xs={6} sm={6} md={4} lg={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )
      )}
    </div>
  );
};

export default SalesScreen;

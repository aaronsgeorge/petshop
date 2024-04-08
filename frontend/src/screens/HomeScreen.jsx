import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";

const HomeScreen = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  return (
    <div>
      <h2>All Products</h2>
      {isLoading && <p>Loading...</p>}
      {products && (
        <div>
          <p>{products.length} products found</p>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;

import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product";
import { useGetProductsQuery } from "../../slices/productsApiSlice";

const AllProducts = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  return (
    <div>
      <h2>All Products</h2>
      {isLoading && <p>Loading...</p>}
      {!isLoading && !products && <p>No products found</p>}
      {products && (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default AllProducts;

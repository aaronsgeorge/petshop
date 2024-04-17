import PageTitle from "../PageTitle.jsx";
import { Row, Col } from "react-bootstrap";
import Product from "../../components/Product";
import { useGetProductsQuery } from "../../slices/productsApiSlice";

const AllProducts = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  return (
    <div>
      <PageTitle title="All Products" />

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
    </div>
  );
};

export default AllProducts;

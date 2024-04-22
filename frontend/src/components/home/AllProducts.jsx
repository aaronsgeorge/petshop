import PageTitle from "../PageTitle.jsx";
import { Row, Col } from "react-bootstrap";
import Product from "../product/Product.jsx";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import { PAGINATION_LIMIT } from "../../constants.js";

const AllProducts = () => {
  // const { data: products, isLoading } = useGetProductsQuery();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword: "",
    pageNumber: 1,
    isPublished: true,
    pageSize: PAGINATION_LIMIT,
  });
  
  return (
    <div className="pb-5">
      <PageTitle title="All Products" />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error?.data?.message || error.error}</p>}
      data.page: {data?.page} pages:{data?.pages} products.length:{" "}
      {data?.products.length}

      {data?.products.length === 0 ? (
        <p>No products found</p>
      ) : (
        data?.products && (
          <Row>
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

export default AllProducts;

import PageTitle from "../components/PageTitle.jsx";
import { Row, Col } from "react-bootstrap";
import Product from "../components/product/Product.jsx";
import Paginate from "../components/Paginate.jsx";
import SearchInput from "../components/SearchInput.jsx";
import NoProductsFound from "../components/product/NoProductsFound.jsx";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import { PAGINATION_LIMIT } from "../constants.js";

const AllProductsScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
    isPublished: true,
    pageSize: PAGINATION_LIMIT,
  });

  return (
    <div className="pb-5 all-products">
      <PageTitle title="All Products" />
      <Row className="mb-4">
        <Col sm="12" md="6">
          <SearchInput />
        </Col>
      </Row>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error?.data?.message || error.error}</p>}

      {data?.products.length === 0 ? (
        <NoProductsFound />
      ) : (
        data?.products && (
          <>
            <Row>
              {data.products.map((product) => (
                <Col key={product._id} xs={6} sm={6} md={4} lg={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <div className="mt-4">
              <Paginate page={data.page} pages={data.pages} keyword={keyword} />
            </div>
          </>
        )
      )}
    </div>
  );
};

export default AllProductsScreen;

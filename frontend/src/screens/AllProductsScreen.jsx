import PageTitle from "../components/PageTitle.jsx";
import { Row, Col } from "react-bootstrap";
import Product from "../components/product/Product.jsx";
import Paginate from "../components/product/Paginate.jsx";
import SearchInput from "../components/product/SearchInput.jsx";
import CategoryButton from "../components/product/CategoryButton.jsx";
import SortButton from "../components/product/SortButton.jsx";
import NoProductsFound from "../components/product/NoProductsFound.jsx";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import { PAGINATION_LIMIT } from "../constants.js";

const AllProductsScreen = () => {
  const { pageNumber, keyword, category, sort } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
    isPublished: true,
    pageSize: PAGINATION_LIMIT,
    category,
    sort,
  });

  return (
    <div className="pb-5 all-products">
      <PageTitle title="All Products" />
      <Row>
        <Col sm="12" md="6" className="mb-4">
          <SearchInput />
        </Col>
        <Col className="d-flex mb-4">
          <span className="ms-auto me-3">
            <CategoryButton />
          </span>
          <SortButton />
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
              <Paginate
                page={data.page}
                pages={data.pages}
                keyword={keyword}
                category={category}
                sort={sort}
              />
            </div>
          </>
        )
      )}
    </div>
  );
};

export default AllProductsScreen;

import { Row, Col } from "react-bootstrap";
import HomeTitle from "./HomeTitle.jsx";
import { redirectProductSearch } from "../../utils/navigationUtils.js";

const HomeCatergories = () => {
  const categoryRedirectHandler = (category) => {
    redirectProductSearch({ category });
  };

  return (
    <>
      <HomeTitle title="Shop by Category" />
      <Row className="mt-3 d-flex align-items-center">
        <Col xs={6} sm={6} md={4}>
          <img
            src="/images/category1.png"
            alt="Shop toys"
            className="category-img"
            onClick={() => categoryRedirectHandler("toys")}
          />
        </Col>
        <Col xs={6} sm={6} md={4}>
          <img
            src="/images/category2.png"
            alt="Shop treats"
            className="category-img"
            onClick={() => categoryRedirectHandler("treats")}
          />
        </Col>
        <Col xs={6} sm={6} md={4}>
          <img
            src="/images/category3.png"
            alt="Shop Holiday Deals"
            className="category-img"
            onClick={() => categoryRedirectHandler("holidays")}
          />
        </Col>
      </Row>
    </>
  );
};

export default HomeCatergories;

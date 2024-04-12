import { Row, Col } from "react-bootstrap";
import HomeTitle from "./HomeTitle.jsx";

const HomeCatergories = () => {
  return (
    <>
      <HomeTitle title="Shop by Category" />
      <Row className="mt-3 d-flex align-items-center">
        <Col xs={6} sm={6} md={4}>
          <img
            src="/images/category1.png"
            alt="Shop Toy"
            className="category-img"
          />
        </Col>
        <Col xs={6} sm={6} md={4}>
          <img
            src="/images/category2.png"
            alt="Shop Food"
            className="category-img"
          />
        </Col>
        <Col xs={6} sm={6} md={4}>
          <img
            src="/images/category3.png"
            alt="Shop Holiday Deals"
            className="category-img"
          />
        </Col>
      </Row>
    </>
  );
};

export default HomeCatergories;

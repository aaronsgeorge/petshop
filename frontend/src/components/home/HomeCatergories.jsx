import { Row, Col } from "react-bootstrap";
import HomeTitle from "./HomeTitle.jsx";

const HomeCatergories = () => {
  return (
    <>
      <HomeTitle title="Shop by Category" />
      <Row className="my-3">
        <Col>
          <img
            src="/images/category1.png"
            alt="Shop Toy"
            className="category-img"
          />
        </Col>
        <Col>
          <img
            src="/images/category2.png"
            alt="Shop Food"
            className="category-img"
          />
        </Col>
        <Col>
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

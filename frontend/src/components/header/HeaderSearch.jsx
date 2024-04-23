import SearchInput from "../product/SearchInput";
import { Row, Col } from "react-bootstrap";
import OutsideClickHandler from "react-outside-click-handler";

const HeaderSearch = ({ show, onHide }) => {
  return (
    <>
      <OutsideClickHandler onOutsideClick={onHide}>
        <div className={`header-search ${show ? "show" : "hide"}`}>
          <Row className="justify-content-center py-4 px-3">
            <Col sm={12} md={8} lg={6}>
              <SearchInput />
            </Col>
          </Row>
        </div>
      </OutsideClickHandler>
    </>
  );
};

export default HeaderSearch;

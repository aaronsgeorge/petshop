import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import AccountInfo from "../components/account/AccountInfo";

const AccountScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <PageTitle title={`Hi, ${userInfo?.name}`} />

      <Row className="pb-5">
        <Col md={3}>
          <AccountInfo />
        </Col>

        <Col md={9}>
          <Outlet />
        </Col>
      </Row>
    </>
  );
};

export default AccountScreen;

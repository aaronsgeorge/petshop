import { useSelector } from "react-redux";
import PageTitle from "../components/PageTitle";
import { FaUserCircle } from "react-icons/fa";
import { Row, Col, Card, Button } from "react-bootstrap";

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <PageTitle title={`Hi, ${userInfo?.name}`} />
      <Row>
        <Col md={4}>
          <Card className="user-info px-3 py-4 mb-5">
            <FaUserCircle size={96} className="user-icon mb-3" />
            <label>User name</label>
            <p>{userInfo?.name}</p>
            <label>Email</label>
            <p> {userInfo?.email}</p>
            <label>User ID</label>
            <p>{userInfo?._id}</p>
            <label>Admin?</label>
            <p>{userInfo?.isAdmin ? "Yes" : "No"}</p>
            <Button variant="primary" className="rounded-pill" size="sm">
              Edit Profile
            </Button>
            <Button
              variant="outline-primary"
              className="rounded-pill mt-3"
              size="sm"
            >
              Reset Password
            </Button>
          </Card>
        </Col>

        <Col md={8}>
          <h5>Orders</h5>
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;

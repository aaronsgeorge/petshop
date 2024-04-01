import { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useLoginMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const redirect = search ? new URLSearchParams(search).get("redirect") : "/";

  useEffect(() => {
    if (userInfo) {
      navigator(redirect);
    }
  }, [navigator, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigator(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error?.error || "Unknown Error");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center py-5">
        <Col xs={12} md={6} lg={5} xl={4}>
          <Card className="p-4">
            <h2 className="mb-4 mt-2">Sign In</h2>
            <Form onSubmit={submitHandler} className="d-grid">
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                ></Form.Control>
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="mt-4 rounded-pill px-4 "
                disabled={isLoading}
              >
                {isLoading && <Loader />}
                <span className="ms-2">Sign In</span>
              </Button>
            </Form>

            <Row className="py-3">
              <Col>
                New Customer?{" "}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : `/register`}
                >
                  Register
                </Link>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginScreen;

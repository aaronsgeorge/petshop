import { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const redirect = search ? new URLSearchParams(search).get("redirect") : "/";

  useEffect(() => {
    if (userInfo) {
      navigator(redirect);
    }
  }, [navigator, redirect, userInfo]);

  useEffect(() => {
    if (form.password && form.confirmPassword) {
      setForm((currentForm) => {
        if (currentForm.password !== currentForm.confirmPassword) {
          return {
            ...currentForm,
            errorMessage: "Passwords do not match",
          };
        } else {
          return {
            ...currentForm,
            errorMessage: "",
          };
        }
      });
    }
  }, [form.password, form.confirmPassword]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form).unwrap();
      dispatch(setCredentials({ ...res }));
      navigator(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error?.error || "Unknown Error");
    }
  };

  const { errorMessage, ...formWithoutError } = form;
  const isFormInvalid =
    isLoading ||
    errorMessage ||
    !Object.values(formWithoutError).every(Boolean);

  return (
    <Container>
      <Row className="justify-content-md-center py-5">
        <Col xs={12} md={6} lg={5} xl={4}>
          <Card className="my-2 p-4 rounded shadow" border="light">
            <h2 className="mb-4 mt-2">Sign Up</h2>
            <Form onSubmit={submitHandler} className="d-grid">
              <Form.Group controlId="username">
                <Form.Label>User name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="User name"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email" className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="confirm-password" className="mt-3">
                <Form.Label> Confirm Password</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  type="password"
                  placeholder="Enter password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                ></Form.Control>
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                className="mt-4 rounded-pill px-4 "
                disabled={isFormInvalid}
              >
                {isLoading && <Loader />}
                <span className="ms-2">Sign Up</span>
              </Button>
            </Form>
            {form.errorMessage && (
              <p className="mt-3 text-info">{form.errorMessage}</p>
            )}

            <Row className="py-3">
              <Col>
                Already have an account?{" "}
                <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>
                  Sign in
                </Link>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterScreen;

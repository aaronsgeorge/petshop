import { Form } from "react-bootstrap";

const Input = ({
  as: component,
  label,
  controlId,
  inputAs,
  error,
  ...props
}) => {
  return (
    <>
      <Form.Group as={component} controlId={controlId} className="pb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Control as={inputAs} {...props} />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

export default Input;

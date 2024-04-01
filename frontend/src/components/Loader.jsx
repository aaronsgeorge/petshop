import { Spinner } from "react-bootstrap";
const Loader = () => {
  return (
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
  );
};
export default Loader;

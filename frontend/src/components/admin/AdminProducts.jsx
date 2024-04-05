import { Button } from "react-bootstrap";
import NewProduct from "./NewProduct";

const AdminProducts = () => {
  return (
    <div>
      <Button className="btn btn-primary">Create Product</Button>
      <NewProduct />
    </div>
  );
};

export default AdminProducts;

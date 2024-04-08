import { Button, Table } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import NewProduct from "./NewProduct";
import ImageContainer from "../ImageContainer";
import { useGetProductsQuery } from "../../slices/productsApiSlice";

const AdminProducts = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  return (
    <div>
      <h1>Admin Products</h1>
      {isLoading && <p>Loading...</p>}
      {!isLoading && !products && <p>No products found</p>}

      {products && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <ImageContainer
                    src={product.image}
                    size="100px"
                    alt={product.name}
                    borderRadius="4px"
                  />
                </td>
                <td>
                  {product.name}
                  <p style={{ color: "#6b6b6b", fontSize: "12px" }}>
                    {`ID: ${product._id}`}
                  </p>
                </td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <Button variant="light" className="mx-2">
                    <FaRegEdit />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Button className="btn btn-primary">Create Product</Button>
      <NewProduct />
    </div>
  );
};

export default AdminProducts;

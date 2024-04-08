import { useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import NewProduct from "./NewProduct";
import ImageContainer from "../ImageContainer";
import { useGetProductsQuery } from "../../slices/productsApiSlice";

const AdminProducts = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data: products, isLoading, refetch } = useGetProductsQuery();

  return (
    <div>
      <div className="d-flex align-items-center py-4">
        <span className="fs-4">Admin Products</span>
        <Button className="btn btn-primary ms-auto" onClick={handleShow}>
          Create Product
        </Button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found</p>
      ) : (
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
                  <p className="fw-bold mb-0">{product.name}</p>
                  <p className="text-secondary fs-8">{`ID: ${product._id}`}</p>
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

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewProduct onClose={handleClose} onRefetchProducts={refetch} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminProducts;

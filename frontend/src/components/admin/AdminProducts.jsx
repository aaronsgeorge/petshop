import { useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import NewProduct from "./NewProduct";
import EditProduct from "./EditProduct";
import ImageContainer from "../ImageContainer";
import { useGetProductsQuery } from "../../slices/productsApiSlice";

const AdminProducts = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  const { data: products, isLoading, refetch } = useGetProductsQuery();

  const handleClickEditBtn = (product) => {
    setSelectedProduct(product);
    handleShowEditModal();
  };

  return (
    <div>
      <div className="d-flex align-items-center py-4">
        <span className="fs-4">Admin Products</span>
        <Button
          className="btn btn-primary ms-auto"
          onClick={handleShowCreateModal}
        >
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
                  <Button
                    variant="light"
                    className="mx-2"
                    onClick={() => handleClickEditBtn(product)}
                  >
                    <FaRegEdit />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showCreateModal} onHide={handleCloseCreateModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewProduct
            onClose={handleCloseCreateModal}
            onRefetchProducts={refetch}
          />
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProduct product={selectedProduct} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminProducts;

import { useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import NewProduct from "./NewProduct";
import EditProduct from "./EditProduct";
import ImageContainer from "../ImageContainer";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";

const AdminProducts = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = () => setShowEditModal(true);

  const { data: products, isLoading, refetch } = useGetProductsQuery();

  const [deleteProduct] = useDeleteProductMutation();

  const handleClickEditBtn = (product) => {
    setSelectedProduct(product);
    handleShowEditModal();
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center py-3">
        <Button
          className="btn btn-primary ms-auto rounded-pill px-4"
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
              <th>Count in Stock</th>
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
                <td>{product.countInStock}</td>
                <td>{product.category}</td>
                <td>
                  <Button
                    variant="light"
                    className="mx-2"
                    onClick={() => handleClickEditBtn(product)}
                  >
                    <FaRegEdit />
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    <RiDeleteBin6Line color="red" />
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
          <NewProduct onClose={handleCloseCreateModal} />
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProduct
            product={selectedProduct}
            onClose={handleCloseEditModal}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminProducts;

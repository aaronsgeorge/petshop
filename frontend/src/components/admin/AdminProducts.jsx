import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaRegEdit, FaCheck } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import ProductModal from "./ProductModal";
import ImageContainer from "../ImageContainer";
import SaleTag from "../SaleTag";
import PopularTag from "../PopularTag";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice";
import { toast } from "react-toastify";

const AdminProducts = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const closeCreateModalHandler = () => setShowCreateModal(false);
  const showCreateModalHandler = () => setShowCreateModal(true);

  const closeEditModalHandler = () => setShowEditModal(false);
  const showEditModalHandler = () => setShowEditModal(true);

  const { data: products, isLoading, refetch } = useGetProductsQuery();

  const [deleteProduct] = useDeleteProductMutation();

  const clickEditBtnHandler = (product) => {
    setSelectedProduct(product);
    showEditModalHandler();
  };

  const deleteProductHandler = async (id) => {
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
          onClick={showCreateModalHandler}
        >
          Create Product
        </Button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <Table striped hover responsive className="table-style">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Tags</th>
              <th>In Stock</th>
              <th>Category</th>
              <th>Published</th>
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
                  <small className="text-secondary">{`ID: ${product._id}`}</small>
                </td>
                <td>
                  {product.isOnSale ? (
                    <span>
                      <span className="text-decoration-line-through text-black-50">
                        ${product.price}
                      </span>
                      <span className="ms-2">${product.salePrice}</span>
                    </span>
                  ) : (
                    <span>${product.price}</span>
                  )}
                </td>
                <td>
                  <div className="gap-1 d-flex">
                    {product.isOnSale && <SaleTag />}
                    {product.isPopular && <PopularTag />}
                  </div>
                </td>
                <td>{product.countInStock}</td>
                <td className="text-capitalize">{product.category}</td>
                <td>
                  {product.isPublished && <FaCheck className="text-success" />}
                </td>
                <td className="text-nowrap">
                  <Button
                    size="sm"
                    variant="light"
                    className="me-2"
                    onClick={() => clickEditBtnHandler(product)}
                  >
                    <FaRegEdit />
                  </Button>
                  <Button
                    size="sm"
                    variant="light"
                    className="text-primary"
                    onClick={() => deleteProductHandler(product._id)}
                  >
                    <RiDeleteBin6Line />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Create Product */}
      <ProductModal
        show={showCreateModal}
        isCreate
        onHide={closeCreateModalHandler}
      />

      {/* Edit Product */}
      <ProductModal
        show={showEditModal}
        product={selectedProduct}
        onHide={closeEditModalHandler}
      />
    </div>
  );
};

export default AdminProducts;

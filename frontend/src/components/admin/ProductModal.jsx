import { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../Loader";
import Input from "../Input";
import ImageContainer from "../ImageContainer";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
  useUpdateProductMutation,
} from "../../slices/productsApiSlice";
import { DEFAULT_IMAGE, CATEGORY_TYPES } from "../../constants";
import { toast } from "react-toastify";

const ProductModal = ({ show, onHide, product }) => {
  const [image, setImage] = useState("");
  const [enteredValues, setEnteredValues] = useState({
    name: "",
    price: 0,
    category: "",
    description: "",
    countInStock: 0,
    image: DEFAULT_IMAGE,
    isPublished: true,
    isOnSale: false,
    salePrice: 0,
    isPopular: false,
  });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (product) {
      setEnteredValues({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        countInStock: product.countInStock,
        image: product.image,
        isPublished: product.isPublished,
        isOnSale: product.isOnSale,
        salePrice: product.salePrice,
        isPopular: product.isPopular,
      });
      setImage(product.image);
    }
  }, [product]);

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const fileURL = URL.createObjectURL(file);
    setImage(fileURL);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      handleInputChange("image", res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(false);
      return;
    }
    setValidated(true);
  }

  const handleEditProduct = async () => {
    try {
      const res = await updateProduct({
        ...enteredValues,
        productId: product._id,
      }).unwrap();
      toast.success(res.message);
      onHide();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="p-2">
          <p className="text-secondary fs-6  mb-4">
            Product ID: {product && product._id}
          </p>
          {product && (
            <Form validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Input
                    label="Name *"
                    controlId="name"
                    type="text"
                    onChange={(event) =>
                      handleInputChange("name", event.target.value)
                    }
                    value={enteredValues.name}
                    required
                    error="required"
                  />
                  <Input
                    label="Price *"
                    controlId="price"
                    type="number"
                    placeholder="0.00"
                    onChange={(event) =>
                      handleInputChange("price", event.target.value)
                    }
                    value={enteredValues.price}
                    required
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="switch"
                    id="isPublished"
                    label="is Published"
                    checked={enteredValues.isPublished}
                    className="mb-2 published-switch"
                    onChange={(event) =>
                      handleInputChange("isPublished", event.target.checked)
                    }
                  />
                  <Form.Check
                    type="switch"
                    id="isPopular"
                    label="is Popular"
                    checked={enteredValues.isPopular}
                    onChange={(event) =>
                      handleInputChange("isPopular", event.target.checked)
                    }
                  />
                  <Form.Check
                    type="switch"
                    id="isOnSale"
                    label="is On Sale"
                    checked={enteredValues.isOnSale}
                    onChange={(event) =>
                      handleInputChange("isOnSale", event.target.checked)
                    }
                  />
                  <Input
                    label="Sale price"
                    controlId="salePrice"
                    type="number"
                    placeholder="0.00"
                    disabled={!enteredValues.isOnSale}
                    onChange={(event) =>
                      handleInputChange("salePrice", event.target.value)
                    }
                    value={enteredValues.salePrice}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <Input
                    label="Count in Stock *"
                    controlId="countInStock"
                    type="number"
                    onChange={(event) =>
                      handleInputChange("countInStock", event.target.value)
                    }
                    value={enteredValues.countInStock}
                    required
                  />
                </Col>
                <Col>
                  <Form.Label>
                    <small className="text-black-50 fw-bold">Category</small>
                  </Form.Label>
                  <div key="inline-radio">
                    {CATEGORY_TYPES.map((category) => (
                      <Form.Check
                        inline
                        key={category}
                        label={category}
                        name="category"
                        type="radio"
                        id={category}
                        value={category}
                        checked={enteredValues.category === category}
                        onChange={(event) =>
                          handleInputChange("category", event.target.value)
                        }
                      />
                    ))}
                  </div>
                </Col>
              </Row>
              <Row>
                <Input
                  label="description *"
                  controlId="Description"
                  type="text"
                  inputAs="textarea"
                  onChange={(event) =>
                    handleInputChange("description", event.target.value)
                  }
                  value={enteredValues.description}
                  required
                  error="required"
                />
              </Row>
              <Row>
                <Col>
                  <Input
                    label="Image"
                    controlId="image"
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/*"
                    disabled={loadingUpload}
                  />
                  <ImageContainer
                    src={image || DEFAULT_IMAGE}
                    size="200px"
                    alt="upload image"
                    borderRadius="4px"
                  />
                </Col>
                <Col></Col>
              </Row>
              <div className="d-flex pt-4">
                <Button
                  type="submit"
                  className="ms-auto px-4 rounded-pill"
                  onClick={handleEditProduct}
                >
                  {isLoading && <Loader />}
                  Save
                </Button>
              </div>
            </Form>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;

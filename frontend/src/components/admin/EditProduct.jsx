import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Loader from "../Loader";
import Input from "../Input";
import ImageContainer from "../ImageContainer";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import { DEFAULT_IMAGE } from "../../constants";
import { toast } from "react-toastify";

const EditProduct = ({ onClose, onRefetchProducts, product }) => {
  const [image, setImage] = useState("");
  const [enteredValues, setEnteredValues] = useState({
    name: "",
    price: 0,
    category: "",
    description: "",
    countInStock: 0,
    image: DEFAULT_IMAGE,
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
      });
      setImage(product.image);
    }
  }, [product]);

  const [createProduct, { isLoading }] = useCreateProductMutation();

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
    const { name, price, category, description, countInStock, image } =
      enteredValues;
    const product = {
      name,
      price,
      category,
      description,
      countInStock,
      image,
    };
    try {
      const res = await createProduct(product).unwrap();
      toast.success(res.message);
      onClose();
      onRefetchProducts();
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <div className="p-2">
      <p className="text-secondary fs-6 fw-light">
        Product ID: {product && product._id}
      </p>

      <Form validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Input
            as={Col}
            label="Name *"
            controlId="name"
            type="text"
            onChange={(event) => handleInputChange("name", event.target.value)}
            value={enteredValues.name}
            required
            error="required"
          />

          <Input
            as={Col}
            label="Price *"
            controlId="price"
            type="number"
            placeholder="0.00"
            onChange={(event) => handleInputChange("price", event.target.value)}
            value={enteredValues.price}
            required
          />
        </Row>
        <Row>
          <Input
            as={Col}
            label="Category"
            controlId="category"
            type="text"
            onChange={(event) =>
              handleInputChange("category", event.target.value)
            }
            value={enteredValues.category}
          />
          <Input
            as={Col}
            label="Count in Stock *"
            controlId="countInStock"
            type="number"
            onChange={(event) =>
              handleInputChange("countInStock", event.target.value)
            }
            value={enteredValues.countInStock}
            required
            error="required"
          />
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
          <Button type="submit" className="ms-auto px-4" onClick={handleEditProduct}>
            {isLoading && <Loader />}
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditProduct;

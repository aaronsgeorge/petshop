import { useState } from "react";
import { Form, Button, Row, Col, Card, Image } from "react-bootstrap";
import Loader from "../Loader";
import Input from "../Input";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
import { DEFAULT_IMAGE } from "../../constants";
import { toast } from "react-toastify";

const NewProduct = () => {
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
      console.log("Image uploaded:", res);
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

  const createProductHandler = async () => {
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
      console.log("Product created:", res);
      toast.success("Product created successfully");
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <Card className="p-4">
      <h2 className="mb-4">New Product</h2>
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
            label="Category *"
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
            />
            <Card>
              <Card.Img src={image || DEFAULT_IMAGE} />
            </Card>
          </Col>
          <Col></Col>
        </Row>

        <Button type="submit" className="mt-4" onClick={createProductHandler}>
          {isLoading && <Loader />}
          Create Product
        </Button>
      </Form>
    </Card>
  );
};

export default NewProduct;

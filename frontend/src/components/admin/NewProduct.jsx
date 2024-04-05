import { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import Input from "../Input";

const NewProduct = () => {
  const [image, setImage] = useState("");
  const [enteredValues, setEnteredValues] = useState({
    name: "",
    price: undefined,
    category: "",
    description: "",
    countInStock: undefined,
    files: "",
  });
  const [validated, setValidated] = useState(false);

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(false);
      return;
    }

    setValidated(true);
    console.log("enteredValues", enteredValues);
  }
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    console.log("file", file);
  };

  return (
    <Card className="p-4">
      <h2 className="mb-4">NewProduct</h2>
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
            label="description"
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

        <Input
          label="Image"
          controlId="image"
          type="file"
          onChange={uploadFileHandler}
          value={image}
        />

        <Button type="submit" className="mt-4">
          Create Product
        </Button>
      </Form>
    </Card>
  );
};

export default NewProduct;

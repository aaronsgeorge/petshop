import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword.trim()}`);
    } else {
      navigate("/products");
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <InputGroup>
        <Form.Control
          placeholder="Search Products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button type="submit" variant="outline-secondary">
          <FiSearch className="fs-5" />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchInput;

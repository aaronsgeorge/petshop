import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { redirectProductSearch } from "../../utils/navigationUtils.js";

const SearchInput = () => {
  const { keyword: urlKeyword, category, sort } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    const trimmedKeyword = keyword.trim();
    redirectProductSearch({ keyword: trimmedKeyword, category, sort });
  };

  return (
    <Form onSubmit={submitHandler}>
      <InputGroup>
        <Form.Control
          placeholder="Search Products..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="search-input"
        />
        <Button type="submit" variant="outline-secondary">
          <FiSearch className="fs-5" />
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchInput;

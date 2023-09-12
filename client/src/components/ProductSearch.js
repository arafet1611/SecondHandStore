import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const ProductSearch = ({ products, setFilteredProducts }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    const filteredResults = products.filter((product) =>
      Object.values(product).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredProducts(filteredResults);
  };

  return (
    <div style={{ margin: "0 33%" }}>
      <center>
        <Form inline>
          <Form.Control
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Products..."
            className="mr-sm-2 ml-sm-5"
          ></Form.Control>
          <Button onClick={handleSearch} className="p-2 custom-button">
            Search
          </Button>
        </Form>
      </center>
    </div>
  );
};

export default ProductSearch;

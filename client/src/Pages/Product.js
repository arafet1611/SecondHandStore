import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../Styles/ProductDetails.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
      } catch (error) {
        console.log("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {products.map((product) => (
        <div className="product-container" key={product._id}>
          <img className="product-image" src={product.image} alt="Product" />
          <div className="product-details">
            <Link to={`/products/${product._id}`} className="product-name-link">
              <h3 className="product-name">{product.name}</h3>
            </Link>
            <p className="product-price">Price: ${product.price}</p>
            <p className="product-city">City: {product.shippingAddress.city}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;

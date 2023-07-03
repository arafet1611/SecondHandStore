import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Styles/ProductDetails.css";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <div className="product-details">
        <h2>Product Details</h2>
        <img src={product.image} alt="Product" />

        <p>City: {product.shippingAddress.city}</p>
        <p>Description: {product.description}</p>
        <h3>{product.name}</h3>
        <p>Price: {product.price} DT</p>
      </div>
      <div className="user-details">
        <h2>Seller Information</h2>
        <p>Seller: {product.user}</p>
      </div>
    </div>
  );
};

export default ProductDetails;

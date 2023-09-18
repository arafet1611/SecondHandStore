import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Styles/myProductList.css";

function MyProductList() {
  const [productList, setProductList] = useState([]);
  const storedUser = window.localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowErrorMessage(true);
    } else {
      const fetchMyProductList = async () => {
        try {
          const response = await axios.get(
            `/api/products/myproducts/${user._id}`,
            {
              headers: {
                "x-user-id": user._id,
                "x-admin": user.isAdmin,
              },
            }
          );
          setProductList(response.data.productList);
        } catch (error) {
          console.error("Error retrieving user product list", error);
        }
      };
      fetchMyProductList();
    }
  }, [user]);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`, {
        headers: {
          "x-admin": user.isAdmin,
          "x-user-id": user._id,
        },
      });
      setProductList(
        productList.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  if (showErrorMessage) {
    return (
      <p className="error-message">
        Can't access this page before login. Please login first
      </p>
    );
  }

  return (
    <div className="my-product-list-container container">
      <h1>My Product List</h1>
      {productList.length > 0 ? (
        productList.map((product) => (
          <div key={product._id} className="product-item">
            {/* Add the product image */}
            <img
              src={`/uploads/${product.image}`} // Use the correct image path
              alt={product.name}
              className="product-image"
            />

            <div className="product-details">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price}</p>
            </div>

            <div className="product-buttons">
              <button onClick={() => deleteProduct(product._id)}>Delete</button>
              <Link
                to={`/products/${product._id}/update`}
                className="product-update-link"
              >
                Update
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No product found</p>
      )}
    </div>
  );
}

export default MyProductList;

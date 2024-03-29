import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../assets/background.jpg"; // Import your background image
import "../Styles/ProductDetails.css";
import navbarImage from "../assets/navbarimage.jpg";
const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [seller, setSeller] = useState(null); // State to store seller information

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);

        // Fetch seller information based on the user ID in product.user
        const sellerId = res.data.user;
        console.log(sellerId.data);
        const sellerRes = await axios.get(`/api/users/${sellerId}`);
        setSeller(sellerRes.data.user);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product && !seller) {
    return <div>Loading...</div>;
  }
  console.log(seller);

  // Define the inline styles for the background image
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
  };
  const navbarStyle = {
    backgroundImage: `url(${navbarImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "contain",
    height: "400px",
    marginBottom: "100px",
  };

  return (
    <div style={backgroundStyle}>
      <div className="product-details-container container ">
        <div style={navbarStyle}></div>
        <div className="row">
          <div className="col-md-6">
            <div className="product-image">
              <img
                src={`/uploads/${product.image}`}
                alt="Product"
                className="img-fluid big-product-image"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-info">
              <h2>{product.name}</h2>
              <p>Description: {product.description}</p>
              <p>Category: {product.category}</p>
              <p>Price: {product.price} DT</p>
              <p>City: {product.shippingAddress.city}</p>
              <p>
                Shipping Charge: {product.shippingAddress.shippingCharge} DT
              </p>
              <p>Expires On: {product.expiresOn}</p>
            </div>
            <div className="user-info">
              <h2>Seller Information</h2>
              {seller ? (
                <>
                  <p>Seller: {seller.name}</p>
                  <p>Email: {seller.email}</p>
                  {/* You can display more seller information if needed */}
                </>
              ) : (
                <p>Loading seller information...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

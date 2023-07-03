import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../Styles/ProductForm.css";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [shippingCharge, setShippingCharge] = useState(0);
  const [expiresOn, setExpiresOn] = useState("");
  const [isForm1Valid, setIsForm1Valid] = useState(false);
  const [isForm2Visible, setIsForm2Visible] = useState(false);
  const [isForm1Submitted, setIsForm1Submitted] = useState(false);
  const storedUser = window.localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
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

  useEffect(() => {
    if (product) {
      setName(product.name);
      setImage(product.image);
      setDescription(product.description);
      setCategory(product.category);
      setPrice(product.price);
      setAddress(product.shippingAddress.address);
      setCity(product.shippingAddress.city);
      setShippingCharge(product.shippingAddress.shippingCharge);
      setExpiresOn(product.expiresOn);
    }
  }, [product]);

  const handleForm1Submit = (e) => {
    e.preventDefault();
    setIsForm1Submitted(true);
    if (name && image && description && category && price && expiresOn) {
      setIsForm1Valid(true);
      setIsForm2Visible(true);
    } else {
      setIsForm1Valid(false);
      setIsForm2Visible(false);
    }
  };

  const handleForm2Submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/api/products/${id}`,
        {
          name,
          image,
          description,
          category,
          price,
          shippingAddress: {
            address,
            city,
            shippingCharge,
          },
          expiresOn,
        },
        {
          headers: {
            "x-user-id": user._id,
          },
        }
      );

      console.log("Product updated:", res.data);

      setName("");
      setImage("");
      setDescription("");
      setCategory("");
      setPrice(0);
      setAddress("");
      setCity("");
      setShippingCharge(0);
      setExpiresOn("");
      setIsForm1Submitted(false);
      setIsForm1Valid(false);
      setIsForm2Visible(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleReturnToForm1 = () => {
    setIsForm2Visible(false);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Update Product</h2>
      {isForm2Visible && isForm1Valid ? (
        <form onSubmit={handleForm2Submit}>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="shippingCharge">Shipping Charge:</label>
            <input
              type="number"
              id="shippingCharge"
              value={shippingCharge}
              onChange={(e) => setShippingCharge(parseFloat(e.target.value))}
            />
          </div>
          <button type="button" onClick={handleReturnToForm1}>
            Back
          </button>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <form onSubmit={handleForm1Submit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="image">Image:</label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="expiresOn">Expires On:</label>
            <input
              type="text"
              id="expiresOn"
              value={expiresOn}
              onChange={(e) => setExpiresOn(e.target.value)}
            />
          </div>
          {isForm1Submitted && !isForm1Valid && (
            <div style={{ color: "red" }}>Please complete the entire form</div>
          )}
          <button type="submit">Next</button>
        </form>
      )}
    </div>
  );
};

export default UpdateProduct;

import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null); // Initialize with null for the File object
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [shippingCharge, setShippingCharge] = useState(0);
  const [expiresOn, setExpiresOn] = useState(""); // New state for expiresOn
  const [isForm1Valid, setIsForm1Valid] = useState(false);
  const [isForm2Visible, setIsForm2Visible] = useState(false);
  const [isForm1Submitted, setIsForm1Submitted] = useState(false);
  const storedUser = window.localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  console.log(user.isAdmin);
  const handleForm1Submit = (e) => {
    e.preventDefault();
    setIsForm1Submitted(true);
    if (name && image && description && category && price && expiresOn) {
      // Check if expiresOn is provided
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
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("shippingAddress.address", address);
      formData.append("shippingAddress.city", city);
      formData.append("shippingAddress.shippingCharge", shippingCharge);
      formData.append("expiresOn", expiresOn);
      console.log(user._id);
      const res = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-admin": user.isAdmin,
          "x-user-id": user._id,
        },
      });

      console.log("Product created:", res.data);

      setName("");
      setImage(null); // Set it back to null
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
      console.error("Error creating product:", error);
    }
  };

  const handleReturnToForm1 = () => {
    setIsForm2Visible(false);
  };

  return (
    <div className="container">
      <h2 className="my-4">Add Product</h2>
      {isForm2Visible && isForm1Valid ? (
        <form onSubmit={handleForm2Submit}>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              className="form-control"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="shippingCharge">Shipping Charge:</label>
            <input
              type="number"
              className="form-control"
              id="shippingCharge"
              value={shippingCharge}
              onChange={(e) => setShippingCharge(parseFloat(e.target.value))}
            />
          </div>
          <button
            type="button"
            className="btn btn-secondary mr-2"
            onClick={handleReturnToForm1}
          >
            Back
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      ) : (
        <form onSubmit={handleForm1Submit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              className="form-control-file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              className="form-control"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiresOn">Expires On:</label>
            <input
              type="text"
              className="form-control"
              id="expiresOn"
              value={expiresOn}
              onChange={(e) => setExpiresOn(e.target.value)}
            />
          </div>
          {isForm1Submitted && !isForm1Valid && (
            <div style={{ color: "red" }}>Please complete the entire form</div>
          )}
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </form>
      )}
    </div>
  );
};

export default AddProduct;

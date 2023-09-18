import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null); // Change to null for image file
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

  const handleForm1Submit = async (e) => {
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
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("expiresOn", expiresOn);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("shippingCharge", shippingCharge);

      if (image instanceof File) {
        formData.append("image", image); // Append the image file only if it's a file (not a string)
      }

      const res = await axios.put(`/api/products/${id}`, formData, {
        headers: {
          "x-admin": user.isAdmin,
          "x-user-id": user._id,
          "Content-Type": "multipart/form-data", // Set content type for file upload
        },
      });

      console.log("Product updated:", res.data);

      setName("");
      setImage(null); // Reset image to null
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
    <div className="container">
      <h2 className="my-4">Update Product</h2>
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
      ;
    </div>
  );
};

export default UpdateProduct;

import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/login";
import Register from "./Pages/Register";

import Layout from "./components/Layout";
import MyProductList from "./Pages/MyProductList";
import Products from "./Pages/Product";
import ProductDetails from "./Pages/ProductDetails";
import AddProduct from "./Pages/AddProduct";
import UpdateProduct from "./Pages/UpdateProduct";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profil/myList" element={<MyProductList />} />
          <Route path="/ads" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products/:id/update" element={<UpdateProduct />} />
          <Route path="/ad-listing" element={<AddProduct />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
export default App;

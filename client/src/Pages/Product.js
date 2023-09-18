import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Styles/Products.css";
import TierByLowerPrice from "../components/TierByLowerPrice";
import TierByHighestPrice from "../components/TierByHighestPrice";
import TierByNameAZ from "../components/TierByNameAZ";
import TierByNameZA from "../components/TierByNameZA";
import ProductSearch from "../components/ProductSearch";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        console.log("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <ProductSearch
        products={products}
        setFilteredProducts={setFilteredProducts}
      />
      <h2>Product List</h2>
      <TierByLowerPrice
        products={filteredProducts}
        setProducts={setFilteredProducts}
      />
      <TierByHighestPrice
        products={filteredProducts}
        setProducts={setFilteredProducts}
      />
      <TierByNameAZ
        products={filteredProducts}
        setProducts={setFilteredProducts}
      />
      <TierByNameZA
        products={filteredProducts}
        setProducts={setFilteredProducts}
      />
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-4" key={product._id}>
            <div className="card">
              <div className="card-body">
                <Link
                  to={`/products/${product._id}`}
                  className="card-title product-link"
                >
                  <img
                    className="card-img-top"
                    src={`/uploads/${product.image}`}
                    alt="Product"
                  />
                  <h2 className="product-link">{product.name}</h2>
                </Link>
                <p className="card-text">Price: {product.price}DT</p>
                <p className="card-text">
                  City: {product.shippingAddress.city}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;

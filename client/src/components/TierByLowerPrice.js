import React from "react";

const TierByLowerPrice = ({ products, setProducts }) => {
  const handleSortByLowerPrice = () => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    setProducts(sortedProducts);
  };

  const buttonStyle = {
    backgroundColor: "white",
    border: "1px solid blue",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
    margin: "5px",
  };

  return (
    <button style={buttonStyle} onClick={handleSortByLowerPrice}>
      Sort by Lower Price
    </button>
  );
};

export default TierByLowerPrice;

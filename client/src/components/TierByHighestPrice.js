import React from "react";

const TierByHighestPrice = ({ products, setProducts }) => {
  const handleSortByHighestPrice = () => {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price);
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
    <button style={buttonStyle} onClick={handleSortByHighestPrice}>
      Sort by Highest Price
    </button>
  );
};

export default TierByHighestPrice;

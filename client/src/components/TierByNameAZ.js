import React from "react";

const TierByNameAZ = ({ products, setProducts }) => {
  const handleSortByNameAZ = () => {
    const sortedProducts = [...products].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
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
    <button style={buttonStyle} onClick={handleSortByNameAZ}>
      Sort by Name (A-Z)
    </button>
  );
};

export default TierByNameAZ;

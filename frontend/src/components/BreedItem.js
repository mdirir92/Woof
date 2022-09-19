import React from "react";
import "./BreedItem.css";

const BreedItem = ({ name, onClick }) => {
  return (
    <div className="breed-item" onClick={onClick}>
      <p>{name}</p>
    </div>
  );
};

export default BreedItem;

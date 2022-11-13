import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as AddIcon } from "../assets/add-button.svg";

const AddButton = () => {
  return (
    <div className="add-button">
      <Link to="note/new" className="floating-button">
        <AddIcon />
      </Link>
    </div>
  );
};

export default AddButton;

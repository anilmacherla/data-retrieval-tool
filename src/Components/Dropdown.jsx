import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
const Dropdown = ({ items, onChange, labelText }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setSelectedValue(item.id);
    setIsOpen(false);
    onChange(item.id);
  };

  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label" style={{'font-weight': "bold"}}>{labelText}</label>
      <div className="col-sm-10 form-control">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          onClick={toggleDropdown}
          style = {{width: "30%"}}
        >
          {selectedValue
            ? items.find((item) => item.id === selectedValue).displayValue
            : "Select an option"}
        </button>
        <div className={`dropdown-menu${isOpen ? " show" : ""}`}>
          {items.map((item) => (
            <a
              key={item.id}
              className={`dropdown-item${
                selectedValue === item.id ? " active" : ""
              }`}
              href="#"
              onClick={() => handleItemClick(item)}
            >
              {item.displayValue}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

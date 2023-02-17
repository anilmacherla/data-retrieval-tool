import React from "react";
import "./loading__spinner.css";

const Loading = () => {
  return (
    <div className="loading">
      <span>
        <div className="loading__spinner"></div>
        <a>Loading data please wait......</a>
      </span>
    </div>
  );
};

export default Loading;

import React, { useState } from "react";
import "../css/loading.css";
import loading from "../resource/images/loading.png";
import { Link } from "react-router-dom";
import { Messaging } from "react-cssfx-loading";

function LoadinPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLinkClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/signin";
    }, 3000);
  };

  return (
    <div className="loading-container">
      <Link to="#" onClick={handleLinkClick}>
        <img src={loading} alt="loadingImage" />
      </Link>
      {isLoading ? <Messaging color="#FF4D67" /> : ""}
    </div>
  );
}

export default LoadinPage;

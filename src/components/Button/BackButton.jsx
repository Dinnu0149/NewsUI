import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="bg-transparent p-0 m-0 ms-3">
      <i
        onClick={handleBackClick}
        className={`fa-solid fa-arrow-left-long fs-6 p-2 text-light back-button`}
      ></i>
    </div>
  );
};

export default BackButton;

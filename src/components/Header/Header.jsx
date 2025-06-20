import React from "react";
import BackButton from "../Button/BackButton";

const Header = ({ title = "Trending News" }) => {
  return (
    <div className="bg-dark p-3 rounded-pill mb-3">
      <div className="d-flex gap-1 align-content-center align-items-center">
        <BackButton />
        <h5 className="text-light mb-0 text-capitalize">{title}</h5>
      </div>
    </div>
  );
};

export default Header;

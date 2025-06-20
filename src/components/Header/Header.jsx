import React from "react";
import BackButton from "../Button/BackButton";

const Header = ({ title = "Trending News" }) => {
  return (
    <div className="bg-dark p-3 rounded-pill mb-3">
      <div className="d-flex gap-1">
        <BackButton />
        <h5 className="text-light mb-0 text-capitalize">{title}</h5>
      </div>
      <p className="text-light ms-4 pb-0 mb-0">
        Latest news from around the world
      </p>
    </div>
  );
};

export default Header;

import React from "react";

const Header = ({title='Trending News'}) => {
  return (
    <div className="bg-dark p-3 rounded-pill mb-3">
      <h5 className="text-light ms-4 mb-0">{title}</h5>
      <p className="text-light ms-4">Latest news from around the world</p>
    </div>
  );
};

export default Header;

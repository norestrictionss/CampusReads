import React from 'react';
import "../homePage.css";

const Banner = () => {
  return (
    <div className="banner">
      <img src={process.env.PUBLIC_URL + '/images/campus.jpg'} alt="Banner" />
    </div>
  );
};

export default Banner;

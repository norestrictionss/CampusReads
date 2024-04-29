import React from "react";
import "../style.css"; // Import your CSS file for styling

export default function Header() {
  return (
    <div className="header">
      <h1 className="title">CampusReads</h1>
      <div className="links">
        <a href="/profile">Profile</a>
        <a href="/offers">Offers</a>
        <a href="/adverts">Books</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
    </div>
  );
}

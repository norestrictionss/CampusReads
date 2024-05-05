import React, {useState, useContext} from 'react';
import "../style.css"; // Import your CSS file for styling
import {MyContext} from "../MyContext";

export default function Header() {
  
  const { status, setStatus } = useContext(MyContext);
  return (
    <div className="header">
      <h1 className="title">CampusReads</h1>
      <div className="links">
        {status && <a href="/profile">Profile</a>}
        <a href="/offers">Offers</a>
        <a href="/books">Books</a>
        {!status && <a href="/login">Login</a>}
        {!status && <a href="/register">Register</a>}
      </div>
    </div>
  );
}

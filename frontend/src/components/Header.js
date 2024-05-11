import React, { useContext } from 'react';
import "../style.css"; // Import your CSS file for styling
import { Context } from "../contexts/AuthContext";

export default function Header() {
  
  const { user } = useContext(Context);
  return (
    <div className="header">
      <h1 className="title">CampusReads</h1>
      <div className="links">
        {user && <a href="/profile">Profile</a>}
        <a href="/offers">Offers</a>
        <a href="/books">Books</a>
        {!user && <a href="/login">Login</a>}
        {!user && <a href="/register">Register</a>}
        {user && <a href="/logout">Logout</a>}
      </div>
    </div>
  );
}

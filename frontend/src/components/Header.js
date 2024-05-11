import React, { useContext } from 'react';
import "../style.css"; // Import your CSS file for styling
import { Context } from "../contexts/AuthContext";
import { auth } from "../config/firebase";
import { signOut } from 'firebase/auth';

export default function Header() {

  
  function handleSignOut(){
    signOut(auth)
    .then(()=>{
      console.log("User signed out successfully.");
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  
  
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
        {user && <a href="/login" onClick = { handleSignOut }>Logout</a>}
      </div>
    </div>
  );
}

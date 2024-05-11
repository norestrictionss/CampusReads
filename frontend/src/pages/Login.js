import React, { useState } from "react";
import "../style.css"; // Import your CSS file for styling
import "../style.css"; // Import your CSS file for styling
import { auth } from "../config/firebase";
// import { ref, get, orderByChild, equalTo, limitToFirst, query, push, update, remove } from "firebase/database";
import { signInWithEmailAndPassword } from "firebase/auth";
import { addBookToBooklist, removeBookFromBooklist }  from "./Operations";
import { useNavigate } from "react-router-dom"

export default function Login() {
  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to handle changes in the username field
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Function to handle changes in the password field
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Function to handle form submission
const handleSubmit = async (event) => {
  event.preventDefault();

    // Sign in the user with the provided username and password
      await signInWithEmailAndPassword(auth, email, password)
      .then((user)=>{
          console.log(user);
          console.log("User signed in successfully!");
          navigate('/books');

      }).catch((error)=>{
          console.log("Error signing in: ", error.message);
      });
      /*
      const bookData = {
        bookName: "Hayvan Ciftligi",
        bookType: "Bilim Kurgu",
        bookDescription: "safasasgasgasasg",
        author: "George Orwell",
        comments: [] // Initialize comments list as empty
      }
      */
      //addBookToBooklist(userId, bookData);
  
};


  return (
    <div className="login-container">
      <div className="login-box"> {/* Add login-box class */}
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

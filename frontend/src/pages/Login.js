import React, { useState } from "react";
import "../style.css"; // Import your CSS file for styling
import "../style.css"; // Import your CSS file for styling
import { auth } from "../config/firebase";
// import { ref, get, orderByChild, equalTo, limitToFirst, query, push, update, remove } from "firebase/database";
import { signInWithEmailAndPassword } from "firebase/auth";
import { addBookToBooklist, removeBookFromBooklist }  from "./Operations";

export default function Login() {
  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Function to handle changes in the username field
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Function to handle changes in the password field
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Function to handle form submission
  // Function to handle form submission
const handleSubmit = async (event) => {
  event.preventDefault();
  /*
  try {
    // Retrieve the hashed password from the database based on the username
    const queryRef = query(ref(db, 'users/'), orderByChild('email'), equalTo(email), limitToFirst(1));
    const snapshot = await get(queryRef);
    
    if (snapshot.exists()) {  
      const userData = snapshot.val();
      const uid = Object.keys(userData)[0];
      const hashedPasswordFromDB = userData[uid].password;

      // Compare the hashed password from the database with the hashed version of the password entered by the user
      const isPasswordMatch = bcrypt.compareSync(password, hashedPasswordFromDB);
      if (isPasswordMatch) {
        console.log("Password matches!");
        // Here you can proceed with authenticating the user
      } else {
        console.log("Password does not match!");
        // Handle incorrect password
      }
    } else {
      console.log("User not found!");
      // Handle user not found
    }
  } catch (error) {
    console.error("Error:", error.message);
    // Handle errors, such as displaying error messages to the user
  }
  */
  try {
    // Sign in the user with the provided username and password
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = user.uid;
      console.log("User ID:", userId);
      console.log("User signed in successfully!");
      const bookData = {
        bookName: "Hayvan Ciftligi",
        bookType: "Bilim Kurgu",
        bookDescription: "safasasgasgasasg",
        author: "George Orwell",
        comments: [] // Initialize comments list as empty
      }
      addBookToBooklist(userId, bookData);
      removeBookFromBooklist(userId, "-Nx2p90-KIt3tudAiwge");
    } catch (error) {
      // Handle sign-in errors here
      console.error("Error signing in:", error.message);
    }

    // You can redirect the user to another page or perform other actions upon successful sign-in
  } catch (error) {
    console.error("Error:", error.message);
  }
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

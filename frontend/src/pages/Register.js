import React, { useState } from "react";
import "../style.css"; // Import your CSS file for styling
import { auth, db } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { ref, set } from "firebase/database";


export default function Register() {
  // State variables for registration fields
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
       
        const uid = userCredential.user.uid;
        set(ref(db, 'users/' + uid), {
          department: department,
          email: email,
          gender: gender,
          phoneNumber: phoneNumber,
          username: username
        });
        setUsername("");
        setPassword("");
        setPhoneNumber("");
        setGender("");
        setEmail("");
        setDepartment("");
        setUsername("");

        console.log("Registration successful!");
        navigate("/books");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Registration</h2>
        <form className="login-form" onSubmit={handleSubmit}>

        <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <select
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option selected>Select Department</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Bioengineering">Bioengineering</option>
              <option value="Environmental Engineering">Environmental Engineering</option>
              <option value="Electrical and Electronic Engineering">Electrical and Electronic Engineering</option>
              <option value="Industrial Engineering">Industrial Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Chemical Engineering">Chemical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
            </select>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

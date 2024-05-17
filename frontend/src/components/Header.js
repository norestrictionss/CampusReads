import React, { useState, useContext } from 'react';
import "../style.css"; // Import your CSS file for styling
import { MyContext } from "../MyContext";

export default function Header() {

  const { status, setStatus } = useContext(MyContext);
  return (
    <div><nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <div class="container-fluid">

        <a class="navbar-brand" href="/books">
          <img src="https://upload.wikimedia.org/wikipedia/tr/7/70/Marmara_%C3%9Cniversitesi_logo.png" alt="Logo" style={{ width: "50px", marginRight: "10px" , marginLeft: "10px"}} />
          CampusReads
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul class="navbar-nav ">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/books">Home</a>
            </li>  
            <li class="nav-item">
              <a class="nav-link" href="/login">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/register">Register</a>
            </li>
            <li class="nav-item">
              <a class="nav-link toggle" role="button" aria-expanded="false" href="/Profile">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>

  );
}

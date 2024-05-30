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
    <div><nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">

        <a className="navbar-brand" href="/books">
          <img src="https://upload.wikimedia.org/wikipedia/tr/7/70/Marmara_%C3%9Cniversitesi_logo.png" alt="Logo" style={{ width: "50px", marginRight: "10px" , marginLeft: "10px"}} />
          CampusReads
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav ">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/books">Home</a>
            </li>  
            {!user && <li class="nav-item">
              <a className="nav-link" href="/login">Login</a>
            </li>}
            {!user && <li className="nav-item">
              <a className="nav-link" href="/register">Register</a>
            </li>}

            {user && <li className="nav-item">
              <a className="nav-link" href="/login" onClick = {handleSignOut}>Logout</a>
            </li>}

            {user &&<li className="nav-item">
              <a className="nav-link toggle" role="button" aria-expanded="false" href="/Profile">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                </svg>
              </a>
            </li>}
          </ul>
        </div>
      </div>
    </nav>
    </div>

  );
}

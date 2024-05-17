import React, { useState } from "react";
import "../Profile.css"; // Import your CSS file for styling

export default function EditProfile() {

// State variables for registration fields
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const [gender, setGender] = useState("");
const [email, setEmail] = useState("");
const [department, setDepartment] = useState("");

// Function to handle form submission
const handleSubmit = (event) => {
  event.preventDefault();
  // Here you can implement your registration logic using the form fields
  // For example, you can send an API request to register the user
  console.log("Username:", username);
  console.log("Password:", password);
  console.log("Phone Number:", phoneNumber);
  console.log("Gender:", gender);
  console.log("Email:", email);
  console.log("Department:", department);
  // Reset the form fields after submission if needed
  setUsername("");
  setPassword("");
  setPhoneNumber("");
  setGender("");
  setEmail("");
  setDepartment("");
};

    return (

        <div className="addForm-container rounded mt-5 mb-5">
            <div className="row">
                <div className="col-md-10 mx-auto">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right" > <strong>Edit Your Profile</strong></h4>
                        </div>
                        <form className="row mt-3" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label" >Profile Image</label>
                                <input className="form-control" name="imageUrl" type="file" id="formFile" />
                            </div>
                            <div className="col-md-12"><label htmlFor="username" className="labels">Username</label><input name="username" type="text" className="form-control" placeholder="" value="" /></div>
                            <div className="col-md-12"><label htmlFor="password" className="labels">Password</label><input name="userPassword" type="password" className="form-control" placeholder="" value="" /></div>
                            <div className="col-md-12"><label className="labels">Phone Number</label><input name="userPhoneNumber" type="phone" className="form-control" placeholder="" value="" /></div>
                            <div className="col-md-12"><label className="labels">Gender</label><select>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select></div>
                            <div className="col-md-12"><label className="labels">Email</label><input name="userEmail" type="email" className="form-control" placeholder="" value="" /></div>
                            <div className="col-md-12"><label className="labels">Department</label><input name="userDepartment" type="text" className="form-control" placeholder="" value="" /></div>

                            <div className="mt-5 text-center"><button className="btn btn-sm btn-primary profile-button mb-5" type="submit">Submit Changes</button></div>
                            <a href="/Profile" className="btn btn-sm btn-dark mb-2">Back to Your Profile</a>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};
import React, { useState } from "react";
import "../Profile.css"; // Import your CSS file for styling
import { db, auth } from "../config/firebase"; // Import Firebase configuration
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";

export default function EditProfile() {
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Reset form fields
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
                            <h4 className="text-right"><strong>Edit Your Profile</strong></h4>
                        </div>
                        <form className="row mt-3" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Profile Image</label>
                                <input className="form-control" name="imageUrl" type="file" id="formFile" />
                            </div>
                            
                            <div className="col-md-12">
                                <label htmlFor="password" className="labels">Password</label>
                                <input
                                    name="userPassword"
                                    type="password"
                                    id="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Phone Number</label>
                                <input
                                    name="userPhoneNumber"
                                    type="phone"
                                    className="form-control"
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Gender</label>
                                <select
                                    id="gender"
                                    className="form-control"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}>
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Email</label>
                                <input
                                    name="userEmail"
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Department</label>
                                <select
                                    name="userDepartment"
                                    type="text"
                                    className="form-control"
                                    id="department"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                >
                                    <option value="">Select Department</option>
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

                            <div className="mt-5 text-center">
                                <button className="btn btn-sm btn-primary profile-button mb-5" type="submit">Submit Changes</button>
                            </div>
                            <a href="/Profile" className="btn btn-sm btn-dark mb-2">Back to Your Profile</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

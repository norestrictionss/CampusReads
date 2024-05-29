import React, { useState, useEffect } from "react";
import "../Profile.css";
import { db, auth } from "../config/firebase";
import { ref, get, update } from "firebase/database";
import { updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
    // State variables to store user profile data
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [department, setDepartment] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    

    useEffect(() => {
        // Fetch current user information
        const user = auth.currentUser;
        if (user) {
            const userRef = ref(db, 'users/' + user.uid);
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setUsername(userData.username ||"");
                    setPhoneNumber(userData.phoneNumber || "");
                    setGender(userData.gender || "");
                    setDepartment(userData.department || "");
                }
            }).catch((error) => {
                console.error("Error fetching user data:", error);
            });
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = auth.currentUser;
    
        try {
            // Check if the password is provided and its length
            if (password && password.length < 6) {
                setError("Password must be at least 6 characters.");
                return;
            }
    
            // Check if phone number is provided and its length
            if (phoneNumber && phoneNumber.length !== 11) {
                setError("Phone number must be 11 characters.");
                return;
            }
    
            // Update user profile information in the database
            const userRef = ref(db, 'users/' + user.uid);
            const updates = {
                username: username,
                phoneNumber: phoneNumber,
                gender: gender,
                department: department
            };
            await update(userRef, updates);
    
            // Update user's password if provided
            if (password) {
                await updatePassword(user, password);
            }
    
            alert("Profile updated successfully!");
            navigate("/profile");
        } catch (error) {
            console.error("Error updating profile: ", error);
        }
    
        // Reset password field, but keep other fields
        setPassword("");
    };
    

    return (
        <div className="addForm-container rounded mt-5 mb-5">
            <div className="row">
                <div className="col-md-10 mx-auto">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right"><strong>Edit Your Profile</strong></h4>
                        </div>
                        <div>{error && <div className="error-message">{error}</div>}</div>
                        <form className="row mt-3" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Profile Image</label>
                                <input className="form-control" name="imageUrl" type="file" id="formFile" />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="text" className="labels">Username</label>
                                <input
                                    name="username"
                                    type="text"
                                    id="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} />
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
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
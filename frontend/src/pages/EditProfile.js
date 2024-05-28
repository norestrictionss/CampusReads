import React, { useState, useEffect } from "react";
import "../Profile.css";
import { db, auth } from "../config/firebase";
import { ref, set, get, update } from "firebase/database";
import { updateEmail, updatePassword } from "firebase/auth";

export default function EditProfile() {
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");

    useEffect(() => {
        // Mevcut kullanıcı bilgilerini getirme
        const user = auth.currentUser;
        if (user) {
            const userRef = ref(db, 'users/' + user.uid);
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setPhoneNumber(userData.phoneNumber || "");
                    setGender(userData.gender || "");
                    setEmail(userData.email || "");
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
            // Kullanıcının profil bilgilerini güncelleme
            const userRef = ref(db, 'users/' + user.uid);
            await update(userRef, {
                phoneNumber: phoneNumber,
                gender: gender,
                department: department
            });

            // Kullanıcının e-posta ve şifresini güncelleme
            if (email) {
                await updateEmail(user, email);
            }
            if (password) {
                await updatePassword(user, password);
            }

            alert("Profile updated successfully!");

        } catch (error) {
            console.error("Error updating profile: ", error);
            alert("Error updating profile: " + error.message);
        }

        // Form alanlarını sıfırlama
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
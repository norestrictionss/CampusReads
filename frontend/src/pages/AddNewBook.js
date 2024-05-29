import React, { useState, useEffect, useContext } from "react";
import "../Profile.css"; // Import your CSS file for styling
import "../AddBook.css"; // Import your CSS file for styling
import ProfileHeader from '../../src/components/ProfileHeader';
import { addBookToBooklist, getUserDetails } from "./Operations";
import { useNavigate } from "react-router-dom";
import { Context } from "../contexts/AuthContext";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function AddNewBook() {
    const { user } = useContext(Context);
    const [ssn, setSsn] = useState("");
    const [bookname, setBookname] = useState("");
    const [bookauthor, setBookauthor] = useState("");
    const [bookgender, setBookgender] = useState("");
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "imageFile") {
            setImageFile(files[0]);
        } else {
            switch (name) {
                case "ssn":
                    setSsn(value);
                    break;
                case "bookname":
                    setBookname(value);
                    break;
                case "bookauthor":
                    setBookauthor(value);
                    break;
                case "bookgender":
                    setBookgender(value);
                    break;
                case "description":
                    setDescription(value);
                    break;
                default:
                    break;
            }
        }
    };

    const uploadImage = async (file, ssn) => {
        const storageRef = ref(storage, `images/${ssn}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
    };

    useEffect(() => {
        const userDetailsProcess = async () => {
            try {
                const profileInfo = await getUserDetails(user.uid);
                setProfileData(profileInfo);
            }
            catch (error) {
                console.log("Error fetching user data.");
                console.log(error.message);
            }
        }
        userDetailsProcess();
    }, [user]);

    const addBook = async (event) => {
        event.preventDefault();
        if (!imageFile) {
            alert("Please select an image");
            return;
        }

        const imageURL = await uploadImage(imageFile, ssn);
        const formData = { ssn, bookname, bookauthor, bookgender, description, imageURL };
        const bookId = await addBookToBooklist(user.uid, formData);
        if (bookId) {
            console.log("Book added successfully!");
            navigate('/books');
        } else {
            console.log("Failed to add book. Please try again.");
        }
    };

    const getProfileImage = (gender) => {
        if (gender === 'male') {
            return "https://bootdey.com/img/Content/avatar/avatar1.png"; // Replace with actual male icon URL
        } else if (gender === 'female') {
            return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN6marVqh3eZx1rmily_92k6hw4hp7sZCSL0NRJYdvMA&s"; // Replace with actual female icon URL
        } else {
            return "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"; // Default icon URL
        }
    };

    return (
        <div className="container" style={{ marginTop: "30px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <div className="profile">
                {profileData && (
                    <ProfileHeader 
                        userName={profileData.username} 
                        userDepartment={profileData.department} 
                        userIcon={getProfileImage(profileData.gender)}
                    />
                )}
            </div>
            <div className="addForm-container rounded mt-5 mb-5">
                <div className="row">
                    <div className="col-md-10 mx-auto">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right"><strong>Book Informations</strong></h4>
                            </div>
                            <form className="row mt-3" onSubmit={addBook}>
                                <div className="col-md-12">
                                    <label htmlFor="ssn" className="labels">Book SSN</label>
                                    <input name="ssn" type="text" className="form-control" placeholder="enter book ssn" value={ssn} onChange={handleChange} />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="bookname" className="labels">Name</label>
                                    <input name="bookname" type="text" className="form-control" placeholder="enter book name" value={bookname} onChange={handleChange} />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="bookauthor" className="labels">Author</label>
                                    <input name="bookauthor" type="text" className="form-control" placeholder="enter book author" value={bookauthor} onChange={handleChange} />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="bookgender" className="labels">Gender</label>
                                    <input name="bookgender" type="text" className="form-control" placeholder="enter book gender" value={bookgender} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                    <textarea className="form-control" name="description" id="exampleFormControlTextarea1" rows="3" value={description} onChange={handleChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formFile" className="form-label">Select an image</label>
                                    <input className="form-control" name="imageFile" type="file" id="formFile" onChange={handleChange} />
                                </div>
                                <div className="mt-5 text-center">
                                    <button className="btn btn-primary profile-button" type="submit">Add Book</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

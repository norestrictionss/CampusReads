import React, { useState } from "react";
import "../Profile.css"; // Import your CSS file for styling
import "../AddBook.css"; // Import your CSS file for styling
import ProfileHeader from '../../src/components/ProfileHeader';
import { addBookToBooklist } from "./Operations";
import { useNavigate } from "react-router-dom"
import { useContext } from "react"; 
import { Context } from "../contexts/AuthContext";

export default function AddNewBook() {
    const { user } = useContext(Context);
  
    const [ssn, setSsn] = useState("");
    const [bookname, setBookname] = useState("");
    const [bookauthor, setBookauthor] = useState("");
    const [bookgender, setBookgender] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "imageUrl") {
            setImageUrl(files[0]);
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

    const addBook = async (event) => {
        event.preventDefault();
        const formData = { ssn, bookname, bookauthor, bookgender, description };
        const success = await addBookToBooklist(user.uid, formData);
        console.log(success);
        if (success) {
            console.log("Book added successfully!");
            navigate('/books');
        } else {
            console.log("Failed to add book. Please try again.");
        }
    };

    return (
        <div className="container" style={{ marginTop: "30px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <div className="profile">
                <ProfileHeader userName="@iremaydin" userDepartment="Computer Science Engineering" />
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
                                    <input className="form-control" name="imageUrl" type="file" id="formFile" onChange={handleChange} />
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
};

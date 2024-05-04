import React, { useState } from "react";
import "../Profile.css"; // Import your CSS file for styling
import "../AddBook.css"; // Import your CSS file for styling
import ProfileHeader from '../../src/components/ProfileHeader';


export default function AddNewBook() {
    return (
        <div className="container">
            <div className="profile" style={{padding: "30px"}}>
                <ProfileHeader userName="@iremaydin" userDepartment="Computer Science Engineering" />
            </div>
            <div className="addForm-container rounded mt-5 mb-5">
                <div className="row">
                    <div className="col-md-10 mx-auto">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right" > <strong>Book Informations</strong></h4>
                            </div>
                            <form className="row mt-3">
                                <div className="col-md-12"><label className="labels">Book SSN</label><input name="ssn" type="text" className="form-control" placeholder="enter book ssn" value="" /></div>
                                <div className="col-md-12"><label className="labels">Name</label><input name="bookname" type="text" className="form-control" placeholder="enter book name" value="" /></div>
                                <div className="col-md-12"><label className="labels">Author</label><input name="bookauthor" type="text" className="form-control" placeholder="enter book author" value="" /></div>
                                <div className="col-md-12"><label className="labels">Gender</label><input name="bookgender" type="text" className="form-control" placeholder="enter book gender" value="" /></div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" class="form-label">Description</label>
                                    <textarea className="form-control" name="description" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formFile" className="form-label" >Select an image</label>
                                    <input className="form-control" name="imageUrl" type="file" id="formFile" />
                                </div>
                                <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="submit">Add Book</button></div>
                                
                            </form>

                            
                        </div>
                    </div>
                </div>
            </div>
        </div>



    );
};

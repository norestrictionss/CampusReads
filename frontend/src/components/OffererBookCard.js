import React, {useState }from 'react';
import { exchangeBooks } from '../pages/Operations';
const OffererBookCards = ({ssn, title, author, image, isChecked, onCheckboxChange,book1ID, book2ID ,senderID, ownerID,selectedBookId, requestID}) => {


    console.log("Infoo:", senderID, " ",ownerID, " ", book2ID, " ", book1ID, " ",requestID);
    const handleCheckboxChange = () => {
        onCheckboxChange(book2ID);
    };

    const handleSubmit = async(event)=>{
        event.preventDefault();
        console.log("ASFOMASPĞFMASĞGPASĞHPASHMĞS");
        if(selectedBookId != null){
            
            await exchangeBooks(senderID, ownerID, book2ID, book1ID, requestID);
        }
            
            
    }
    return (

        <div class="col">
            <div class="card h-90">
                <div className="row g-0">
                    <div className="col-md-4">
                        <a href="#">
                            <img src={image} style={{ width: "100px" }} className="img-fluid rounded-start mb-2" alt="..." />
                        </a>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">Author : {author}</p>
                            <div className="form-check" style={{ float: "left", transform: "scale(0.9)" }}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id={`flexCheckChecked_${book2ID}`}
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label" htmlFor="flexCheckChecked" style={{ paddingLeft: "5px" }}>
                                    Select for swap
                                </label>
                            </div>
                            <div className="card-fouter" >
                                <a href="/notifications" type="submit" className="btn btn-sm btn-danger mb-2" onClick = {handleSubmit}>Submit</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OffererBookCards;

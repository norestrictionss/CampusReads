import React from 'react';
import { getDownloadURL, refFromURL } from 'firebase/storage';
import { removeBookFromBooklist } from '../pages/Operations';

const UserBookCards = ({ title, author, image, bookID, userID }) => {
    return (

        <div className="col">
            <div className="card h-90">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={image} style={{ width: "100px"}} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">Author : {author}</p>
                            <a onClick={() => removeBookFromBooklist(userID, bookID)} className="btn btn-sm btn-dark mb-2" style={{ float: "right" }}>DELETE</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserBookCards;

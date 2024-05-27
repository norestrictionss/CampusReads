import React from 'react';
import { getDownloadURL, refFromURL } from 'firebase/storage';

const UserBookCards = ({ title, author, image }) => {
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
                            <a href="#" className="btn btn-sm btn-dark mb-2" style={{float:"right"}}>DELETE</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserBookCards;

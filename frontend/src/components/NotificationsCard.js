import React from 'react';
import { Link } from 'react-router-dom';


const NotificationsCard = ({ id, senderId, book1Id, title, name, lastName, email, phoneNumber, bookimage, message, ownerIcon, requestStatus, acceptRequest, rejectRequest, selectedBookName }) => {

    const textColor = selectedBookName === "There is no selected book!" ? "red" : "green";

    return (
        <div className="sendedRequest-col">
            <div className="card text-bg-light mb-3">
                <div className="row g-0">
                    <div className="card-header">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h6 className="card-title"><strong>Requested Book: </strong>{title}</h6>
                        </div>
                    </div>
                    <div className="col-md-4" style={{ width: "100px", display: "flex", alignItems: "center" }}>
                        <img src={bookimage} className="img-fluid rounded-start" alt="Book Cover" style={{ width: "100%", borderRadius: "10px" }} />
                    </div>
                    <div className="col-md-10">
                        <div className="card-body">
                            <h6>Selected Book From User : <span style={{ color: textColor }}>{selectedBookName}</span></h6>
                            <br />
                            <div className="image mr-3">
                                <div style={{ display: "flex", alignItems: "center" }}>
                                <Link to={`/OffererProfile/${senderId}/${book1Id}`}><img className="square" style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }} src={ownerIcon} alt="Owner Profile" /></Link>
                                    <h6 className="card-text" style={{ marginBottom: "0" }}><strong>Request Owner :</strong>{name} {lastName}</h6>
                                </div>
                            </div>
                            <br />
                            <h6 className="card-text" style={{ marginBottom: "0" }}><strong>Email : </strong>{email}</h6>
                            <h6 className="card-text" style={{ marginBottom: "0" }}><strong>Phone Number : </strong>{phoneNumber}</h6>
                            <h6 className="card-text" style={{ marginBottom: "0" }}><strong>Message : </strong>{message}</h6>
                            <br />
                            <h6 className="card-text" style={{ marginBottom: "0" }}>
                                {requestStatus === "pending" && (
                                    <div>
                                        <button onClick={acceptRequest} className="btn btn-success" style={{ marginRight: "10px" }}>Accept</button>
                                        <button onClick={rejectRequest} className="btn btn-danger">Reject</button>
                                    </div>
                                )}
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationsCard;
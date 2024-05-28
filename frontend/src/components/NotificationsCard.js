import React from 'react';
import { Link } from 'react-router-dom';


const NotificationsCard = ({ id, senderId, book1Id, title, name, lastName, email, phoneNumber, bookimage, message, ownerIcon, requestStatus, acceptRequest, rejectRequest, selectedBookName }) => {
    return (
        <div className="sendedRequest-col">
            <div className="card text-bg-light mb-3">
                <div className="row g-0">
                    <div className="card-header">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h6 className="card-title"><strong>Requested Book: </strong>{title}</h6>
                            <p>Delete <svg style={{ marginLeft: "5px", float: "right" }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                            </svg></p>
                        </div>
                    </div>
                    <div className="col-md-4" style={{ width: "100px", display: "flex", alignItems: "center" }}>
                        <img src={bookimage} className="img-fluid rounded-start" alt="Book Cover" style={{ width: "100%", borderRadius: "10px" }} />
                    </div>
                    <div className="col-md-10">
                        <div className="card-body">
                            <h6>Selected Book From User : <span style={{ color: "red" }}>{selectedBookName}</span></h6>
                            <br />
                            <div className="image mr-3">
                                <div style={{ display: "flex", alignItems: "center" }}>
                                <Link to={`/OffererProfile/${senderId}`}><img className="square" style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }} src={ownerIcon} alt="Owner Profile" /></Link>
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
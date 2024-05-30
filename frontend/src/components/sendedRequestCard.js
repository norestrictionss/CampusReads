import React from 'react';

const SendedRequestCard = ({ title, bookOwnerEmail, bookimage, ownerIcon, requestStatus }) => {
    const getStatusLabel = () => {
        if (requestStatus === 'Accepted') {
            return <span style={{ color: 'green' }}>Accepted</span>;
        } else if (requestStatus === 'rejected') {
            return <span style={{ color: 'red' }}>Rejected</span>;
        } else if (requestStatus === 'pending') {
            return <span style={{ color: 'orange' }}>Pending...</span>;
        }
        return null;
    };

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
                    <div className="col-md-9">
                        <div className="card-body">
                            <br />
                            <div className="image mr-3">
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <a href="#"><img className="square" style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }} src={ownerIcon} alt="Owner Profile" /></a>
                                    <h6 className="card-text" style={{ marginBottom: "0" }}><strong>Book Owner: </strong>{bookOwnerEmail}</h6>
                                </div>
                            </div>
                            <br />
                            <h6 className="card-text" style={{ marginBottom: "0" }}>
                                Status: {getStatusLabel()}
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendedRequestCard;

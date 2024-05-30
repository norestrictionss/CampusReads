import React from 'react';

const PastSwapCard = ({ swapDate, firstBookTitle, firstBookImg, secondBookTitle, secondBookImg, advertOwnerUserName, offererUserName }) => {
    return (
        <div class="sendedRequest-col">
            <div class="card text-bg-light mb-3">
                <div class="row g-0">
                <div class="card-header">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <h6 class="card-title">Swap Date : {swapDate}</h6>
                        </div>
                    </div>
                    <div class="col-md-4" style={{ width: "100px", display: "flex", alignItems: "center" }}>
                        <img src={firstBookImg} class="img-fluid rounded-start" alt="Book Cover" style={{ width: "90%", borderRadius: "10px" }} />
                    </div>
                    <div class="col-md-4">
                        <div class="card-body">
                            <h6 class="card-text" ><strong>{firstBookTitle}</strong></h6>
                            <h6 class="card-text" style={{ marginBottom: "0" }}><strong>Book Owner : </strong>{advertOwnerUserName}</h6>
                        </div>
                    </div>
                    <div class="col-md-4" style={{ width: "100px", display: "flex", alignItems: "center" }}>
                        <img src={secondBookImg} class="img-fluid rounded-start" alt="Book Cover" style={{ width: "90%", borderRadius: "10px" }} />
                    </div>
                    <div class="col-md-4">
                        <div class="card-body">
                            <h6 class="card-text" ><strong>{secondBookTitle}</strong></h6>
                            <h6 class="card-text" style={{ marginBottom: "0" }}><strong>Book Owner : </strong>{offererUserName}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PastSwapCard;
import React from 'react';

const OffererBookCards = ({ ssn, title, author, image ,isChecked, onCheckboxChange }) => {

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
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={isChecked}
                                    onChange={() => onCheckboxChange(ssn)}/>
                                <label className="form-check-label" htmlFor="flexCheckChecked" style={{ paddingLeft: "5px" }}>
                                    Select for swap
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OffererBookCards;

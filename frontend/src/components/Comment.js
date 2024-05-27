import React from 'react';

const Comment = ({ commentDate, commentMessage, commentUserImg, commentUserName }) => {
    return (
        <div className="media">
            <a className="pull-left" href="#"><img className="media-object" src={commentUserImg} alt={commentUserName} /></a>
            <div className="media-body">
                <h4 className="media-heading">{commentUserName}</h4>
                <p>{commentMessage}</p>
                <ul className="list-unstyled list-inline media-detail pull-left">
                    <li><i className="fa fa-calendar"></i>{commentDate}</li>
                </ul>
            </div>
        </div>
    );
};
export default Comment;
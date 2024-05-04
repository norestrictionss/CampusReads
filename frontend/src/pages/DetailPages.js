import React from 'react';
import '../Details.css';

const Details = ({ title, author, image }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="book-detail-container">
            <img src={image} alt={title} style={{ maxWidth: '100%' }} />
            <h2>{title}</h2>
            <p><strong>Author:</strong> {author}</p>
            <div>
              <p><strong>Book Summary:</strong></p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-container">
            <h3>Contact Form</h3>
            <form>
              <div className="form-group">
                <input type="text" className="form-control" id="name" placeholder="Enter your name" />
              </div>
              <div className="form-group">
                <input type="email" className="form-control" id="email" placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <input type="tel" className="form-control" id="phone" placeholder="Enter your phone number" />
              </div>
              <div className="form-group">
                <textarea className="form-control" id="message" rows="5" placeholder="Enter your message"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>



  );
};

export default Details;

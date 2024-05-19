import React, { useState } from "react";
import "../comment.css";

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Ad:", firstName);
    console.log("Soyad:", lastName);
    console.log("E-posta:", email);
    console.log("Telefon Numarası:", phoneNumber);
    console.log("Mesaj:", message);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setMessage("");
  };

  return (
    <div className="contact-container" style={{ margin: "30px" }}>
      <div className="row">
        <div className="col-md-12 col-lg-8">
          <div className="book-box">
            <div className="row">
              <div className="col-md-12 col-lg-6 column">
                <img className="bookDetailImage" src="/images/harry.png" alt="Book Cover" />
              </div>
              <div className="col-md-12 col-lg-6 column">
                <h3 className="bookTitle"><strong>Harry Potter</strong></h3>
                <p className="bookSum"><strong>Summary: </strong>Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek.itabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. K Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek. Kitabın özeti buraya gelecek.</p>
                <p className="bookAuthor"><strong>Author:</strong> J.K. ROWLING </p>
                <p className="SSN"><strong>SSN:</strong> 1111111111</p>
                <p className="bookGender"><strong>Gender:</strong> Fantastic</p>
                <p className="bookOwner"><strong>Owner:</strong> İrem Kıranmezar</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-4">
          <div className="contact-box">
            <h2>CONTACT FORM</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={handleLastNameChange}
                  placeholder="Enter your last name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  id="message"
                  value={message}
                  onChange={handleMessageChange}
                  placeholder="Enter your message"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-small">Send</button>
            </form>
          </div>
        </div>
      </div>
      <section className="content-item" id="comments">
        <div className="container">
          <div className="row">
            <div className="col-sm-8">
              <form>
                <h3>New Comment</h3>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-3 col-lg-2 hidden-xs">
                      <img className="img-responsive comment-avatar" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                    </div>
                    <div className="col-xs-12 col-sm-9 col-lg-10">
                      <textarea className="form-control" id="commentMessage" placeholder="Your message" required></textarea>
                    </div>
                  </div>
                </div>
                <div className="form-group text-right" style={{ textAlign: "right", marginRight: "15px" }}>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
              <h3>Comments</h3>
              <div className="media">
                <a className="pull-left" href="#"><img className="media-object" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" /></a>
                <div className="media-body">
                  <h4 className="media-heading">John Doe</h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <ul className="list-unstyled list-inline media-detail pull-left">
                    <li><i className="fa fa-calendar"></i>27/02/2014</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

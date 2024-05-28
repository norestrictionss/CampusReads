import React, { useEffect, useState } from "react";
import "../comment.css";

import { useParams } from 'react-router-dom';
import { db } from '../../src/config/firebase';
import { get , ref} from 'firebase/database';
import { getUserDetails } from "./Operations";

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [owner, setOwner] = useState("");
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

  const { userId, id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        console.log(`Fetching book for userId: ${userId} and bookId: ${id}`);
        const bookRef = ref(db, `users/${userId}/booklist/${id}`);
        const userInfo = await getUserDetails(userId);
        console.log("Infooo2:", userInfo, userId);
        setOwner(userInfo.email);
        get(bookRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log('Book data:', snapshot.val());
              setBook(snapshot.val());
              setLoading(false);
            } else {
              console.error('No such document!');
              setLoading(false);
            }
          });
      } catch (error) {
        console.error('Error getting document:', error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [userId, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

 
  return (
    <div className="contact-container" style={{ margin: "30px" }}>
      <div className="row">
        <div className="col-md-12 col-lg-8">
          <div className="book-box">
            <div className="row">
              <div className="col-md-12 col-lg-6 column">
                <img className="bookDetailImage" src={book.imageURL} alt="Book Cover" />
              </div>
              <div className="col-md-12 col-lg-6 column">
                <h3 className="bookTitle"><strong>{book.bookName}</strong></h3>
                <p className="bookSum"><strong>Summary: </strong>{book.bookDescription}</p>
                <p className="bookAuthor"><strong>Author:</strong> {book.author} </p>
                <p className="SSN"><strong>SSN:</strong> {book.bookSSN}</p>
                <p className="bookGender"><strong>Gender:</strong> {book.bookType}</p>
                <p className="bookOwner"><strong>Owner:</strong>{owner}</p>
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

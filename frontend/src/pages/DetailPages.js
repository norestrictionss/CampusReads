import React, { useEffect, useState } from "react";
import "../comment.css";
import { useNavigate, useParams } from "react-router-dom";
import { db } from '../../src/config/firebase';
import { get, ref, push, onValue } from 'firebase/database';
import { getUserDetails } from "./Operations";
import { sendRequest } from "./Operations";
import { useContext } from "react"; 
import { Context } from "../contexts/AuthContext";

export default function ContactForm() {
  const { user } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [commentMessage, setCommentMessage] = useState("");
  const [comments, setComments] = useState([]);
  const { userId, id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [imgURL, setimgURL] = useState("");

  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePhoneNumberChange = (event) => setPhoneNumber(event.target.value);
  const handleMessageChange = (event) => setMessage(event.target.value);
  const handleCommentMessageChange = (event) => setCommentMessage(event.target.value);

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

  useEffect(() => {
    const userDetailsProcess = async () => {
      try {
        const profileInfo = await getUserDetails(user.uid);
        setProfileData(profileInfo);
      } catch (error) {
        console.log("Error fetching user data.");
        console.log(error.message);
      }
    }
    userDetailsProcess();
  }, [user]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (commentMessage.trim() === "") return;
    
    const newComment = {
      message: commentMessage,
      timestamp: new Date().toISOString(),
      author: profileData ? profileData.username : "Anonymous",
      gender: profileData ? profileData.gender : "unspecified", // Store gender
    };

    const commentRef = ref(db, `users/${userId}/booklist/${id}/comments`);
    await push(commentRef, newComment);
    setCommentMessage("");
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        console.log(`Fetching book for userId: ${userId} and bookId: ${id}`);
        const bookRef = ref(db, `users/${userId}/booklist/${id}`);
        const userInfo = await getUserDetails(userId);
        setOwnerEmail(userInfo.email);
        setCurrentUser(userInfo);
        setOwnerEmail(userInfo.email);
        get(bookRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log('Book data:', snapshot.val());
              setBook(snapshot.val());
              setimgURL(snapshot.val().imageURL);
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

    const fetchComments = () => {
      const commentRef = ref(db, `users/${userId}/booklist/${id}/comments`);
      onValue(commentRef, (snapshot) => {
        if (snapshot.exists()) {
          const commentsData = snapshot.val();
          const commentsArray = Object.keys(commentsData).map(key => ({
            id: key,
            ...commentsData[key],
          }));
          setComments(commentsArray);
        } else {
          setComments([]);
        }
      });
    };

    fetchBook();
    fetchComments();
  }, [userId, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!book) {
    return <div>Book not found</div>;
  }

  const send = async (event) => {
    event.preventDefault();
    const requestId = await sendRequest(id, "", userId, user.uid, firstName, lastName, email, phoneNumber, message, "pending", imgURL, ownerEmail, book.bookName);
    console.log(requestId);
    if (requestId) {
      console.log("Request sent successfully.");
      navigate('/books');
    }
  };

  const getAvatar = (gender) => {
    if (gender === 'male') {
      return "https://bootdey.com/img/Content/avatar/avatar1.png";
    } else if (gender === 'female') {
      return "https://bootdey.com/img/Content/avatar/avatar3.png";
    } else {
      return "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";
    }
  };

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
                <p className="bookOwner"><strong>Owner email:</strong> {ownerEmail}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-4">
          <div className="contact-box">
            <h2>CONTACT FORM</h2>
            <form className="contact-form" onSubmit={send}>
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
              <form onSubmit={handleCommentSubmit}>
                <h3>New Comment</h3>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-3 col-lg-2 hidden-xs">
                      <img className="img-responsive comment-avatar" src={profileData ? getAvatar(profileData.gender) : "https://bootdey.com/img/Content/avatar/avatar1.png"} alt="" />
                    </div>
                    <div className="col-xs-12 col-sm-9 col-lg-10">
                      <textarea
                        className="form-control"
                        id="commentMessage"
                        placeholder="Your message"
                        value={commentMessage}
                        onChange={handleCommentMessageChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="form-group text-right" style={{ textAlign: "right", marginRight: "15px" }}>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </form>
              <h3>Comments</h3>
              {comments.map((comment) => (
                <div key={comment.id} className="media">
                  <div className="pull-left" href="#"><img className="media-object" src={getAvatar(comment.gender)} alt="" /></div>
                  <div className="media-body hidden-xs">
                    <h4 className="media-heading">{comment.author}</h4>
                    <p className="message_comment">{comment.message}</p>
                    <ul className="list-unstyled list-inline media-detail pull-left">
                      <li><i className="fa fa-calendar"></i>{new Date(comment.timestamp).toLocaleDateString()}</li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

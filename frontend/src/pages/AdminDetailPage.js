import React, { useEffect, useState } from "react";
import "../Details.css"; // Stil dosyanızı içe aktarın

import { useParams } from 'react-router-dom';
import { db } from '../../src/config/firebase';
import { get, ref, onValue, remove } from 'firebase/database';
import { getUserDetails } from "./Operations";

export default function ContactForm() {
  const { userId, id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [owner, setOwner] = useState("");
  const [comments, setComments] = useState([]);

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

  const deleteComment = async (commentId) => {
    try {
      const commentRef = ref(db, `users/${userId}/booklist/${id}/comments/${commentId}`);
      await remove(commentRef);
      setComments(comments.filter(comment => comment.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

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
                <p className="bookOwner"><strong>Owner email:</strong> {owner}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-9">
          <section className="content-item" id="comments">
            <div className="container">
              <div className="row">
                <div className="col-sm-8">
                  <h3>Comments</h3>
                  {comments.map((comment) => (
                    <div key={comment.id} className="media">
                      <a className="pull-left" href="#"><img className="media-object" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" /></a>
                      <div className="media-body">
                        <h4 className="media-heading">{comment.author || "Anonymous"}</h4>
                        <p>{comment.message}</p>
                        <ul className="list-unstyled list-inline media-detail pull-left">
                          <li><i className="fa fa-calendar"></i>{new Date(comment.timestamp).toLocaleDateString()}</li>
                        </ul>
                        <div className="form-group text-right" style={{ textAlign: "right", marginRight: "15px" }}>
                          <button onClick={() => deleteComment(comment.id)} className="btn btn-danger">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

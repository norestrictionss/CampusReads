import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';  
import Banner from '../components/Banner';
import "../homePage.css";
import { returnUsers, showBookList } from './Operations';
import { ref, getDownloadURL, getStorage } from 'firebase/storage';
const Books = () => {

  const [ imgURL, setImgURL] = useState({});
  const storage = getStorage();
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingBooks, setLoadingBooks] = useState(true); // Add loading state
  const [users, setUsers] = useState([]); // Users



  useEffect(() => {
    const fetchUserList = async () => {
        
        try {
            const userList = Object.entries(await returnUsers());
            if(userList) {
                // It merges the book lists with image URL's.
                setUsers(userList);
                setLoadingBooks(false); // It keeps the loading.
                //console.log("hi");
                //console.log("Hello", users[1][1]["phoneNumber"]);
            }
        } catch (error) {
            console.error("Error fetching user list:", error);
            setLoadingBooks(false); // It keeps loading part.
        }


    };
    fetchUserList();
}, []);

  const [books, setBooks] = useState([
    { id: 1, title: 'Harry Potter', author: 'J.K. Rowling' ,image:"./images/harry.png"},
    { id: 2, title: 'Lord of the Rings', author: 'J.R.R. Tolkien' , image:"./images/lotr.jpg"},
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee' , image:"./images/tkam.jpg"},
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen' , image:"./images/pap.jpg"},
    { id: 5, title: '1984', author: 'George Orwell' , image:"./images/1984.jpg" },
    { id: 6, title: 'Harry Potter2', author: 'J.K. Rowling' ,image:"./images/book.jpg"},
    { id: 7, title: 'Lord of the Rings2', author: 'J.R.R. Tolkien' , image:"./banner.png"},
    { id: 8, title: 'To Kill a Mockingbird2', author: 'Harper Lee' , image:"./banner.png"},
    { id: 9, title: 'Pride and Prejudice2', author: 'Jane Austen' , image:"./banner.png"},
    { id: 10, title: '1984', author: 'George Orwell2' , image:"./banner.png" },
    
  ]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };


  return (
    <div className='container' id="bookContainer">
      <Banner />
      <h1 className="bookList" ><strong>Book List</strong></h1>
      <input className='search'
        type="text"
        placeholder="Search book..."
        value={searchTerm}
        onChange={handleChange}
      />
      <div className="card_container">
        <div className="row" id="bookPageRow">
          {users.length > 0 ?
            users.map(([key, attributes]) => (
              <React.Fragment key={key}>
                {attributes.booklist &&
                  Object.entries(attributes.booklist)
                    .filter(([bookKey, bookAttribute]) => bookAttribute.bookName.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(([bookKey, bookAttribute]) => (
                      <div key={bookKey} className="col-lg-3 col-md-4 col-sm-6 col-12">
                        <BookCard id={bookKey} userId = {key} title={bookAttribute.bookName} author={bookAttribute.author} image={bookAttribute.imageURL} />
                      </div>
                    ))
                }
              </React.Fragment>
            ))
            :
            <p>Loading...</p>
          }
        </div>
      </div>

    </div>
  );
};

export default Books;
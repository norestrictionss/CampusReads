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
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
    const fetchBookList = async (bookID) => {
        try {
            if(bookID) {
                // It merges the book lists with image URL's.
                    try {
                        const imageURL = await getDownloadURL(ref(storage, `images/${bookID}`));
                        setImgURL(imageURL);
                        return imgURL;
                    } catch (error) {
                     
                        return null;
                    }
            }
        } catch (error) {
            console.error("Error fetching book list:", error);
            setLoadingBooks(false); // It keeps loading part.
        }
    };
    fetchBookList();
  }, []);

    useEffect(() => {
      
      const fetchImages = async () => {
        const all_urls = {};
        for (const [_, attributes] of users) {
          if (attributes.booklist) {
            for (const [bookKey, _] of Object.entries(attributes.booklist)) {
              const imageURL = await getImage(`images/${bookKey}`);
              all_urls[bookKey] = imageURL;
            }
          }
        }
        setImgURL(all_urls);
      };
      if (users.length > 0) {
        fetchImages();
      }
    }, [users]);

    async function getImage(imageName, imgURL){
        
      try {
          const imageURL = await getDownloadURL(ref(storage, imageName));
          return imageURL;
      } catch (error) {
          console.error("Error fetching image URL:", error);
          return null;
      }
  }
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

        { users.length > 0 ? 
          users.map(([key, attributes]) => (
            <div key={key}>
              {attributes.booklist && 
                  Object.entries(attributes.booklist).map(([bookKey, bookAttribute]) => (
                  
                    <div key = {bookKey} className="col-lg-3 col-md-4 col-sm-6 col-12">
                       <BookCard title={bookAttribute.bookName} author={bookAttribute.author} image = {imgURL[bookKey]} />
                    </div>
                      
                  ))
              }
            </div>
          )) 
          : 
          <p>Loading...</p>
        }

          {filteredBooks.map(book => (
            <div key={book.id} className="col-lg-3 col-md-4 col-sm-6 col-12">
              <BookCard title={book.title} author={book.author} image={book.image} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Books;
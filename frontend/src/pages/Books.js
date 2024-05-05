import React, { useState } from 'react';
import BookCard from '../components/BookCard';  
import Banner from '../components/Banner';
import "../homePage.css";

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container' id="bookContainer">
      <Banner />
      <h1 class="bookList" ><strong>Book List</strong></h1>
      <input className='search'
        type="text"
        placeholder="Search book..."
        value={searchTerm}
        onChange={handleChange}
      />
      <div className="card_container">
        <div className="row" id="bookPageRow">
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

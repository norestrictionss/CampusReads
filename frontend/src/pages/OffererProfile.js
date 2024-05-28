import React, { useState } from "react";
import "../Profile.css"; // Import your CSS file for styling
import OffererBookCards from '../../src/components/OffererBookCard';
import OffererProfileHeader from '../../src/components/OffererProfileHeader';

export default function OffererUserPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([
        { id: 1, title: 'Harry Potter', author: 'J.K. Rowling', image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR5h4e7Njgs6hlF0Et2LoQK5Az1SK_gmd0w2VZvgkJndwlSi7gixrlCHb14m2dWmTdiofWTf4cHUlcP7VhmC8i3qZw7EaL63317YvMpcFt6zOVWpaBJVaTYig&usqp=CAE" },
        { id: 2, title: 'Lord of the Rings', author: 'J.R.R. Tolkien', image: "https://i.dr.com.tr/cache/500x400-0/originals/0000000113094-1.jpg" },
        { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', image: "https://i.dr.com.tr/cache/500x400-0/originals/0000000043580-1.jpg" },
        { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', image: "https://i.dr.com.tr/cache/500x400-0/originals/0001870020001-1.jpg" },
    ]);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [checkedCardId, setCheckedCardId] = useState(null);

    const handleCheckboxChange = (id) => {
      setCheckedCardId(id === checkedCardId ? null : id);
    };

    return (
        <div className="container" style={{ marginTop: "30px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <div className="row">
                <div className="col-md-12">
                    <div id="content" className="content content-full-width">
                        <div className="profile">
                            <OffererProfileHeader userName="@iremkiranmezar" userDepartment="Computer Science Engineering" userIcon="https://www.shareicon.net/download/2016/05/24/770080_people_512x512.png"/>
                        </div>
                        <div className="userAds" style={{ marginTop: "30px" }}>
                            <div class="row row-cols-1 row-cols-md-3 g-4">
                                {filteredBooks.map(book => (
                                    <OffererBookCards ssn = {book.id} title={book.title} author={book.author} image={book.image} isChecked={book.id === checkedCardId}
                                    onCheckboxChange={handleCheckboxChange}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};
import React, { useEffect, useState } from "react";
import "../Profile.css"; // Import your CSS file for styling
import UserBookCards from '../../src/components/UserBookCards';
import ProfileHeader from '../../src/components/ProfileHeader';

import { auth } from "../../src/config/firebase";
import { db } from "../../src/config/firebase";
import { ref, get } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { showBookList } from "./Operations";
import { Context } from "../contexts/AuthContext";

export default function UserPage() {

    const [user, setUser] = useState(null);
    const [profileData, setProfileData] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [books, setBooks] = useState([
        { id: 1, title: 'Harry Potter', author: 'J.K. Rowling', image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR5h4e7Njgs6hlF0Et2LoQK5Az1SK_gmd0w2VZvgkJndwlSi7gixrlCHb14m2dWmTdiofWTf4cHUlcP7VhmC8i3qZw7EaL63317YvMpcFt6zOVWpaBJVaTYig&usqp=CAE" },
        { id: 2, title: 'Lord of the Rings', author: 'J.R.R. Tolkien', image: "https://i.dr.com.tr/cache/500x400-0/originals/0000000113094-1.jpg" },
        { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', image: "https://i.dr.com.tr/cache/500x400-0/originals/0000000043580-1.jpg" },
        { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', image: "https://i.dr.com.tr/cache/500x400-0/originals/0001870020001-1.jpg" },
        { id: 5, title: '1984', author: 'George Orwell', image: "https://i.dr.com.tr/cache/500x400-0/originals/0000000064038-1.jpg" },
        { id: 6, title: 'Harry Potter2', author: 'J.K. Rowling', image: "https://i.dr.com.tr/cache/500x400-0/originals/0000000105931-1.jpg" },
        { id: 7, title: 'Lord of the Rings2', author: 'J.R.R. Tolkien', image: "https://i.dr.com.tr/cache/500x400-0/originals/0001989034001-1.jpg" },
        { id: 8, title: 'To Kill a Mockingbird2', author: 'Harper Lee', image: "./banner.png" },
        { id: 9, title: 'Pride and Prejudice2', author: 'Jane Austen', image: "./banner.png" },
        { id: 10, title: '1984', author: 'George Orwell2', image: "./banner.png" },

    ]);

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User data:", user);
                setUser(user);
                const userRef = ref(db, 'users/' + user.uid);
                get(userRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        setProfileData(snapshot.val());
                        console.log(user.phoneNumber);
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                console.log("Kullanıcı oturumu yok");
                setUser(null);
                setProfileData(null);
            }
        });

        return () => unsubscribe();
    }, []);


    if (!user) {
        return <div>Please log in</div>;
    }

    return (
        <div className="container" style={{ marginTop: "30px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <div className="row">
                <div className="col-md-12">
                    <div id="content" className="content content-full-width">
                        {profileData ? (
                            <div className="profile">
                                <ProfileHeader userName={user.email} userDepartment={user.department} userIcon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN6marVqh3eZx1rmily_92k6hw4hp7sZCSL0NRJYdvMA&s" />
                            </div>
                        ) : (
                            <p>Loading profile...</p>
                        )}
                        <div className="userAds" style={{ marginTop: "30px" }}>
                            <div class="row row-cols-1 row-cols-md-3 g-4">
                                {filteredBooks.map(book => (
                                    <UserBookCards title={book.title} author={book.author} image={book.image} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

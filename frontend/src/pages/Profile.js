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
import { getDownloadURL, getStorage } from 'firebase/storage';

export default function UserPage() {

    const [user, setUser] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const storage = getStorage();
    const [ imgURL, setImgURL] = useState("");
    const [fetchedBooks, setFetchedBooks] = useState([]);
    const [loadingBooks, setLoadingBooks] = useState(true); // Add loading state
    
    // This part fetches books with images.
    useEffect(() => {
        const fetchBookList = async () => {
            
            try {
                const bookList = await showBookList(user.uid);
                if(bookList) {
                    console.log("Bookies:", bookList);
                    console.log("Book List:", bookList);
                    // It merges the book lists with image URL's.
                    const bookEntriesWithImageURLs = await Promise.all(Object.entries(bookList).map(async ([key, book]) => {
                        try {
                            const imageURL = await getDownloadURL(ref(storage, `images/${key}`));
                            console.log("IMAGE URL:", imageURL);
                            return [key, { ...book, imageURL }];
                        } catch (error) {
                            console.error("Error fetching image URL for book with key", key, ":", error);
                            return [key, { ...book, imageURL: null }];
                        }
                    }));
                    setFetchedBooks(bookEntriesWithImageURLs);
                    console.log("Fetched books:", fetchedBooks);
                    setLoadingBooks(false); // It keeps the loading.
                    
                }
            } catch (error) {
                console.error("Error fetching book list:", error);
                setLoadingBooks(false); // It keeps loading part.
            }

    
        };
        fetchBookList();
    }, []);

    async function getImage(imageName, imgURL){
        
        try {
            const imageURL = await getDownloadURL(ref(storage, imageName));
            console.log("Image URL:", imageURL);
            return imageURL;
        } catch (error) {
            console.error("Error fetching image URL:", error);
            return null; // Return null when the image URL does not exist
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("User data:", user);
                setUser(user);
                const userRef = ref(db, 'users/' + user.uid);
                get(userRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        setProfileData(userData);
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                setUser(null);
                setProfileData(null);
            }
        });
    
        return () => unsubscribe();
    }, [auth, db]);
    

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
                                <ProfileHeader userName={profileData.email} userDepartment={profileData.department} userIcon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN6marVqh3eZx1rmily_92k6hw4hp7sZCSL0NRJYdvMA&s" />
                            </div>
                        ) : (
                            <p>Loading profile...</p>
                        )}
                        <div className="userAds" style={{ marginTop: "30px" }}>
                            <div class="row row-cols-1 row-cols-md-3 g-4">
                            {loadingBooks ? <p>Loading...</p>: 
                                <>
                                {fetchedBooks.length > 0  ? 
                                    fetchedBooks.map(([key, attributes]) => <div>
                                            <UserBookCards title={attributes.bookName} author={attributes.author} image={ attributes.imageURL} 
                                            bookID ={key} userID = {user.uid} /></div>
                                    )
                                 : (
                                    <div className="col-12">
                                        <p>You don't have any books yet added to the platform.</p>
                                    </div>
                                )}
                                </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

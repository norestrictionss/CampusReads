import React, { useState, useEffect, useContext } from "react";
import "../Profile.css"; // Import your CSS file for styling
import UserBookCards from '../../src/components/UserBookCards';
import ProfileHeader from '../../src/components/ProfileHeader';
import { showBookList } from "./Operations";
import { Context } from "../contexts/AuthContext";
import { getStorage } from 'firebase/storage';
import { getUserDetails } from "./Operations";

import { auth } from "../../src/config/firebase";
import { db } from "../../src/config/firebase";
import { ref, get } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';

export default function UserPage() {

    const storage = getStorage();
    const [ imgURL, setImgURL] = useState("");
    const [profileData, setProfileData] = useState(null);
    const { user } = useContext(Context);
    const [fetchedBooks, setFetchedBooks] = useState([]);
    const [loadingBooks, setLoadingBooks] = useState(true); // Add loading state

    // This part fetches books with images.
    useEffect(() => {
        const fetchBookList = async () => {
            
            try {
                const bookList = await showBookList(user.uid);
                const books = Object.entries(bookList);
                if(bookList) {
                    console.log("Bookies:", bookList);
                    console.log("Book List:", bookList);
                    // It merges the book lists with image URL's.
                    setFetchedBooks(books);
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
    
    useEffect(()=>{
        const userDetailsProcess = async()=>{
            try{
                console.log("user infoooo:",user.uid);
                const profileInfo = await getUserDetails(user.uid);
                console.log("Hii:",profileInfo);
                setProfileData(profileInfo);
            }
            catch(error){
                console.log("Error fetching user data.");
                console.log(error.message);
            }
        }
        userDetailsProcess();
    }, [user]);
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
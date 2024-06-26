import React, { useState, useEffect, useContext } from "react";
import "../Profile.css"; 
import OffererBookCards from '../../src/components/OffererBookCard';
import OffererProfileHeader from '../../src/components/OffererProfileHeader';
import { getUserDetails, getRequests, findBookByID } from "./Operations";
import { Context } from "../contexts/AuthContext";
import { useParams } from 'react-router-dom';
import { showBookList } from "./Operations";

import { ref, push, update, remove, get } from 'firebase/database';
import { db } from "../config/firebase"; 
export default function OffererUserPage() {

    const [selectedBookId, setSelectedBookId] = useState(null);

    const handleCheckboxChange = (bookId) => {
        setSelectedBookId(bookId === selectedBookId ? null : bookId);
    };

    const [profileData, setProfileData] = useState(null);
    const { user } = useContext(Context);
    const { senderId, book1Id } = useParams();
    const [fetchedBooks, setFetchedBooks] = useState([]);
    const [loadingBooks, setLoadingBooks] = useState(true); 
    const [requestID, setRequestID] = useState("");
    useEffect(() => {
        const fetchBookList = async () => {
            try {
                const bookList = await showBookList(senderId); 
                console.log("sender id : ", senderId);
                if (bookList) {
                    console.log("Book List:", bookList);
                    const books = Object.entries(bookList);
                    // It merges the book lists with image URL's.
                    setFetchedBooks(books);
                    console.log("Fetched books:", fetchedBooks);
                }
            } catch (error) {
                console.error("Error fetching book list:", error);
            } finally {
                setLoadingBooks(false); // Loading durumunu buraya taşıdık.
            }
        };
        fetchBookList();
    }, [senderId]);

    useEffect(() => {
        const userDetailsProcess = async () => {
            try {
                const profileInfo = await getUserDetails(senderId);
                setProfileData(profileInfo);
            }
            catch (error) {
                console.log("Error fetching user data.");
                console.log(error.message);
            }
        }
        userDetailsProcess();
    }, []);

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const notificationCardProcess = async () => {
            try {
                const senderIdValue = { senderId };
                const allRequests = Object.entries(await getRequests(senderIdValue));
                if (allRequests) {
                    setRequests(allRequests);
                }
                console.log("Requests:", allRequests);
            } catch (error) {
                console.error("Error with getting requests", error);
            }
        };
        notificationCardProcess();
    }, []);

    useEffect(() => {
        const updateSelectedBookID = async () => {
            let found = false;
            for (const [key, attributes] of requests) {
                if (attributes.senderId === senderId) {
                    console.log("atributes ", attributes.senderId);
                    const book = await findBookByID(attributes.senderId, selectedBookId);
                    if (book) {
                       
                        const userRef = ref(db, `Requests/${key}`);
                        const updates = {
                            book2ID: selectedBookId
                        };
                        setRequestID(key);
                        await update(userRef, updates);
                        found = true;
                    }
                    else if(book==null){
                        const userRef = ref(db, `Requests/${key}`);
                        const updates = {
                            book2ID: ""
                        };
                        await update(userRef, updates);
                        found = true;
                    }

                    
                }
            }
            
            if (!found) {
                console.log("Requests not found");
            }
        };
     if (requests.length > 0) {
            updateSelectedBookID();
        } else {
            console.log("Requests not found");
        }
    }, [selectedBookId, requests]); 

    const getProfileImage = (gender) => {
        if (gender === 'male') {
            return "https://bootdey.com/img/Content/avatar/avatar1.png"; 
        } else if (gender === 'female') {
            return "https://bootdey.com/img/Content/avatar/avatar3.png"; 
        } else {
            return "https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"; // Default icon URL
        }
    };

    return (
        <div className="container" style={{ marginTop: "30px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <div className="row">
                <div className="col-md-12">
                    <div id="content" className="content content-full-width">
                        {profileData ? (
                            <div className="profile">
                                <OffererProfileHeader userName={profileData.username} userDepartment={profileData.department} userIcon={getProfileImage(profileData.gender)} />
                            </div>
                        ) : (
                            <p>Loading profile...</p>
                        )}
                        <div className="userAds" style={{ marginTop: "30px" }}>
                            <div class="row row-cols-1 row-cols-md-3 g-4">
                                {loadingBooks ? <p>Loading...</p> :
                                    <>
                                        {fetchedBooks.length > 0 ?
                                            fetchedBooks.map(([key, attributes]) => <div key={key}>
                                                <OffererBookCards
                                                    ssn={attributes.bookSSN}
                                                    title={attributes.bookName}
                                                    author={attributes.author}
                                                    image={attributes.imageURL}
                                                    isChecked={key === selectedBookId}
                                                    onCheckboxChange={handleCheckboxChange}
                                                    book1ID={book1Id}
                                                    book2ID={key}
                                                    senderID={senderId}
                                                    ownerID = {user.uid}
                                                    selectedBookId = {selectedBookId}
                                                    requestID = {requestID}
                                                />
                                            </div>
                                            )
                                            : (
                                                <div className="col-12">
                                                    <p>There is not any books yet added to the platform.</p>
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
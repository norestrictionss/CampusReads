import React, { useEffect, useState, useContext } from "react";
import "../Profile.css"; // Stil dosyanızı içe aktarın
import ProfileHeader from '../components/ProfileHeader';
import "../sendedRequest.css"; // Stil dosyanızı içe aktarın
import NotificationsCard from '../components/NotificationsCard';

import { useParams } from 'react-router-dom';
import { getUserDetails, getRequests ,findBookByID} from "./Operations";
import { auth } from "../../src/config/firebase";
import { db } from "../../src/config/firebase";
import { ref, get } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { showBookList } from "./Operations";
import { Context } from "../contexts/AuthContext";

export default function Notification() {

    const [profileData, setProfileData] = useState(null);
    const [requests, setRequests] = useState([]);
    const { user } = useContext(Context);
    const [fetchedBooks, setFetchedBooks] = useState([]);
    const [loadingBooks, setLoadingBooks] = useState(true); // Add loading state
    const [notifications, setNotifications] = useState([]);
    console.log(user.uid);

    useEffect(()=>{
        const userDetailsProcess = async()=>{
            try{
                const profileInfo = await getUserDetails(user.uid);
                setProfileData(profileInfo);
            }
            catch(error){
                console.log("Error fetching user data.");
                console.log(error.message);
            }
        }
        userDetailsProcess();
    }, [user]);

    useEffect(() => {
        const fetchBookList = async () => {
            try {
                const bookList = await showBookList(user.uid);
                const books = Object.entries(bookList);
                if (bookList) {
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

    const [requestStatus, setRequestStatus] = useState("pending");

    const acceptRequest = () => {
        setRequestStatus("accept");
    };

    const rejectRequest = () => {
        setRequestStatus("reject");
    };

    const[selectedBookName, setSelectedBookName] = useState("There is no selected book!");
    const [senderRequestId, setsenderRequestId] = useState(null);
    useEffect(() => {
        const notificationCardProcess = async () => {
          try {
            const allRequests = Object.entries(await getRequests(user.uid));
            if(allRequests){
                setRequests(allRequests);
            }
            console.log("Requests:",allRequests);
          } catch (error) {
            console.error("Error with getting requests", error);
          }
        };
        notificationCardProcess();
      }, []);

      useEffect(() => {
        const updateSelectedBookName = async () => {
          for (const [key, attributes] of requests) {
            if (attributes.book2ID !== "") {
              const book = await findBookByID(attributes.senderId, attributes.book2ID);
              if (book) {
                setSelectedBookName(book.bookName);
                setsenderRequestId(attributes.senderId);
                break; 
              }
            }
          }
        };
      
        if (requests.length > 0) {
          updateSelectedBookName();
        }
      }, [requests, user.uid]);

    return (
        <div className="container" style={{ marginTop: "30px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            {profileData ? (
                <div className="profile">
                    <ProfileHeader userName={profileData.email} userDepartment={profileData.department} userIcon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN6marVqh3eZx1rmily_92k6hw4hp7sZCSL0NRJYdvMA&s" />
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
            <div className="sendedRequest-container" style={{ marginTop: "30px", borderRadius: "10px", padding: "20px" }}>
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    {requests.length > 0 ?
                        requests
                            .filter(([key, attributes]) => attributes.ownerID === user.uid) // It filters the all requests according to user
                            .map(([key, attributes]) =>   (
                                <div key={key} >
                                    <NotificationsCard
                                        id={attributes.requestId}
                                        senderId={attributes.senderId}
                                        book1Id={attributes.book1ID}
                                        title={attributes.bookName}
                                        name={attributes.senderName}
                                        lastName={attributes.senderSurname}
                                        email={attributes.senderEmail}
                                        phoneNumber={attributes.senderPhoneNumber}
                                        bookimage={attributes.imageURL}
                                        message={attributes.senderMessage}
                                        ownerIcon="https://cdn-icons-png.freepik.com/256/552/552721.png?semt=ais_hybrid"
                                        requestStatus={attributes.requestStatus}
                                        acceptRequest={() => acceptRequest(attributes.id)}
                                        rejectRequest={() => rejectRequest(attributes.id)}
                                        selectedBookName={attributes.senderId === senderRequestId ? selectedBookName : "There is no selected book!"}/>
                                </div>
                            ))
                        :
                        <p>Loading...</p>
                    }
                </div>
            </div>
        </div>
    );
};
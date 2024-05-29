import React, { useEffect, useState, useContext } from "react";
import "../Profile.css"; // Import your CSS file for styling
import ProfileHeader from '../../src/components/ProfileHeader';
import "../sendedRequest.css"; // Import your CSS file for styling
import RequestCards from '../../src/components/sendedRequestCard';
import { getUserDetails, getRequests, findBookByID } from "./Operations";
import { Context } from "../contexts/AuthContext";

export default function SendedRequests() {
    const { user } = useContext(Context); 
    const [profileData, setProfileData] = useState(null);
    const [requests, setRequests] = useState([]); // Listing whole requests.
    const [bookDetails, setBookDetails] = useState({}) // It holds the whole details of the book which has been sent request to.

    useEffect(() => {
        const fetchBook= async () => {
          try {
            const book= await findBookByID(user.uid);
            if(book){
                setBookDetails(book);
            }
            console.log("Books:",book);
          } catch (error) {
            console.error("Error with getting requests", error);
          }
        };
        
      }, []);
    

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
 
    console.log(bookDetails);
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
             {requests.length > 0 ? 
                requests
                    .filter(([key, attributes]) => attributes.senderId === user.uid) // It filters the all requests according to user
                    .map(([key, attributes]) => (
                        <div className="row row-cols-1 row-cols-md-2 g-4" key={key}>
                            <RequestCards 
                                title={attributes.bookName} 
                                bookOwnerEmail={attributes.ownerEmail} 
                                bookimage={attributes.imageURL} 
                                ownerIcon="https://www.shareicon.net/download/2016/05/24/770080_people_512x512.png" 
                                requestStatus={attributes.requestStatus}
                            />
                        </div>
                    ))
                :
                <p>Loading...</p>
            }

            </div>

        </div>
    );
};
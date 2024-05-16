import React, { useState } from "react";
import "../Profile.css"; // Stil dosyanızı içe aktarın
import ProfileHeader from '../components/ProfileHeader';
import "../sendedRequest.css"; // Stil dosyanızı içe aktarın
import NotificationsCard from '../components/NotificationsCard';

export default function Notification() {
    const [requestStatus, setRequestStatus] = useState("pending");

    const acceptRequest = () => {
        setRequestStatus("accept");
    };

    const rejectRequest = () => {
        setRequestStatus("reject");
    };

    return (
        <div className="container" style={{ marginTop: "30px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <div className="profile">
                <ProfileHeader userName="@iremaydin" userDepartment="Computer Science Engineering" />
            </div>
            <div className="sendedRequest-container" style={{ marginTop: "30px", borderRadius: "10px", padding: "20px" }}>
                <div className="row row-cols-1 row-cols-md-2 g-4">
                    <NotificationsCard
                        title="Martin Eden"
                        bookOwner="İrem Kıranmezar"
                        bookimage="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR5h4e7Njgs6hlF0Et2LoQK5Az1SK_gmd0w2VZvgkJndwlSi7gixrlCHb14m2dWmTdiofWTf4cHUlcP7VhmC8i3qZw7EaL63317YvMpcFt6zOVWpaBJVaTYig&usqp=CAE"
                        ownerIcon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN6marVqh3eZx1rmily_92k6hw4hp7sZCSL0NRJYdvMA&s"
                        requestStatus={requestStatus} 
                        acceptRequest={acceptRequest} 
                        rejectRequest={rejectRequest} 
                    />
                </div>
            </div>
        </div>
    );
};

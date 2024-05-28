import React, { useEffect, useState } from "react";
import "../Profile.css"; // Import your CSS file for styling
import ProfileHeader from '../../src/components/ProfileHeader';
import "../sendedRequest.css"; // Import your CSS file for styling
import RequestCards from '../../src/components/sendedRequestCard';

import { auth } from "../../src/config/firebase";
import { db } from "../../src/config/firebase";
import { ref, get } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { showBookList } from "./Operations";
import { Context } from "../contexts/AuthContext";

export default function SendedRequests() {
    const [user, setUser] = useState(null);
    const [profileData, setProfileData] = useState(null);

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
                <div class="row row-cols-1 row-cols-md-2 g-4">
                    <RequestCards title="Martin Eden" bookOwner="İrem Kıranmezar" bookimage="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR5h4e7Njgs6hlF0Et2LoQK5Az1SK_gmd0w2VZvgkJndwlSi7gixrlCHb14m2dWmTdiofWTf4cHUlcP7VhmC8i3qZw7EaL63317YvMpcFt6zOVWpaBJVaTYig&usqp=CAE" ownerIcon="https://www.shareicon.net/download/2016/05/24/770080_people_512x512.png" requestStatus="pending"></RequestCards>
                </div>
            </div>

        </div>
    );
};
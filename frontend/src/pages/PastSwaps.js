import React, { useEffect, useState, useContext } from "react";
import "../Profile.css"; // Import your CSS file for styling
import ProfileHeader from '../../src/components/ProfileHeader';
import "../sendedRequest.css"; // Import your CSS file for styling
import PastSwapCard from '../../src/components/pastSwapCard'
import { Context } from "../../src/contexts/AuthContext";
import { getStorage } from 'firebase/storage';
import { getUserDetails } from "./Operations";

export default function PastSwaps() {

    const [profileData, setProfileData] = useState(null);
    const { user } = useContext(Context);

    useEffect(() => {
        const userDetailsProcess = async () => {
            try {
                console.log("user infoooo:", user.uid);
                const profileInfo = await getUserDetails(user);
                console.log("Hii:", profileInfo);
                setProfileData(profileInfo);
            }
            catch (error) {
                console.log("Error fetching user data.");
                console.log(error.message);
            }
        }
        userDetailsProcess();
    }, [user]);

    return (
        <div className="container" style={{ marginTop: "30px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            {profileData ? (
                <div className="profile">
                    <ProfileHeader userName={profileData.email} userDepartment={profileData.department} userIcon="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN6marVqh3eZx1rmily_92k6hw4hp7sZCSL0NRJYdvMA&s" />
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
            <div className="pastSwaps-container" style={{ marginTop: "30px", borderRadius: "10px", padding: "20px" }}>
                <div class="row row-cols-1 row-cols-md-1 g-4">
                    <PastSwapCard swapDate="17.05.2024" firstBookTitle="Martin Eden" firstBookImg="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR5h4e7Njgs6hlF0Et2LoQK5Az1SK_gmd0w2VZvgkJndwlSi7gixrlCHb14m2dWmTdiofWTf4cHUlcP7VhmC8i3qZw7EaL63317YvMpcFt6zOVWpaBJVaTYig&usqp=CAE" secondBookTitle="1984" secondBookImg="https://i.dr.com.tr/cache/500x400-0/originals/0000000064038-1.jpg" advertOwnerUserName="İrem Kıranmezar" offererUserName="İrem Aydın"></PastSwapCard>
                </div>
            </div>

        </div>
    );
};
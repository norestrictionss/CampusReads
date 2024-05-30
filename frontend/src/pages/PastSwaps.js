import React, { useEffect, useState, useContext } from "react";
import "../Profile.css"; 
import ProfileHeader from '../../src/components/ProfileHeader';
import "../sendedRequest.css"; 
import PastSwapCard from '../../src/components/pastSwapCard'
import { Context } from "../../src/contexts/AuthContext";
import { getStorage } from 'firebase/storage';
import { getUserDetails } from "./Operations";

export default function PastSwaps() {

    const [profileData, setProfileData] = useState(null);
    const { user } = useContext(Context);

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
            {profileData ? (
                <div className="profile">
                    <ProfileHeader userName={profileData.username} userDepartment={profileData.department} userIcon={getProfileImage(profileData.gender)} />
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
import React, { useState } from "react";
import "../Profile.css"; // Import your CSS file for styling
import ProfileHeader from '../../src/components/ProfileHeader';
import "../sendedRequest.css"; // Import your CSS file for styling
import PastSwapCard from '../../src/components/pastSwapCard'


export default function PastSwaps() {
    return (
        <div className="container" style={{ marginTop: "30px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <div className="profile">
                <ProfileHeader userName="@iremaydin" userDepartment="Computer Science Engineering" />
            </div>
            <div className="pastSwaps-container" style={{ marginTop: "30px", borderRadius: "10px", padding: "20px" }}>
                <div class="row row-cols-1 row-cols-md-1 g-4">
                <PastSwapCard swapDate = "17.05.2024" firstBookTitle = "Martin Eden" firstBookImg = "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR5h4e7Njgs6hlF0Et2LoQK5Az1SK_gmd0w2VZvgkJndwlSi7gixrlCHb14m2dWmTdiofWTf4cHUlcP7VhmC8i3qZw7EaL63317YvMpcFt6zOVWpaBJVaTYig&usqp=CAE" secondBookTitle = "1984" secondBookImg = "https://i.dr.com.tr/cache/500x400-0/originals/0000000064038-1.jpg" advertOwnerUserName = "İrem Kıranmezar" offererUserName ="İrem Aydın"></PastSwapCard>
                </div>
            </div>

        </div>
    );
};
import React, { useState } from "react";
import "../Profile.css"; // Import your CSS file for styling
import ProfileHeader from '../../src/components/ProfileHeader';


export default function SendedRequests() {
    return (
        <div className="container" style={{ marginTop: "30px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <div className="profile">
                <ProfileHeader userName="@iremaydin" userDepartment="Computer Science Engineering" />
            </div>
        </div>
    );
};

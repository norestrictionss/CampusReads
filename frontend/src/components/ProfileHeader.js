import React from 'react';
import "../Profile.css"; // Import your CSS file for styling

const ProfileHeader = ({ userName, userDepartment}) => {
    return (
        <div className="profile-header">
            <div className="profile-header-cover"></div>

            <div className="profile-header-content">

                <div className="profile-header-img">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN6marVqh3eZx1rmily_92k6hw4hp7sZCSL0NRJYdvMA&s" alt="" />
                </div>

                <div className="profile-header-info">
                    <h4 className="m-t-10 m-b-5">{userName}</h4>
                    <p className="m-b-10">{userDepartment}</p>

                    <div className="d-flex justify-content-end" >
                        <a href="/addnewbook" className="btn btn-sm btn-dark mb-2">Add New Book</a>
                        <span style={{ margin: "0 10px" }}></span> { }
                        <a href="/editProfile" className="btn btn-sm btn-dark mb-2" >Edit Profile</a>
                    </div>
                </div>
            </div>

            <ul class="profile-header-tab nav nav-tabs">
                <li class="nav-item"><a href="/Profile" target="__blank" class="nav-link_ active show">YOUR ADS</a></li>
                <li class="nav-item"><a href="/pastSwaps" target="__blank" class="nav-link_">PAST SWAPS</a></li>
                <li class="nav-item"><a href="/sendedRequests" target="__blank" class="nav-link_">SENDED REQUESTS</a></li>
                <li class="nav-item"><a href="/notifications" target="__blank" class="nav-link_">NOTIFICATIONS</a></li>
            </ul>

        </div>

    );

};

export default ProfileHeader;
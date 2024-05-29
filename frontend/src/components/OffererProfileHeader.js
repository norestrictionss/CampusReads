import React from 'react';
import "../Profile.css"; // Import your CSS file for styling

const OffererProfileHeader = ({userName, userDepartment , userIcon}) => {

    return (
        <div className="profile-header">
            <div className="profile-header-cover"></div>

            <div className="profile-header-content">

                <div className="profile-header-img">
                    <img src={userIcon} alt="" />
                </div>

                <div className="profile-header-info">
                    <h4 className="m-t-10 m-b-5">{userName}</h4>
                    <p className="m-b-10">{userDepartment}</p>
                </div>
               
            </div>
            <br/><br/>
            <ul class="profile-header-tab nav nav-tabs">
                <li class="nav-item"><a href="/OffererProfile" target="__blank" class="nav-link_ active show">USER'S ADS</a></li>
            </ul>
            
        </div>

    );

};

export default OffererProfileHeader;
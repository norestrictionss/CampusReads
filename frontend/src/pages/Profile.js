import React, { useState, useEffect, useContext } from "react";
import "../Profile.css"; 
import UserBookCards from '../../src/components/UserBookCards';
import ProfileHeader from '../../src/components/ProfileHeader';
import { showBookList } from "./Operations";
import { Context } from "../contexts/AuthContext";
import { getStorage } from 'firebase/storage';
import { getUserDetails } from "./Operations";


export default function UserPage() {
    const storage = getStorage();
    const [imgURL, setImgURL] = useState("");
    const [profileData, setProfileData] = useState(null);
    const { user } = useContext(Context);
    const [fetchedBooks, setFetchedBooks] = useState([]);
    const [loadingBooks, setLoadingBooks] = useState(true); 

    // This part fetches books with images.
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

    useEffect(() => {
        const userDetailsProcess = async () => {
            try {
                const profileInfo = await getUserDetails(user.uid);
                setProfileData(profileInfo);
            } catch (error) {
                console.log("Error fetching user data.");
                console.log(error.message);
            }
        }
        userDetailsProcess();
    }, [user]);

    // It defaults the profile image according to gender attribute.
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
            <div className="row">
                <div className="col-md-12">
                    <div id="content" className="content content-full-width">
                        {profileData ? (
                            <div className="profile">
                                <ProfileHeader
                                    userName={profileData.username}
                                    userDepartment={profileData.department}
                                    userIcon={getProfileImage(profileData.gender)}
                                />
                            </div>
                        ) : (
                            <p>Loading profile...</p>
                        )}
                        <div className="userAds" style={{ marginTop: "30px" }}>
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                {loadingBooks ? <p>Loading...</p> :
                                    <>
                                        {fetchedBooks.length > 0 ?
                                            fetchedBooks.map(([key, attributes]) => (
                                                <div key={key}>
                                                    <UserBookCards
                                                        title={attributes.bookName}
                                                        author={attributes.author}
                                                        image={attributes.imageURL}
                                                        bookID={key}
                                                        userID={user.uid}
                                                    />
                                                </div>
                                            ))
                                            : (
                                                <div className="col-12">
                                                    <p>You don't have any books yet added to the platform.</p>
                                                </div>
                                            )}
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

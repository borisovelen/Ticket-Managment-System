import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Logout from "./Logout";
import './ProfilePage.css';
import DeleteProfile from "./DeleteProfile";

function ProfilePage() {
    const { profile } = useUserContext();
    const navigate = useNavigate();

    return (
        <div className="profile-page">
            <div className="profile-title"><h2>Profile Information</h2></div>
            {profile === null
                ?
                <div className="not-logged">
                    <p>You have to be logged in to be able to view your profile details!</p>
                    <p>If you have an account you can <a onClick={() => navigate("/login")}>login here</a> or you can <a onClick={()=> navigate("/register")}>create a new account</a>!</p>
                </div>
                :
                <div className="profile-details">
                    <span>
                        <h3>Name: </h3>
                        <p>{profile?.name}</p>
                    </span>
                    <span>
                        <h3>E-Mail: </h3>
                        <p>{profile?.email}</p>
                    </span>
                    <span>
                        <h3>Role: </h3>
                        <p>{profile?.role}</p>
                    </span>
                    <span>
                        <h3>Joined On: </h3>
                        <p>{new Date(profile?.joined_on).toLocaleDateString("en-EN", { day: 'numeric', month: "long", year: 'numeric', hour: 'numeric', minute: 'numeric' })} ({Math.floor(new Date().toLocaleDateString("en-EN", { day: 'numeric' }) - new Date(profile?.joined_on).toLocaleDateString("en-EN", { day: 'numeric' }))} days ago)</p>
                    </span>
                    <div className="buttons-container"><DeleteProfile /><Logout /></div>
                </div>
            }
        </div>
    )
}
export default ProfilePage;
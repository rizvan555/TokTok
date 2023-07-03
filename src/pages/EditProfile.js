import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";


import leftArrowImage from "../resource/icons/Groupleft_arrow_back.svg"

// Import - components ----------------

import EditProfileImage from "../components/EditProfileImage";
import EditProfileTextInput from "../components/EditProfileTextInput";
import UpdateButton from "../components/UpdateButton";

// --- style --------------------------

import '../css/editProfile.css';

// ------------------------------------


const EditProfile = () => {
    const { state: navState } = useLocation();
    const nav = useNavigate();
    const [error, setError] = useState(navState?.redirectReason || "");
    const [user, setUser] = useState({
        name: "",
        username: "",
        activity: "",
        birthday: "",
        email: "",
        tel: "",
        gender: "",
        website: "",
        aboutMe: "",
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        console.log("handleSubmit");
        try {
            await axios.put("/api/user", user, { withCredentials: true })
            nav("/profile");

        } catch (error) {
            const responseError = error?.response?.data?.error?.message;
            if (responseError) {
                setError(responseError);
            } else {
                setError("Something went wrong. Please try again later.")
            }
        }
    }

    return (
        <div className="editprofile_page">
            <section className="editprofile_topbar">
                <Link to='/profile'><img src={leftArrowImage} alt="left_arrow_icon" /></Link>
                <h5>Edit Profile</h5>
            </section>
            <form onSubmit={handleSubmit} >
                <EditProfileImage />
                <EditProfileTextInput user={user} setUser={setUser} />
                <UpdateButton />
            </form>
        </div>
    );
}

export default EditProfile;


import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import leftArrowImage from "../resource/icons/Groupleft_arrow_back.svg"


// Import - components ----------------

import EditProfileImage from "../components/EditProfileImage";
import EditProfileTextInput from "../components/EditProfileTextInput";
import UpdateButton from "../components/UpdateButton";


// --- style --------------------------

import "../css/editProfile.css";
import { BsArrowLeft } from "react-icons/bs";

// ------------------------------------


const EditProfile = ({ darkLight, setDarkLight }) => {

    // const { state: navState } = useLocation();
    const nav = useNavigate();
    const [error, setError] = useState("");
    const [user, setUser] = useState({
    })
    console.log(user);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        console.log(user);

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
  }


    return (
        <div className="editprofile_page">
            
            <section className="editprofile_topbar">
                <Link to="/profile">
                    <BsArrowLeft
                        size={25}
                        style={{ color: !darkLight ? "white" : "black" }}
                    />
                </Link>
                <h5 style={{ color: !darkLight ? "white" : "black" }}>Edit Profile</h5>
            </section>
            {/* <img src={user.avatar} alt="profile" className="profile_pic" /> */}

            <form onSubmit={handleSubmit} >
                <EditProfileImage user={user} setUser={setUser} />
                <EditProfileTextInput user={user} setUser={setUser} />
                <UpdateButton />
            </form>
        </div>
    );
}

export default EditProfile;


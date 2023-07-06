import { Link, useLocation } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import "../css/ownProfile.css";

// Import - Images -----------------------------------

import profile_image from '../resource/images/EllipseunknownUser.png';
import profile_edit_icon from "../resource/icons/newEditIcon.svg";
import newUserImage from '../resource/images/EllipseunknownUser.png';


// ---------------------------------------------------

const ProfileFacts = ({ click, darkLight, user, setUser }) => {

  const [res, setRes] = useState({});

  // const location = useLocation();
  // console.log(location.state);


  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await axios.get('/api/user');
        setUser(response.data);
        console.log(response);
      } catch (error) {
        console.error('Fehler beim Abrufen der Benutzerdaten', error);
      }
    };
    console.log(user)

    getUserProfile();
  }, []);


  return (
    <div style={{ color: !darkLight ? "white" : "black" }}>
      <article className="profile_article">
        <div className="image-container">
          {user.avatar ? (
            <img src={user.avatar} className='profile_image' width='140' height='140' alt="profile image" style={{ 'border-radius': '100px' }} />
          ) : (
            <img src={newUserImage} className='profile_image' alt="default profile image" />
          )}
          {/* {file && <center> {file.name}</center>} */}
          <Link to="/editprofile">
            <img
              src={profile_edit_icon}
              className="edit_icon"
              alt="edit_icon"
              style={{ 'border-radius': '10px' }}
            />
          </Link>
        </div>

        <h1>{user.name ? user.name : "Your name"}</h1>
        {!click ? <h3>{user.activity ? user.activity : "Job title"}</h3> : ""}
        {!click ? (
          <p style={{ color: !darkLight ? "white" : "black" }}>
            {user.aboutMe ? user.aboutMe : "Tell other user something about you."}
          </p>
        ) : (
          ""
        )}
        {!click ? <p>{user.website ? user.website : "Your domain"}</p> : ""}
      </article>
      {!click ? (
        <section className="follower_section">
          <div className="posts">
            <h5>356</h5>
            <p style={{ color: !darkLight ? "white" : "black" }}>Posts</p>
          </div>
          <div className="followers">
            <h5>46.379</h5>
            <p style={{ color: !darkLight ? "white" : "black" }}>Followers</p>
          </div>
          <div className="following">
            <h5>318</h5>
            <p style={{ color: !darkLight ? "white" : "black" }}>Following</p>
          </div>
        </section>
      ) : (
        ""
      )}
      <div className="follower_section_line"></div>
    </div>
  );
};

export default ProfileFacts;

import { Link, useLocation } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import "../css/ownProfile.css";

// Import - Images -----------------------------------

import profile_image from '../resource/images/EllipseunknownUser.png';
import profile_edit_icon from "../resource/icons/Edit Squareprofile_image_edit_icon.png";

// ---------------------------------------------------

const ProfileFacts = ({ click, darkLight, user, setUser }) => {

  const location = useLocation();
  // console.log(location.state);

  // const [avatar, setAvatar] = useState({
  //   profil_img: profile_image
  // })

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
          {/* <img
            src={avatar.profil_img}
            className="profile_img"
            alt="profile_image_user"
          /> */}
          <Link to="/editprofile">
            <img
              src={profile_edit_icon}
              className="edit_icon"
              alt="edit_icon"
            />
          </Link>
        </div>

        <h1>{user.name}</h1>
        {!click ? <h3>{user.activity}</h3> : ""}
        {!click ? (
          <p style={{ color: !darkLight ? "white" : "black" }}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio magni
            totam, harum exercitationem accusamus facere praesentium expedita.
          </p>
        ) : (
          ""
        )}
        {!click ? <p>www.toktok.com</p> : ""}
      </article>
      {!click ? (
        <section className="follower_section">
          <div className="posts">
            <h5>356</h5>
            <p style={{ color: !darkLight ? "white" : "black" }}>Posts</p>
          </div>
          <div className="followers">
            <h5>46,379</h5>
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

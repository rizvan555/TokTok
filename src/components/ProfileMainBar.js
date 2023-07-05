// Import - Images -----------------------------------
import logo from "../resource/logos/toktokLogo.png";
import { PiDotsThreeCircle } from "react-icons/pi";
import { LuEdit3 } from "react-icons/lu";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";

// ---------------------------------------------------

const ProfileMainBar = ({ click, setClick, darkLight, user, setUser }) => {

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
    <nav className="profile_mainbar">
      <section>
        <Link to="/">
          <img src={logo} className="toktok-logo" alt="logo toktok klein" />
        </Link>
        <h2 style={{ color: !darkLight ? "white" : "black" }}> {user.username}</h2>
      </section>
      <nav className="head-navigation">
        <Link to="/upload">
          <AiOutlinePlusSquare
            size={29}
            style={{ color: !darkLight ? "white" : "black" }}
          />
        </Link>
        <Link to="/editprofile" >
          <LuEdit3
            size={28}
            style={{ color: !darkLight ? "white" : "black" }}
          />
        </Link>
        <button className="settingsButton" onClick={() => setClick(!click)}>
          <PiDotsThreeCircle
            size={30}
            style={{
              color: !darkLight ? "white" : "black",
              marginLeft: "-8px",
            }}
          />
        </button>
      </nav>
    </nav>
  );
};

export default ProfileMainBar;

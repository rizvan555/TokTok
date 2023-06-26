import React, { useState } from "react";
import frame from "../resource/icons/frame.png";
import home from "../resource/icons/home.png";
import Profile from "../resource/icons/Profile.png";
import search from "../resource/icons/search.png";
import redFrame from "../resource/icons/redFrame.png";
import redHome from "../resource/icons/redHome.png";
import redProfile from "../resource/icons/redProfile.png";
import redSearch from "../resource/icons/redSearch.png";

function FooterNavbar() {
  const [clickHome, setClickHome] = useState(true);
  const [clickSearch, setClickSearch] = useState(true);
  const [clickFrame, setClickFrame] = useState(true);
  const [clickProfile, setClickProfile] = useState(true);
  return (
    <div>
      <footer className="footer">
        <button
          className="home-footer"
          onClick={() => setClickHome(!clickHome)}
        >
          {clickHome ? (
            <img src={home} alt="homeimg" className="home-icon" />
          ) : (
            <img src={redHome} alt="homeimg" className="home-icon" />
          )}
        </button>
        <button
          className="search-footer"
          onClick={() => setClickSearch(!clickSearch)}
        >
          {clickSearch ? (
            <img src={search} alt="search" className="search-icon" />
          ) : (
            <img src={redSearch} alt="search" className="search-icon1" />
          )}
        </button>
        <button
          className="frame-footer"
          onClick={() => setClickFrame(!clickFrame)}
        >
          {clickFrame ? (
            <img src={frame} alt="frame" className="frame-icon" />
          ) : (
            <img src={redFrame} alt="frame" className="frame-icon" />
          )}
        </button>
        <button
          className="profile-footer"
          onClick={() => setClickProfile(!clickProfile)}
        >
          {clickProfile ? (
            <img src={Profile} alt="profile" className="profile-icon" />
          ) : (
            <img src={redProfile} alt="profile" className="profile-icon" />
          )}
        </button>
      </footer>
    </div>
  );
}

export default FooterNavbar;

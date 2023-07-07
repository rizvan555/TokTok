import React, { useState } from "react";
import Frame from "../resource/icons/NEWUpload-icon.svg";
import home from "../resource/icons/NEWHome-icon.svg";
import Profile from "../resource/icons/NEWProfile-icon.svg";
import Search from "../resource/icons/SEARCHIcon-NEW2.svg";
import redFrame from "../resource/icons/NEWUpload-red.svg";
import redHome from "../resource/icons/NEWHome-red.svg";
import redProfile from "../resource/icons/NEWProfile-red.svg";
import redSearch from "../resource/icons/NEWSearch-red.svg";
import { Link } from "react-router-dom";
import "../css/home.css";

function FooterNavbar({ darkLight, setDarkLight }) {
  const [activeNav, setActiveNav] = useState(null);

  const handleNavClick = (navId) => {
    setActiveNav(navId);
  };

  const navbar = [
    { id: 1, color1: home, color2: redHome, path: "/" },
    { id: 2, color1: Search, color2: redSearch, path: "/search" },
    { id: 3, color1: Frame, color2: redFrame, path: "/upload" },
    { id: 4, color1: Profile, color2: redProfile, path: "/profile" },
  ];

  const getNavIcon = (nav) => {
    if (activeNav === nav.id) {
      return <img src={nav.color2} alt="homeimg" className="nav-icon" />;
    } else {
      return <img src={nav.color1} alt="homeimg" className="nav-icon" />;
    }
  };

  return (
    <div>
      <footer className="footer-navbar">
        {navbar.map((nav) => (
          <div
            key={nav.id}
            className="home-footer"
            onClick={() => handleNavClick(nav.id)}
          >
            <Link to={nav.path}>{getNavIcon(nav)}</Link>
          </div>
        ))}
      </footer>
    </div>
  );
}

export default FooterNavbar;

import React, { useState } from "react";
import Frame from "../resource/icons/Frame.png";
import home from "../resource/icons/home.png";
import Profile from "../resource/icons/Profile.png";
import Search from "../resource/icons/Search.png";
import redFrame from "../resource/icons/redFrame.png";
import redHome from "../resource/icons/redHome.png";
import redProfile from "../resource/icons/redProfile.png";
import redSearch from "../resource/icons/redSearch.png";
import { Link } from "react-router-dom";

function FooterNavbar() {
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
          <button
            key={nav.id}
            className="home-footer"
            onClick={() => handleNavClick(nav.id)}
          >
            <Link to={nav.path}>{getNavIcon(nav)}</Link>
          </button>
        ))}
      </footer>
    </div>
  );
}

export default FooterNavbar;

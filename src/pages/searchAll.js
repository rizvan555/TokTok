import React, { useState } from "react";
import "../css/searchAll.css";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import UserIcon from "../resource/icons/NEWUser-red.svg";
import Profile from "../resource/icons/NEWProfile-icon.svg";
import Frame from "../resource/icons/NEWUpload-icon.svg";
import home from "../resource/icons/NEWHome-icon.svg";
import Search from "../resource/icons/SEARCHIcon-NEW2.svg";
import redFrame from "../resource/icons/NEWUpload-red.svg";
import redHome from "../resource/icons/NEWHome-red.svg";
import redProfile from "../resource/icons/NEWProfile-red.svg";
import redSearch from "../resource/icons/NEWSearch-red.svg";
import annyPhoto from "../resource/images/annyPhoto.png";
import sarahPhoto from "../resource/images/sarahPhoto.png";
import jonnyPhoto from "../resource/images/jonnyPhoto.png";
import followButton from "../resource/icons/NEWFollow-icon.svg";
import followingButton from "../resource/icons/NEWFollowing-icon.svg";

function SearchAll({ darkLight }) {
  const [activeNav, setActiveNav] = useState(null);
  const [value, setValue] = useState(null);
  const [users, setUsers] = useState([
    {
      profilImg: annyPhoto,
      name: "anny-wilson",
      position: "Marketing Coordinator",
      isFollowing: false,
    },
    {
      profilImg: sarahPhoto,
      name: "sarah_brisson",
      position: "Nursing Assistant",
      isFollowing: false,
    },
    {
      profilImg: jonnyPhoto,
      name: "andrew_nguyen",
      position: "Dog Trainer",
      isFollowing: false,
    },
    {
      profilImg: annyPhoto,
      name: "anny-wilson",
      position: "Marketing Coordinator",
      isFollowing: false,
    },
    {
      profilImg: sarahPhoto,
      name: "sarah_brisson",
      position: "Nursing Assistant",
      isFollowing: false,
    },
    {
      profilImg: jonnyPhoto,
      name: "andrew_nguyen",
      position: "Dog Trainer",
      isFollowing: false,
    },
    {
      profilImg: annyPhoto,
      name: "anny-wilson",
      position: "Marketing Coordinator",
      isFollowing: false,
    },
    {
      profilImg: sarahPhoto,
      name: "sarah_brisson",
      position: "Nursing Assistant",
      isFollowing: false,
    },
    {
      profilImg: jonnyPhoto,
      name: "andrew_nguyen",
      position: "Dog Trainer",
      isFollowing: false,
    },
  ]);

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

  const handleFollowClick = (index) => {
    setUsers((persons) =>
      persons.map((person, personIndex) =>
        personIndex === index
          ? {
            ...person,
            isFollowing: !person.isFollowing,
          }
          : person
      )
    );
  };

  const handleNavClick = (navId) => {
    setActiveNav(navId);
  };

  const findMembers = (memberName) => {
    if (memberName === "") {
      setUsers([
        {
          profilImg: annyPhoto,
          name: "anny-wilson",
          position: "Marketing Coordinator",
          isFollowing: false,
        },
        {
          profilImg: sarahPhoto,
          name: "sarah_brisson",
          position: "Nursing Assistant",
          isFollowing: false,
        },
        {
          profilImg: jonnyPhoto,
          name: "andrew_nguyen",
          position: "Dog Trainer",
          isFollowing: false,
        },
        {
          profilImg: annyPhoto,
          name: "anny-wilson",
          position: "Marketing Coordinator",
          isFollowing: false,
        },
        {
          profilImg: sarahPhoto,
          name: "sarah_brisson",
          position: "Nursing Assistant",
          isFollowing: false,
        },
        {
          profilImg: jonnyPhoto,
          name: "andrew_nguyen",
          position: "Dog Trainer",
          isFollowing: false,
        },
      ]);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(memberName.toLowerCase())
      );
      setUsers(filtered);
    }
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <div className="search-icon">
          <CiSearch size={25} />
        </div>
        <input
          type="text"
          className="input-box"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            findMembers(e.target.value);
          }}
          style={{ color: !darkLight ? "white" : "black" }}
        />
      </div>
      <Link to="/" className="center-icon">
        <img src={UserIcon} alt="profileimg" />
      </Link>

      <main className="search-person-container">
        <div className="scrollable">
          {users.map((person, index) => (
            <div key={index}>
              <section className="search-person-section">
                <div className="person-left-side">
                  <img
                    src={person.profilImg}
                    alt="photo1"
                    className="person-photo"
                  />
                  <div className="name-box">
                    <h3 className="name">{person.name}</h3>
                    <h5 className="position">{person.position}</h5>
                  </div>
                </div>
                <button
                  onClick={() => handleFollowClick(index)}
                  className="followButton"
                >
                  {person.isFollowing ? (
                    <img src={followingButton} alt="followingButton" />
                  ) : (
                    <img src={followButton} alt="followButton" />
                  )}
                </button>
              </section>
            </div>
          ))}
        </div>
      </main>

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

export default SearchAll;

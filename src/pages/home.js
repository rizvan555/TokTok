import React, { useState } from "react";
import "../css/home.css";
import "../css/likeButton.css";
import toktokLogo from "../resource/logos/toktokLogo.png";
import Heart from "../resource/images/Heart.png";
import redHeart from "../resource/images/redHeart.png";
import annyPhoto from "../resource/images/annyPhoto.png";
import albertPhoto from "../resource/images/albertPhoto.png";
import himePhoto from "../resource/images/himePhoto.png";
import image1 from "../resource/images/image1.png";
import image2 from "../resource/images/image2.png";
import image3 from "../resource/images/image3.png";
import FooterNavbar from "../components/FooterNavbar";
import LikeButton from "../components/LikeButton";
import CommentButton from "../components/CommentButton";
import { GoHeart } from "react-icons/go";
import CustomizedSwitches from "../components/CustomizedSwitches";
import { Link } from "react-router-dom";

function Home({ darkLight, setDarkLight }) {
  const [persons, setPersons] = useState([
    {
      profilImg: annyPhoto,
      name: "anny-wilson",
      position: "Marketing Coordinator",
      mainImg: image1,
      heartImg: Heart,
      redHeartImg: redHeart,
      likeCount: 44389,
      commentCount: 26376,
      isLiked: false,
    },
    {
      profilImg: himePhoto,
      name: "hime-tonuki",
      position: "Marketing Coordinator",
      mainImg: image2,
      heartImg: Heart,
      redHeartImg: redHeart,
      likeCount: 41381,
      commentCount: 19387,
      isLiked: false,
    },
    {
      profilImg: albertPhoto,
      name: "anny-wilson",
      position: "President of Sales",
      mainImg: image3,
      heartImg: Heart,
      redHeartImg: redHeart,
      likeCount: 55799,
      commentCount: 11336,
      isLiked: false,
    },
  ]);
  const [clickHeart, setClickHeart] = useState(true);

  return (
    <div className="home-container">
      <header className="header">
        <div className="left-box">
          <img src={toktokLogo} alt="logo" className="logo" />
          <h1 className="title">TokTok</h1>
        </div>
        <CustomizedSwitches darkLight={darkLight} setDarkLight={setDarkLight} />

        <button
          className="main-heart-button"
          onClick={() => setClickHeart(!clickHeart)}
        >
          {clickHeart ? (
            <GoHeart
              size={27}
              style={{ color: !darkLight ? "white" : "black" }}
            />
          ) : (
            <img src={redHeart} alt="redHeart" />
          )}
        </button>
      </header>

      <main className="home-main">
        <div className="scrollable">
          {persons.map((person, index) => (
            <div key={index} className="person-main-container">
              <section className="header-section">
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
                <Link to="/settingsPage" className="settings-container">
                  {darkLight ? (
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.0002 0.75C15.1082 0.75 19.2502 4.891 19.2502 10C19.2502 15.108 15.1082 19.25 10.0002 19.25C4.89121 19.25 0.750214 15.108 0.750214 10C0.750214 4.892 4.89221 0.75 10.0002 0.75Z"
                        stroke="#212121"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.9394 10.0129H13.9484"
                        stroke="#212121"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.93041 10.0129H9.93941"
                        stroke="#212121"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.9214 10.0129H5.9304"
                        stroke="#212121"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.0002 0.75C15.1082 0.75 19.2502 4.891 19.2502 10C19.2502 15.108 15.1082 19.25 10.0002 19.25C4.89121 19.25 0.750214 15.108 0.750214 10C0.750214 4.892 4.89221 0.75 10.0002 0.75Z"
                        stroke="#fff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.9394 10.0129H13.9484"
                        stroke="#fff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9.93041 10.0129H9.93941"
                        stroke="#fff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.9214 10.0129H5.9304"
                        stroke="#fff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                </Link>
              </section>
              <section className="main-section">
                <img src={person.mainImg} alt="image1" />
              </section>
              <section className="main-footer-section">
                <LikeButton
                  person={person}
                  setPersons={setPersons}
                  index={index}
                />
                <CommentButton
                  person={person}
                  darkLight={darkLight}
                  setDarkLight={setDarkLight}
                />
              </section>
            </div>
          ))}
        </div>
      </main>

      <FooterNavbar />
    </div>
  );
}

export default Home;

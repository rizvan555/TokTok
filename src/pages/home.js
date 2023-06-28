import React, { useState } from "react";
import "../css/home.css";
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

function Home() {
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

  return (
    <div>
      <header className="header">
        <div className="left-box">
          <img src={toktokLogo} alt="logo" className="logo" />
          <h1 className="title">TokTok</h1>
        </div>
        <button className="heart-button">
          <img src={Heart} alt="heart" className="heart-img" />
        </button>
      </header>

      <main>
        {persons.map((person, index) => (
          <div key={index}>
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
              <button className="settings-button">...</button>
            </section>
            <section className="main-section">
              <img src={person.mainImg} alt="image1" />
            </section>
            <section className="main-footer-section">
              <LikeButton
                person={person}
                persons={persons}
                setPersons={setPersons}
                index={index}
              />
              <CommentButton person={person} />
            </section>
          </div>
        ))}
      </main>
      <FooterNavbar />
    </div>
  );
}

export default Home;

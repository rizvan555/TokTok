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

function Home() {
  const [click, setClick] = useState(true);
  const [click1, setClick1] = useState(true);
  const [click2, setClick2] = useState(true);

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
        <section className="header-section">
          <div className="person-left-side">
            <img src={annyPhoto} alt="photo1" className="person-photo" />
            <div className="name-box">
              <h3 className="name">anny-wilson</h3>
              <h5 className="position">Marketing Coordinator</h5>
            </div>
          </div>
          <button className="settings-button">...</button>
        </section>
        <section className="main-section">
          <img src={image1} alt="image1" />
        </section>
        <section className="footer-section">
          <button className="like-section" onClick={() => setClick(!click)}>
            {click ? (
              <img src={Heart} alt="heart" />
            ) : (
              <img src={redHeart} alt="redHeart" />
            )}
            <p>44.389</p>
          </button>
          <div className="comment-section">
            <button className="settings-button">...</button>
            <p>26.376</p>
          </div>
        </section>
      </main>

      <main>
        <section className="header-section">
          <div className="person-left-side">
            <img src={himePhoto} alt="photo1" className="person-photo" />
            <div className="name-box">
              <h3 className="name">hime-tonuki</h3>
              <h5 className="position">Marketing Coordinator</h5>
            </div>
          </div>
          <button className="settings-button">...</button>
        </section>
        <section className="main-section">
          <img src={image2} alt="image1" />
        </section>
        <section className="footer-section">
          <button className="like-section" onClick={() => setClick1(!click1)}>
            {click1 ? (
              <img src={Heart} alt="heart" />
            ) : (
              <img src={redHeart} alt="redHeart" />
            )}
            <p>44.389</p>
          </button>
          <div className="comment-section">
            <button className="settings-button">...</button>
            <p>19.377</p>
          </div>
        </section>
      </main>

      <main>
        <section className="header-section">
          <div className="person-left-side">
            <img src={albertPhoto} alt="photo1" className="person-photo" />
            <div className="name-box">
              <h3 className="name">albert_hawkins</h3>
              <h5 className="position">President of Sales</h5>
            </div>
          </div>
          <button className="settings-button">...</button>
        </section>
        <section className="main-section">
          <img src={image3} alt="image3" />
        </section>
        <section className="footer-section">
          <button className="like-section" onClick={() => setClick2(!click2)}>
            {click2 ? (
              <img src={Heart} alt="heart" />
            ) : (
              <img src={redHeart} alt="redHeart" />
            )}
            <p>44.389</p>
          </button>
          <div className="comment-section">
            <button className="settings-button">...</button>
            <p>26.382</p>
          </div>
        </section>
      </main>
      <FooterNavbar />
    </div>
  );
}

export default Home;

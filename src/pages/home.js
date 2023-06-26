import React from "react";
import "../css/home.css";
import toktokLogo from "../resource/logos/toktokLogo.png";
import Heart from "../resource/images/Heart.png";
import annyPhoto from "../resource/images/annyPhoto.png";
import albertPhoto from "../resource/images/albertPhoto.png";
import himePhoto from "../resource/images/himePhoto.png";
import image1 from "../resource/images/image1.png";
import image2 from "../resource/images/image2.png";
import image3 from "../resource/images/image3.png";
import Frame from "../resource/icons/Frame.png";
import home from "../resource/icons/home.png";
import Profile from "../resource/icons/Profile.png";
import Search from "../resource/icons/Search.png";

function Home() {
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
          <div className="like-section">
            <img src={Heart} alt="heart" />
            <p>44.389</p>
          </div>
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
          <div className="like-section">
            <img src={Heart} alt="heart" />
            <p>25.389</p>
          </div>
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
          <div className="like-section">
            <img src={Heart} alt="heart" />
            <p>32.278</p>
          </div>
          <div className="comment-section">
            <button className="settings-button">...</button>
            <p>26.382</p>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="home-footer">
          <img src={home} alt="homeimg" className="homeImg" />
          <h5 className="footer-title">Home</h5>
        </div>
        <div className="search-footer">
          <img src={Search} alt="searchimg" className="searchImg" />
          <h5 className="footer-title">Search</h5>
        </div>
        <div className="frame-footer">
          <img src={Frame} alt="frameimg" className="frameImg" />
          <h5 className="footer-title">Upload</h5>
        </div>
        <div className="profile-footer">
          <img src={Profile} alt="profileimg" className="profilefImg" />
          <h5 className="footer-title">Profile</h5>
        </div>
      </footer>
    </div>
  );
}

export default Home;

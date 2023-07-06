import React, { useState, useEffect } from "react";
import "../css/home.css";
import "../css/likeButton.css";
import axios from "axios";
import commentButton1 from "../resource/images/commentButton1.svg";
import commentButton2 from "../resource/images/commentButton2.svg";
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

  const [user, setUser] = useState({});

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
    console.log(user);
    getUserProfile();
  }, []);

  const [posts, setPosts] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/:user/posts');
        setPosts(response.data);
        console.log(response);
      } catch (error) {
        console.error('Fehler beim Abrufen der Benutzerdaten', error);
      }
    };
    console.log(posts);
    fetchPosts();
  }, []);

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
            <img src={redHeart} alt="redHeart" width='27' height='27' />
          )}
        </button>
      </header>
      {/* <div>
        <img src={user.avatar} alt="" />
        <p>{posts[posts.length - 1]?.content}</p>
      </div> */}

      <main className="home-main">

        <div key={user._id} className="person-main-container">
          <section className="header-section">
            <div className="person-left-side">
              <img
                src={user.avatar}
                alt="photo1"
                className="person-photo"
              />
              <div className="name-box">
                <h3 className="name">{user.name}</h3>
                <h5 className="position">{user.activity}</h5>
              </div>
            </div>
            <Link to="/settingsPage" className="settings-container">
              {darkLight ? (
                <img src={commentButton1} alt="commentButton1" />
              ) : (
                <img src={commentButton2} alt="commentButton2" />
              )}
            </Link>
          </section>
        </div>

        <section className="main-section">
          <img src={posts[posts.length - 1]?.image} alt="image1" />
        </section>
        <section className="main-footer-section">
          <LikeButton
            person={posts}
            setPersons={setPosts}
            id={posts._id}
          />
          <CommentButton
            person={posts}
            darkLight={darkLight}
            setDarkLight={setDarkLight}
          />
        </section>






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
                    <img src={commentButton1} alt="commentButton1" />
                  ) : (
                    <img src={commentButton2} alt="commentButton2" />
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

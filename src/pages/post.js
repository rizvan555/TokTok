import "../css/post.css";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Profile from "../resource/images/Ellipseprofile_image_small.png";
import { FiSettings } from "react-icons/fi";
import { BsArrowLeft } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";
import newUserImage from '../resource/images/EllipseunknownUser.png';

const NewPost = ({ darkLight, setDarkLight }) => {


  const location = useLocation();
  console.log(location);

  const [post, setPost] = useState(
    {
      content: "",
      image: location.state?.imageURL,
      location: "Düsseldorf",
      facebook: false,
      twitter: false,
      tumblr: false
    },
  );

  useEffect(() => {
    axios
      .post("/api/newpost", post, { withCredentials: true })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const [user, setUser] = useState({})

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

  const handleClickFacebook = () => {
    setPost(prev => ({ ...prev, facebook: !prev.facebook }))
  };

  const handleClickTwitter = () => {
    // setPost({
    //   ...post,
    //   twitter: !post.twitter,
    // });
    setPost(prev => ({ ...prev, twitter: !prev.twitter }))
  };

  const handleClickTumblr = () => {
    setPost(prev => ({ ...prev, tumblr: !prev.tumblr }))
  };

  const textareaRef = useRef(null);

  const handleInputChange = async (e) => {
    e.preventDefault();
    setPost({ ...post, content: e.target.value });
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className="master" style={{ color: !darkLight ? "white" : "black" }}>
      <header>
        <section className="new_post_title">
          <Link to="/upload">
            <BsArrowLeft
              size={20}
              style={{ color: !darkLight ? "white" : "black" }}
            />
          </Link>
          <h2>New Post</h2>
        </section>
        <section className="new_post">
          {user.avatar ? (
            <img src={user.avatar} className='profile_image' alt="" />
          ) : (
            <img src={newUserImage} className='profile_image' alt="" />
          )}
          <textarea
            ref={textareaRef}
            name="text"
            id="post_text"
            placeholder="Write a caption..."
            value={post.content}
            onChange={handleInputChange}
          />
          <img src={post.image} alt="uploaded" className="post_pic" />
        </section>
      </header>
      <main>
        <hr />
        <div className="location">
          <Link to="">
            <SlLocationPin
              size={25}
              style={{ color: !darkLight ? "white" : "black" }}
            />
          </Link>
          <button className="location_button">Add Location</button>
          {/* <p>Add Location</p> */}
        </div>
        <hr />
        <section>
          <div className="post_to">
            <p>Also post to</p>
          </div>
          <div className="toggle">
            <label>
              Facebook
              <div>
                <input
                  type="checkbox"
                  checked={post.facebook}
                  onChange={handleClickFacebook}
                />
                <span className="slider"></span>
              </div>
            </label>
          </div>
          <div className="toggle">
            <label>
              Twitter
              <input
                type="checkbox"
                checked={post.twitter}
                onChange={handleClickTwitter}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="toggle">
            <label>
              Tumblr
              <input
                type="checkbox"
                checked={post.tumblr}
                onChange={handleClickTumblr}
              />
              <span className="slider"></span>
            </label>
          </div>
          <hr />
          <div className="location">
            <Link to="">
              <FiSettings
                size={25}
                style={{ color: !darkLight ? "white" : "black" }}
              />
            </Link>
            <p>Advanced Settings</p>

          </div>
        </section>
      </main>
    </div>
  );
};

export default NewPost;

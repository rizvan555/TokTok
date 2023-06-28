import "../css/post.css";
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Anny from "../resource/images/image1.png";
import Profile from "../resource/images/Ellipseprofile_image_small.png";
import { FiSettings } from "react-icons/fi";
import { BsArrowLeft } from "react-icons/bs";
import { SlLocationPin } from "react-icons/sl";

const NewPost = ({ darkLight, setDarkLight }) => {
  const [isCheckedFacebook, setIsCheckedFacebook] = useState(false);
  const [isCheckedTwitter, setIsCheckedTwitter] = useState(false);
  const [isCheckedTumblr, setIsCheckedTumblr] = useState(false);

  const [post, setPost] = useState([
    {
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ab quasi ullam eaque quos laudantium dicta blanditiis consectetur, praesentium itaque.",
    },
  ]);
  console.log(post.content);

  useEffect(() => {
    axios
      .post("/api/newpost", post)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const handleClickFacebook = () => {
    setIsCheckedFacebook(!isCheckedFacebook);
  };

  const handleClickTwitter = () => {
    setIsCheckedTwitter(!isCheckedTwitter);
  };

  const handleClickTumblr = () => {
    setIsCheckedTumblr(!isCheckedTumblr);
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
          <img src={Profile} alt="profile" className="profile_pic" />
          <textarea
            ref={textareaRef}
            name="text"
            id="post_text"
            placeholder="Write a caption..."
            value={post.content}
            onChange={handleInputChange}
          />
          <img src={Anny} alt="anny" className="post_pic" />
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
          <p>Add Location</p>
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
                  checked={isCheckedFacebook}
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
                checked={isCheckedTwitter}
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
                checked={isCheckedTumblr}
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

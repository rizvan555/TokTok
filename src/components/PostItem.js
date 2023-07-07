import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import redHeart from "../resource/images/redHeart.png";
import commentButton1 from "../resource/images/commentButton1.svg";
import commentButton2 from "../resource/images/commentButton2.svg";
import LikeButton from "../components/LikeButton";
import CommentButton from "../components/CommentButton";
import axios from "axios";
import "../css/home.css";
import "../css/likeButton.css";

const PostItem = ({
  avatar,
  username,
  activity,
  image,
  post,
  posts,
  postKey,
  heartImg,
  redHeartImg,
  likeCount,
  commentCount,
  isLiked,
  darkLight,
  setDarkLight,
  setreFetch
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(likeCount);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const toggleLike = async () => {

    try {

      await axios.put("/api/posts/updateLike", {
        postId: post._id,
      });
      setreFetch(prev => !prev)
    } catch (error) {
      const responseError = error?.response?.data?.error?.message;
      if (responseError) {
        setError(responseError);
      } else {
        setError("Something went wrong. Please try again later.");
      }
      console.error(error);
    }
  };
  
    const handleCommentClickDB = (id) => {
        const filteredPost = posts.find((post) => post._id === id);
        console.log("Posts:", posts);
        console.log("Filtered Post:", filteredPost);
        if (filteredPost) {
            navigate("/commentsPage", { state: { post: filteredPost } });
        } else {
            console.log("Post not found");
        }
    };
    console.log(posts);

    return (
        <div>
            <div className="person-main-container">
                <div className="post-container">
                    <div className="person-left-side">
                        <img src={avatar} alt="photo1" className="person-photo" />
                        <div className="name-box">
                            <h3 className="name">{username}</h3>
                            <h5 className="position">{activity}</h5>
                        </div>
                    </div>
                    <div className="post-header">
                        <h3 className="post-author">{username}</h3>
                    </div>
                    <img src={image} alt="user-avatar" className="user-avatar" />
                </div>
                <section className="main-footer-section">
                    <div className="like-section" onClick={toggleLike}>
                        {liked ? (
                            <img src={redHeart} alt="redHeart" />
                        ) : (
                            <GoHeart size={27} />
                        )}
                        <p>{likes}</p>
                    </div>

                    <CommentButton
                        postId={post._id}
                        post={post}
                        darkLight={darkLight}
                        handleCommentClickDB={handleCommentClickDB}
                    />
                </section>
            </div>
        </div>
    );


  return (
    <div>
      <div className="person-main-container">
        <div className="post-container">
          <div className="post-header">
            <div className="person-left-side">
              <img src={avatar} alt="photo1" className="person-photo" />
              <div className="name-box">
                <h3 className="name">{username}</h3>
                <h5 className="position">{activity}</h5>
              </div>
            </div>
            <Link to="/settingsPage" className="settings-container">
              {darkLight ? (
                <img src={commentButton1} alt="commentButton1" />
              ) : (
                <img src={commentButton2} alt="commentButton2" />
              )}
            </Link>
          </div>
          <div className="post-header">
            <img src={image} alt="post-image" className="post-image" />
          </div>
          <section className="main-footer-section">

            <div className="like-section" onClick={toggleLike}>
              {post.likes.length > 0 ? (
                <img src={redHeart} alt="redHeart" />
              ) : (
                <GoHeart size={27} />
              )}
              <p>{post.likes.length}</p>
            </div>

            <div>
              <CommentButton
                postId={post._id}
                post={post}
                darkLight={darkLight}
                handleCommentClickDB={handleCommentClickDB}
              />
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};

export default PostItem;

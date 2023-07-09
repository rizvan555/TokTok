import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { GoHeart } from "react-icons/go";
import redHeart from "../resource/images/redHeart.png";
import commentButton1 from "../resource/images/commentButton1.svg";
import commentButton2 from "../resource/images/commentButton2.svg";
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
  toggleLike,
  setreFetch,
}) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get("/api/comments");
        setComments(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, []);

  // const toggleLike = async () => {
  //   try {
  //     await axios.put("/api/posts/updateLike", {
  //       postId: post._id,
  //     });
  //     setreFetch((prev) => !prev);
  //   } catch (error) {
  //     const responseError = error?.response?.data?.error?.message;
  //     if (responseError) {
  //       setError(responseError);
  //     } else {
  //       setError("Something went wrong. Please try again later.");
  //     }
  //     console.error(error);
  //   }
  // };

  const handleCommentClickDB = (id) => {
    const filteredPost = posts.find((post) => post._id === id);
    if (filteredPost) {
      navigate("/commentsPage", { state: { post: filteredPost } });
    } else {
      console.log("Post not found");
    }
  };

  const handleLikeClick = async () => {
    try {
      const updatedLikes = liked ? likes - 1 : likes + 1;
      const response = await axios.put("/api/posts/updateLike", {
        postId: post._id,
        liked: !liked,
        likes: updatedLikes,
      });
      if (response.status === 200) {
        setLiked(!liked);
        setLikes(updatedLikes);
      } else {
        console.error("Something went wrong. Please try again later.");
      }
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
            <div className="like-section" onClick={handleLikeClick}>
              {liked ? (
                <img src={redHeart} alt="redHeart" />
              ) : (
                <GoHeart size={27} />
              )}
              <p>{likes}</p>
            </div>

            {post && (
              <CommentButton
                allComments={comments}
                postId={post._id}
                post={post}
                darkLight={darkLight}
                handleCommentClickDB={handleCommentClickDB}
              />
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default PostItem;

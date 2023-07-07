import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/homeComments.css";
import CommentButton from "../components/CommentButton";
import LikeButton from "../components/LikeButton";
import { BsArrowLeft } from "react-icons/bs";
import { BsSend } from "react-icons/bs";
import commentButton1 from "../resource/images/commentButton1.svg";
import commentButton2 from "../resource/images/commentButton2.svg";
import redHeart from "../resource/images/redHeart.png";

import axios from "axios";
import { GoHeart } from "react-icons/go";

function CommentsPage({ darkLight }) {
  const [users, setUsers] = useState({});
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("state", state);
  const post = state?.post;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/user");
        setUsers(response.data);
        console.log("Hallo", response.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Benutzerdaten", error);
      }
    };

    // =========== FETCH COMMENTS ===========

    const fetchComments = async () => {
      try {
        const response = await axios.get("/api/comments");
        setComments(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
    fetchComments();
    fetchPosts();
  }, []);

  const toggleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  const toggleCommentLike = (commentIndex) => {
    setCommentList((commentList) =>
      commentList.map((comment, index) =>
        index === commentIndex
          ? {
              ...comment,
              likeCount: comment.likeCount + (comment.isLiked ? -1 : 1),
              isLiked: !comment.isLiked,
            }
          : comment
      )
    );
  };

  const createComment = async (postId, userId, content) => {
    try {
      const response = await axios.put(`/api/comments/${postId}`, {
        userId,
        content,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const clickPostButton = () => {
    if (inputValue.trim() !== "") {
      const newComment = { content: inputValue, likeCount: 0 };
      setCommentList((prevComments) => [...prevComments, newComment]);
      setInputValue("");

      const postId = post?.id;
      const userId = users[0]?.id;
      createComment(postId, userId, inputValue);
    }
  };

  const footersButtonContainerClass =
    commentList.length > 0
      ? "footers-button-container active"
      : "footers-button-container";

  return (
    <div className="commentPage-container">
      <header className="commentPage-header">
        <div className="commentsHeader-left">
          <Link to="/">
            <BsArrowLeft
              size={25}
              style={{ color: !darkLight ? "white" : "black" }}
              className="left-button-icon"
            />
          </Link>
          <h2>Comments</h2>
        </div>
        <button className="send-button">
          <BsSend size={20} style={{ color: !darkLight ? "white" : "black" }} />
        </button>
      </header>
      <section className="person-section-container">
        <div className="person-section-container_child">
          <div className="comment-user-header">
            <div className="comment-user-header_left">
              <img
                src={post?.user?.avatar}
                alt="image"
                className="user-photo"
              />
              <div className="user-title">
                <h2>{post?.user?.name}</h2>
                <p>{post?.user?.activity}</p>
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
          <p>{post?.content}</p>
          <div className={footersButtonContainerClass}>
            <div className="footersButtonContainerClass_1">
              <div className="like-section" onClick={toggleLike}>
                {liked ? (
                  <img src={redHeart} alt="redHeart" />
                ) : (
                  <GoHeart size={27} />
                )}
                <p>{likes}</p>
              </div>
              <CommentButton person={posts} darkLight={darkLight} />
            </div>
          </div>
        </div>

        <div className="comment-list-container">
          {commentList.map((comment, index) => (
            <div key={index} className="comment">
              <div className="comment-header-box">
                <div className="comment-left-box">
                  <img src={users.avatar} alt="image" className="user-photo1" />
                  <div className="user-title">
                    <h3>{users.name}</h3>
                    <p className="user-activity">{post?.user?.activity}</p>
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
              {comment.content}
              <div className="comment-down-box">
                <div
                  className="like-section"
                  onClick={() => toggleCommentLike(index)}
                >
                  {comment.isLiked ? (
                    <img src={redHeart} alt="redHeart" />
                  ) : (
                    <GoHeart size={27} />
                  )}
                  <p>{comment.likeCount}</p>
                </div>
                <p>Reply</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="feedback-write-section">
        <img src={users.avatar} alt="userImage" className="person-photo" />
        <input
          type="text"
          placeholder="Your comment"
          className="feedback-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={clickPostButton}
          className="post-button"
          style={{ color: darkLight ? "red" : "white" }}
        >
          Post
        </button>
      </section>
    </div>
  );
}
export default CommentsPage;

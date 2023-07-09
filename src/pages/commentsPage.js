import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/homeComments.css";
import { BsArrowLeft } from "react-icons/bs";
import { BsSend } from "react-icons/bs";
import commentButton1 from "../resource/images/commentButton1.svg";
import commentButton2 from "../resource/images/commentButton2.svg";
import commentButton3 from "../resource/images/commentButton3.svg";
import commentButton4 from "../resource/images/commentButton4.svg";
import redHeart from "../resource/images/redHeart.png";
import axios from "axios";
import { GoHeart } from "react-icons/go";

function CommentsPage({ darkLight }) {
  const [users, setUsers] = useState({});
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const post = state?.post || null;
  const postContentCounts = {};

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/user");
        setUsers(response.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Benutzerdaten", error);
      }
    };

    // =========== FETCH COMMENTS ===========

    const fetchComments = async () => {
      try {
        const response = await axios.get("/api/comments");
        setComments(response.data);
        console.log(response.data);
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
    fetchPosts();
    fetchComments();
  }, []);

  const toggleLike = (commentId) => {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment._id === commentId) {
          const updatedComment = { ...comment };
          updatedComment.isLiked = !updatedComment.isLiked;
          updatedComment.likeCount = updatedComment.isLiked
            ? updatedComment.likeCount + 1
            : updatedComment.likeCount - 1;
          return updatedComment;
        }
        return comment;
      });
    });
  };

  const toggleLike1 = async () => {
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

  const fetchComments = async () => {
    try {
      const response = await axios.get("/api/comments");
      setComments(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const clickPostButton = () => {
    if (inputValue.trim() !== "") {
      const newComment = { content: inputValue, likeCount: 0 };
      setComments((prevComments) => [...prevComments, newComment]);
      setInputValue("");
      const postId = post?._id;
      const userId = users?.id;
      createComment(postId, userId, inputValue);
      fetchComments();
    }
  };

  const filteredComments = comments.filter(
    (comment) => comment.post === post?._id
  );

  comments.forEach((comment) => {
    const postNum = comment.post;
    if (!postContentCounts[postNum]) {
      postContentCounts[postNum] = 0;
    }
    postContentCounts[postNum]++;
  });
  const commentCount = postContentCounts[post?._id] || 0;

  const footersButtonContainerClass =
    comments.length > 0
      ? "footers-button-container active"
      : "footers-button-container";

  return (
    <div className="scrollable">
      <div className="commentPage-container">
        <header
          className="commentPage-header"
          style={{ backgroundColor: darkLight ? "white" : "black" }}
        >
          <div className="commentsHeader-left">
            <Link to="/home">
              <BsArrowLeft
                size={25}
                style={{ color: !darkLight ? "white" : "black" }}
                className="left-button-icon"
              />
            </Link>
            <h2>Comments</h2>
          </div>
          <button className="send-button">
            <BsSend
              size={20}
              style={{ color: !darkLight ? "white" : "black" }}
            />
          </button>
        </header>
        <section className="person-section-container">
          <div
            className="person-section-container_child"
            style={{ backgroundColor: darkLight ? "white" : "black" }}
          >
            <div className="comment-user-header">
              <div className="comment-user-header_left">
                <img
                  src={post?.user?.avatar}
                  alt="image"
                  className="user-photo"
                  style={{
                    border: !darkLight
                      ? "1px solid #eeeeee"
                      : "1px solid #fafafa",
                  }}
                />
                <div className="user-title">
                  <h3>{post?.user?.name}</h3>
                  <p className="user-title-activity">{post?.user?.activity}</p>
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
                <div className="like-section" onClick={toggleLike1}>
                  {liked ? (
                    <img src={redHeart} alt="redHeart" />
                  ) : (
                    <GoHeart size={27} />
                  )}
                  <p>{likes}</p>
                </div>
                <div className="comment-button-section">
                  {darkLight ? (
                    <img src={commentButton3} alt="commentButton3" />
                  ) : (
                    <img src={commentButton4} alt="commentButton4" />
                  )}
                  <p>{commentCount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="comment-list-container">
            {filteredComments.map((comment, index) => {
              return (
                <div key={index} className="comment">
                  <div className="comment-header-box">
                    <div className="comment-left-box">
                      <img
                        src={users.avatar}
                        alt="image"
                        className="user-photo1"
                        style={{
                          border: !darkLight
                            ? "1px solid #eeeeee"
                            : "1px solid #fafafa",
                        }}
                      />
                      <div className="user-title">
                        <h3 className="user-title-name">{users.name}</h3>
                        <p className="user-title-activity">{users.activity}</p>
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
                      onClick={() => toggleLike(comment._id)}
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
              );
            })}
          </div>
        </section>

        <section
          className="feedback-write-section"
          style={{ backgroundColor: darkLight ? "white" : "black" }}
        >
          <img
            src={users.avatar}
            alt="userImage"
            className="person-photo"
            style={{
              border: !darkLight ? "1px solid #eeeeee" : "1px solid #fafafa",
            }}
          />
          <input
            type="text"
            placeholder="Your comment"
            className="feedback-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ backgroundColor: !darkLight ? "#eeeeee" : "#fafafa" }}
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
    </div>
  );
}
export default CommentsPage;

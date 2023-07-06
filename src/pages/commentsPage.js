import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/homeComments.css";
import CommentButton from "../components/CommentButton";
import LikeButton from "../components/LikeButton";
import jonnyPhoto from "../resource/images/jonnyPhoto.png";
import { BsArrowLeft } from "react-icons/bs";
import { BsSend } from "react-icons/bs";
import commentButton1 from "../resource/images/commentButton1.svg";
import commentButton2 from "../resource/images/commentButton2.svg";
import axios from "axios";
function CommentsPage({ darkLight }) {
  const [users, setUsers] = useState({});
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { state } = useLocation();
  console.log("state", state);
  const post = state?.post;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/user");
        setUsers([response.data]);
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

  const toggleLike = (posts, feedbackIndex) => {
    setPosts((p) =>
      posts.map((person, index) =>
        p === person
          ? {
              ...p,
              feedbacks: p.feedbacks.map((f) =>
                f === feedbackIndex
                  ? {
                      ...f,
                      likeCount: f.likeCount + (f.isLiked ? -1 : 1),
                      isLiked: !f.isLiked,
                    }
                  : f
              ),
            }
          : p
      )
    );
  };

  const toggleLike2 = (_id) => {
    setComments((comments) =>
      comments.map((comment, personIndex) =>
        personIndex === _id
          ? {
              ...comment,
              likeCount: comment.likeCount + (comment.isLiked ? -1 : 1),
              isLiked: !comment.isLiked,
            }
          : comment
      )
    );
  };

  const addFeedback = (personIndex) => {
    if (inputValue) {
      setPosts((persons) =>
        persons.map((person, index) =>
          index === personIndex
            ? {
                ...person,
                feedbacks: [
                  ...(person.feedbacks ? person.feedbacks : []),
                  {
                    img: jonnyPhoto,
                    name: "andrew_nguyen",
                    position: "Dog Trainer",
                    feedback: inputValue,
                    likeCount: 0,
                    isLiked: false,
                  },
                ],
                commentCount: person.commentCount + 1,
              }
            : person
        )
      );
    }
  };

  const clickPostButton = (personIndex) => {
    setInputValue("");
    addFeedback(personIndex);
  };

  // =========== ADD A NEW COMMENT  ===========

  // const createComment = async (postId, userId, content) => {
  //   try {
  //     const response = await axios.put(`/api/comments/${postId}`, {
  //       userId,
  //       content,
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const clickPostButton = (postId) => {
  //   const userId = user[0]._id;
  //   createComment(postId, userId, inputValue);
  //   setInputValue("");
  //   navigate("/commentspage");
  // };
  console.log(post);

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
        <div className="comment-user-header">
          <div className="comment-user-header_left">
            <img src={post?.user?.avatar} alt="image" className="user-photo" />
            <div className="user-title">
              <h3>{post?.user?.name}</h3>
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
        <div className="footers-button-container">
          <LikeButton person={posts} setPersons={setPosts} id={posts._id} />
          <CommentButton person={posts} darkLight={darkLight} />
        </div>
      </section>
      <section className="feedback-write-section">
        <img src={post?.image} alt="photoalbert" className="person-photo" />
        <input
          type="text"
          placeholder="Your comment"
          className="feedback-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          // onClick={() => clickPostButton(personIndex)}
          className="post-button"
          style={{ color: darkLight ? "red" : "white" }}
        >
          Post
        </button>
      </section>

      {posts.map((post, personIndex) => (
        <div key={personIndex}>
          {/* <section className="person-section-container">
            <div className="comment-user-header">
              <div className="comment-user-header_left">
                <img src={post.image} alt="image" className="user-photo" />
                <div className="user-title">
                  <h3>{post?.user?.name}</h3>
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
            <p>{post.content}</p>
            <div className="footers-button-container">
              <LikeButton person={posts} setPersons={setPosts} id={posts._id} />
              <CommentButton person={posts} darkLight={darkLight} />
            </div>
          </section> */}
        </div>
      ))}
    </div>
  );
}
export default CommentsPage;

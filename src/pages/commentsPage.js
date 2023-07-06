import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "../css/homeComments.css";
import CommentButton from "../components/CommentButton";
import Heart from "../resource/images/Heart.png";
import redHeart from "../resource/images/redHeart.png";
import LikeButton from "../components/LikeButton";
import annyPhoto from "../resource/images/annyPhoto.png";
import sarahPhoto from "../resource/images/sarahPhoto.png";
import jonnyPhoto from "../resource/images/jonnyPhoto.png";
import { BsArrowLeft } from "react-icons/bs";
import { BsSend } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { GoHeart } from "react-icons/go";
import commentButton1 from "../resource/images/commentButton1.svg";
import commentButton2 from "../resource/images/commentButton2.svg";
import axios from "axios";
function CommentsPage({ darkLight }) {
  const [users, setUsers] = useState({});
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { state } = useLocation();
  const person = state?.person;
  const myPerson = state?.posts;

  const [persons, setPersons] = useState([
    {
      avatar: annyPhoto,
      username: "anny-wilson",
      activity: "Marketing Coordinator",
      heartImg: Heart,
      redHeartImg: redHeart,
      content:
        "lorem ipsum dolor sit amet, consectetur,lorem ipsum dolor.lorem ipsum dolor,lorem ipsum dolor.lorem ipsum dolor sit amet, consectetur,lorem ipsum dolor.lorem ipsum dolor,lorem ipsum dolor",
      tags: "#girl #girls #babygirl #girlpower #girlswholift #polishgirl #girlboss #girly #girlfriend #fitgirl #birthdaygirl #instagirl #girlsnight #animegirl #mygirl",
      feedbacks: [
        {
          img: sarahPhoto,
          name: "sarah-brisson",
          position: "Nursing Assistant",
          feedback:
            "lorem ipsum dolor sit amet, consectetur. Lorem ipsum dolor sit amet, consectetur",
          likeCount: 576,
        },
      ],
      likeCount: 44389,
      commentCount: 26376,
      isLiked: false,
    },
  ]);

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

  const toggleLike = (person, feedbackIndex) => {
    setPersons((p) =>
      persons.map((person, index) =>
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
      setPersons((persons) =>
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

      {/* ________________________________________________________________ */}
      <section className="person-main-header-section">
        <div className="person-left-side">
          <img src={person.avatar} alt="photo1" className="person-photo" />
          <div className="name-box">
            <h3 className="name">{person.username}</h3>
            <h5 className="position">{person.activity}</h5>
          </div>
        </div>
        <Link to="/settingsPage" className="comment-button-section">
          {darkLight ? (
            <img src={commentButton1} alt="commentButton1" />
          ) : (
            <img src={commentButton2} alt="commentButton2" />
          )}
        </Link>
      </section>
      <section className="comment-section">
        <p className="comment-box">{person.content}</p>
        <p className="tag-box">{person.tags}</p>
      </section>
      <section className="footer-section">
        <LikeButton
          person={person}
          persons={persons}
          setPersons={setPersons}
          // index={personIndex}
        />
        <CommentButton person={person} darkLight={darkLight} />
      </section>

      {/* ________________________________________________________________ */}

      {persons.map((person, personIndex) => (
        <div key={personIndex}>
          <main>
            <section className="feedbacks-section">
              {person.feedbacks.map((feedback, feedbackIndex) => (
                <div key={feedbackIndex} className="feedback-section">
                  <div className="person-box">
                    <div className="person-box-left">
                      <img
                        src={feedback.img}
                        alt="img"
                        className="person-photo"
                      />
                      <div className="name-box">
                        <p className="feedback-name">{feedback.name}</p>
                        <p className="feedback-position">{feedback.position}</p>
                      </div>
                    </div>
                    <Link to="/settingsPage" className="comment-button-section">
                      {darkLight ? (
                        <img src={commentButton1} alt="commentButton1" />
                      ) : (
                        <img src={commentButton2} alt="commentButton2" />
                      )}
                    </Link>
                  </div>
                  <p className="feedback-box">{feedback.feedback}</p>
                  <div className="feedback-footer">
                    <div
                      className="like-section"
                      onClick={() => toggleLike(personIndex, feedbackIndex)}
                    >
                      {feedback.isLiked ? (
                        <img src={person.redHeartImg} alt="redHeart" />
                      ) : (
                        <AiOutlineHeart size={30} />
                      )}
                      <p>{feedback.likeCount}</p>
                    </div>
                    <div
                      className="reply-button"
                      style={{ color: !darkLight ? "white" : "black" }}
                    >
                      Reply
                    </div>
                  </div>
                </div>
              ))}

              <section className="comment-section2">
                {comments.map((comment, _id) => (
                  <div className="comment-box2" key={comment._id}>
                    <div className="container_comment-box2">
                      <div className="comment-box-left2">
                        <img
                          src={person.avatar}
                          alt="avatar"
                          className="person-photo"
                        />
                        <div className="name-box">
                          <p className="feedback-name">{person.username}</p>
                          <p className="person-position">{person.activity}</p>
                        </div>
                      </div>
                      <Link
                        to="/settingsPage"
                        className="comment-button-section"
                      >
                        {darkLight ? (
                          <img src={commentButton1} alt="commentButton1" />
                        ) : (
                          <img src={commentButton2} alt="commentButton2" />
                        )}
                      </Link>
                    </div>
                    <p className="comment-box2">{comment.content}</p>
                    <div className="like-section">
                      <div onClick={() => toggleLike2(_id)}>
                        {comment.isLiked ? (
                          <img src={person.redHeartImg} alt="redHeart" />
                        ) : (
                          <GoHeart size={27} />
                        )}
                      </div>
                      <div className="like-container">
                        <div>
                          <p className="likecount">{comment.likeCount}</p>
                        </div>
                        <div
                          className="reply-button"
                          style={{ color: !darkLight ? "white" : "black" }}
                        >
                          Reply
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </section>

            <section className="feedback-write-section">
              <img
                src={jonnyPhoto}
                alt="photoalbert"
                className="person-photo"
              />
              <input
                type="text"
                placeholder="Your comment"
                className="feedback-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                onClick={() => clickPostButton(personIndex)}
                className="post-button"
                style={{ color: darkLight ? "red" : "white" }}
              >
                Post
              </button>
            </section>
          </main>
        </div>
      ))}
    </div>
  );
}
export default CommentsPage;

import React, { useState } from "react";
import { Link } from "react-router-dom";
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

function CommentsPage({ darkLight }) {
  const [persons, setPersons] = useState([
    {
      profilImg: annyPhoto,
      name: "anny-wilson",
      position: "Marketing Coordinator",
      heartImg: Heart,
      redHeartImg: redHeart,
      comment:
        "lorem ipsum dolor sit amet, consectetur,lorem ipsum dolor.lorem ipsum dolor,lorem ipsum dolor.lorem ipsum dolor sit amet, consectetur,lorem ipsum dolor.lorem ipsum dolor,lorem ipsum dolor",
      tags: "#girl #girls #babygirl #girlpower #girlswholift #polishgirl #girlboss #girly #girlfriend #fitgirl #birthdaygirl #instagirl #girlsnight #animegirl #mygirl",
      feedbacks: [
        {
          img: sarahPhoto,
          name: "sarah_brisson",
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
  const [inputValue, setInputValue] = useState(null);

  const toggleLike = (personIndex, feedbackIndex) => {
    setPersons((persons) =>
      persons.map((person, index) =>
        index === personIndex
          ? {
              ...person,
              feedbacks: person.feedbacks.map((feedback, i) =>
                i === feedbackIndex
                  ? {
                      ...feedback,
                      likeCount:
                        feedback.likeCount + (feedback.isLiked ? -1 : 1),
                      isLiked: !feedback.isLiked,
                    }
                  : feedback
              ),
            }
          : person
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
                feedbacks: person.feedbacks ? [...person.feedbacks] : [],
                feedbacks: [
                  ...person.feedbacks,
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
      {persons.map((person, personIndex) => (
        <div key={personIndex}>
          <main>
            {persons.map((person, index) => (
              <div key={index}>
                <section className="person-main-header-section">
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
                  <Link to="/settingsPage" className="comment-button-section">
                    <button className="settings-button">...</button>
                  </Link>
                </section>

                <section className="comment-section">
                  <p className="comment-box">{person.comment}</p>
                  <p className="tag-box">{person.tags}</p>
                </section>

                <section className="footer-section">
                  <LikeButton
                    person={person}
                    persons={persons}
                    setPersons={setPersons}
                    index={index}
                  />
                  <CommentButton person={person} />
                </section>
              </div>
            ))}
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
                      <button className="settings-button">...</button>
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

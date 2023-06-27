import React, { useState } from "react";
import Heart from "../resource/images/Heart.png";
import redHeart from "../resource/images/redHeart.png";
import LikeButton from "../components/LikeButton";
import annyPhoto from "../resource/images/annyPhoto.png";
import albertPhoto from "../resource/images/albertPhoto.png";
import himePhoto from "../resource/images/himePhoto.png";
import CommentButton from "../components/CommentButton";
import "../css/homeComments.css";

function CommentsPage() {
  const [persons, setPersons] = useState([
    {
      profilImg: annyPhoto,
      name: "anny-wilson",
      position: "Marketing Coordinator",
      heartImg: Heart,
      redHeartImg: redHeart,
      comment:
        "lorem ipsum dolor sit amet, consectetur,lorem ipsum dolor.lorem ipsum dolor,lorem ipsum dolor",
      likeCount: 44389,
      commentCount: 26376,
      isLiked: false,
    },
    {
      profilImg: himePhoto,
      name: "hime-tonuki",
      position: "Marketing Coordinator",
      heartImg: Heart,
      redHeartImg: redHeart,
      comment:
        "lorem ipsum dolor sit amet, consectetur,lorem ipsum dolor.lorem ipsum dolor,lorem ipsum dolor",

      likeCount: 41381,
      commentCount: 19387,
      isLiked: false,
    },
    {
      profilImg: albertPhoto,
      name: "anny-wilson",
      position: "President of Sales",
      heartImg: Heart,
      redHeartImg: redHeart,
      comment:
        "lorem ipsum dolor sit amet, consectetur,lorem ipsum dolor.lorem ipsum dolor,lorem ipsum dolor",

      likeCount: 55799,
      commentCount: 11336,
      isLiked: false,
    },
  ]);
  return (
    <div>
      {persons.map((person, index) => (
        <div key={index}>
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
            <button className="settings-button">...</button>
          </section>
          <main>
            {persons.map((person, index) => (
              <div key={index}>
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
                  <button className="settings-button">...</button>
                </section>
                <section className="comment-section">
                  <p>{person.comment}</p>
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
          </main>
        </div>
      ))}
    </div>
  );
}

export default CommentsPage;

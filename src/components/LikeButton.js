import React, { useState } from "react";
import { GoHeart } from "react-icons/go";

function LikeButton({ person, index, setPersons }) {
  const toggleLike = (index) => {
    setPersons((persons) =>
      persons.map((person, personIndex) =>
        personIndex === index
          ? {
              ...person,
              likeCount: person.likeCount + (person.isLiked ? -1 : 1),
              isLiked: !person.isLiked,
            }
          : person
      )
    );
  };

  return (
    <div>
      <div className="like-section" onClick={() => toggleLike(index)}>
        {person.isLiked ? (
          <img src={person.redHeartImg} alt="redHeart" />
        ) : (
          <GoHeart size={27} />
        )}
        <p>{person.likeCount}</p>
      </div>
    </div>
  );
}

export default LikeButton;

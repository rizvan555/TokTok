import React from "react";

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
      <button className="like-section" onClick={() => toggleLike(index)}>
        {person.isLiked ? (
          <img src={person.redHeartImg} alt="redHeart" />
        ) : (
          <img src={person.heartImg} alt="heart" />
        )}
        <p>{person.likeCount}</p>
      </button>
    </div>
  );
}

export default LikeButton;

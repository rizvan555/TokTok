import React from "react";
import "../css/commentButton.css";
import commentButton3 from "../resource/images/commentButton3.svg";
import commentButton4 from "../resource/images/commentButton4.svg";
import { Link } from "react-router-dom";

function CommentButton({ person, darkLight, onClick }) {
  return (
    <div>
      <div className="comment-button-section">
        <Link
          to={`/commentsPage/${person.username}`}
          className="commentButtonLink"
          onClick={() => onClick(person.username)}
        >
          {darkLight ? (
            <img src={commentButton3} alt="commentButton3" />
          ) : (
            <img src={commentButton4} alt="commentButton4" />
          )}
        </Link>
        <p>{person.commentCount}</p>
      </div>
    </div>
  );
}

export default CommentButton;

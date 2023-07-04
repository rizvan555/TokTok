import React from "react";
import { Link } from "react-router-dom";
import "../css/commentButton.css";
import commentButton3 from "../resource/images/commentButton3.svg";
import commentButton4 from "../resource/images/commentButton4.svg";

function CommentButton({ person, darkLight }) {
  return (
    <div>
      <div className="comment-button-section">
        <Link to="/commentsPage" className="commentButtonLink">
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

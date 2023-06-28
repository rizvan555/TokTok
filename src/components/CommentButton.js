import React from "react";
import { Link } from "react-router-dom";
import "../css/commentButton.css";

function CommentButton({ person }) {
  return (
    <div>
      <div className="comment-button-section">
        <Link to="/commentsPage" className="commentButtonLink">
          <button className="settings-button">...</button>
        </Link>
        <p>{person.commentCount}</p>
      </div>
    </div>
  );
}

export default CommentButton;

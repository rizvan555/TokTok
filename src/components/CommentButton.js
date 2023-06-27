import React from "react";
import { Link } from "react-router-dom";
import "../css/homeComments.css";

function CommentButton({ person }) {
  return (
    <div>
      <div className="comment-section">
        <Link to="/commentsPage" className="commentButtonLink">
          <button className="settings-button">...</button>
        </Link>
        <p>{person.commentCount}</p>
      </div>
    </div>
  );
}

export default CommentButton;

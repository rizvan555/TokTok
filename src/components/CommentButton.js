import React from "react";
import "../css/commentButton.css";
import commentButton3 from "../resource/images/commentButton3.svg";
import commentButton4 from "../resource/images/commentButton4.svg";

function CommentButton({ handleCommentClickDB, post, darkLight }) {
  return (
    <div>
      <div className="comment-button-section">
        <div
          className="commentButtonLink"
          onClick={() => handleCommentClickDB(post._id)}
        >
          {darkLight ? (
            <img src={commentButton3} alt="commentButton3" />
          ) : (
            <img src={commentButton4} alt="commentButton4" />
          )}
        </div>
        <p>{post?.commentCount}</p>
      </div>
    </div>
  );
}

export default CommentButton;

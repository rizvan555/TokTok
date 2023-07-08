import React from "react";
import "../css/commentButton.css";
import commentButton3 from "../resource/images/commentButton3.svg";
import commentButton4 from "../resource/images/commentButton4.svg";

function CommentButton({
  handleCommentClickDB,
  post,
  darkLight,
  postId,
  comments,
  allComments,
}) {
  console.log(allComments);

  const postContentCounts = {};
  allComments.forEach((comment) => {
    const postNum = comment.post;
    if (!postContentCounts[postNum]) {
      postContentCounts[postNum] = 0;
    }
    postContentCounts[postNum]++;
  });

  const commentCount = postContentCounts[postId] || 0;

  return (
    <div>
      <div className="comment-button-section">
        <div
          className="commentButtonLink"
          onClick={() => {
            handleCommentClickDB(postId);
          }}
        >
          {darkLight ? (
            <img src={commentButton3} alt="commentButton3" />
          ) : (
            <img src={commentButton4} alt="commentButton4" />
          )}
        </div>
        <p>{commentCount}</p>
      </div>
    </div>
  );
}

export default CommentButton;

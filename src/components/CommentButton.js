import React from "react";
import { Link } from "react-router-dom";
import "../css/commentButton.css";

function CommentButton({ person, darkLight, setDarkLight }) {
  return (
    <div>
      <div className="comment-button-section">
        <Link to="/commentsPage" className="commentButtonLink">
          {darkLight ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.2499 21.2482C17.6844 24.8141 12.4047 25.5845 8.08413 23.5864C7.4463 23.3296 6.92338 23.122 6.42625 23.122C5.04155 23.1302 3.31801 24.4729 2.42223 23.5782C1.52646 22.6823 2.87012 20.9574 2.87012 19.5643C2.87012 19.0672 2.6708 18.5536 2.41403 17.9145C0.414949 13.5946 1.18644 8.31318 4.75195 4.74845C9.30351 0.195211 16.6983 0.195212 21.2499 4.74728C25.8097 9.30755 25.8015 16.6961 21.2499 21.2482Z"
                stroke="#212121"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.596 13.4819H17.6065"
                stroke="#212121"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.9188 13.4819H12.9293"
                stroke="#212121"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.2416 13.4819H8.2521"
                stroke="#212121"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M21.2499 21.2482C17.6844 24.8141 12.4047 25.5845 8.08413 23.5864C7.4463 23.3296 6.92338 23.122 6.42625 23.122C5.04155 23.1302 3.31801 24.4729 2.42223 23.5782C1.52646 22.6823 2.87012 20.9574 2.87012 19.5643C2.87012 19.0672 2.6708 18.5536 2.41403 17.9145C0.414949 13.5946 1.18644 8.31318 4.75195 4.74845C9.30351 0.195211 16.6983 0.195212 21.2499 4.74728C25.8097 9.30755 25.8015 16.6961 21.2499 21.2482Z"
                stroke="#fff"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.596 13.4819H17.6065"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.9188 13.4819H12.9293"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.2416 13.4819H8.2521"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}
        </Link>
        <p>{person.commentCount}</p>
      </div>
    </div>
  );
}

export default CommentButton;

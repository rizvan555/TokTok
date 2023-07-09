import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoHeart } from "react-icons/go";
import redHeart from "../resource/images/redHeart.png";
import CommentButton from "../components/CommentButton";
import commentButton1 from "../resource/images/commentButton1.svg";
import commentButton2 from "../resource/images/commentButton2.svg";
import axios from "axios";
import "../css/home.css";
import "../css/likeButton.css";

const PostItem = ({
    avatar,
    username,
    activity,
    image,
    post,
    posts,
    darkLight,
    toggleLike,
}) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [comments, setComments] = useState([]);
    const [likedPosts, setLikedPosts] = useState({});

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get("/api/comments");
                setComments(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchComments();
    }, []);

    const handleCommentClickDB = (id) => {
        const filteredPost = posts.find((post) => post._id === id);
        if (filteredPost) {
            navigate("/commentsPage", { state: { post: filteredPost } });
        } else {
            console.log("Post not found");
        }
    };

    const handleLikeClick = async (postId) => {
        try {
            const updatedLikedPosts = {
                ...likedPosts,
                [postId]: {
                    liked: !likedPosts[postId]?.liked,
                    likes: likedPosts[postId]?.liked ? 0 : 1,
                },
            };
            await axios.put("/api/posts/updateLike", {
                postId,
            });
            setLikedPosts(updatedLikedPosts);
            window.localStorage.setItem(
                "MY_APP_STATE",
                JSON.stringify(updatedLikedPosts)
            );
        } catch (error) {
            const responseError = error?.response?.data?.error?.message;
            if (responseError) {
                setError(responseError);
            } else {
                setError("Something went wrong. Please try again later.");
            }
            console.error(error);
        }
    };

    useEffect(() => {
        const data = window.localStorage.getItem("MY_APP_STATE");
        if (data !== null) {
            const parsedData = JSON.parse(data);
            setLikedPosts(parsedData);
        }
    }, []);

    return (
        <div className="person-main-container">
            <div className="post-container">
                <div className="post-header">
                    <div className="person-left-side">
                        <img src={avatar} alt="photo1" className="person-photo" />
                        <div className="name-box">
                            <h3 className="name">{username}</h3>
                            <h5 className="position">{activity}</h5>
                        </div>
                    </div>
                    <Link to="/settingsPage" className="settings-container">
                        <img
                            src={darkLight ? commentButton1 : commentButton2}
                            alt="commentButton"
                        />
                    </Link>
                </div>
                <div className="post-header">
                    <img src={image} alt="post-image" className="post-image" />
                </div>
                <section className="main-footer-section">
                    <div
                        className="like-section"
                        onClick={() => handleLikeClick(post._id)}
                    >
                        {likedPosts[post._id]?.liked ? (
                            <img src={redHeart} alt="redHeart" />
                        ) : (
                            <GoHeart size={27} />
                        )}
                        <p>{likedPosts[post._id]?.likes || 0}</p>
                    </div>
                    {post && (
                        <CommentButton
                            allComments={comments}
                            postId={post._id}
                            post={post}
                            darkLight={darkLight}
                            handleCommentClickDB={handleCommentClickDB}
                        />
                    )}
                </section>
            </div>
        </div>
    );
};

export default PostItem;

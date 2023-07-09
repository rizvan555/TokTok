import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/home.css";
import "../css/likeButton.css";
import axios from "axios";
import "../css/commentButton.css";
import toktokLogo from "../resource/logos/toktokLogo.png";
import redHeart from "../resource/images/redHeart.png";
import FooterNavbar from "../components/FooterNavbar";
import { GoHeart } from "react-icons/go";
import CustomizedSwitches from "../components/CustomizedSwitches";
import PostItem from "../components/PostItem";

function Home({ darkLight, setDarkLight }) {
  const [clickHeart, setClickHeart] = useState(true);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [refetch, setReFetch] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        if (response.status === 200) {
          let sortedPosts = [];
          if (Array.isArray(response.data)) {
            sortedPosts = response.data.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
          }
          setPosts(sortedPosts);
        } else {
          console.error("Fehler beim Abrufen der Benutzerdaten", response);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Yetkisiz erişimi ele al
        } else {
          console.error("Fehler beim Abrufen der Benutzerdaten", error);
          navigate("/signin", {
            state: { message: "Fehler beim Abrufen der Benutzerdaten" },
          });
        }
      }
    };

    fetchPosts();
  }, [refetch]);

  const toggleLike = async (postId) => {
    try {
      await axios.put("/api/posts/updateLike", {
        postId: postId,
      });
      setReFetch((prev) => !prev);
    } catch (error) {
      const responseError = error?.response?.data?.error?.message;
      if (responseError) {
        console.error(responseError);
      } else {
        console.error("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="left-box">
          <Link to="/home">
            <img src={toktokLogo} alt="logo" className="logo" />
          </Link>
          <h1 className="title">TokTok</h1>
        </div>
        <CustomizedSwitches darkLight={darkLight} setDarkLight={setDarkLight} />
        <button
          className="main-heart-button"
          onClick={() => setClickHeart(!clickHeart)}
        >
          {clickHeart ? (
            <GoHeart
              size={27}
              style={{ color: !darkLight ? "white" : "black" }}
            />
          ) : (
            <img src={redHeart} alt="redHeart" width="27" height="27" />
          )}
        </button>
      </header>

      <main className="home-main">
        <section className="main-section">
          {posts.map((post, index) => (
            <PostItem
              key={post._id}
              avatar={post?.user?.avatar}
              username={post?.user?.username}
              activity={post?.user?.activity}
              image={post.image}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              isLiked={post.isLiked}
              darkLight={darkLight}
              setDarkLight={setDarkLight}
              post={post}
              posts={posts}
              setReFetch={setReFetch}
              toggleLike={toggleLike}
            />
          ))}
        </section>
      </main>
      <FooterNavbar />
    </div>
  );
}

export default Home;

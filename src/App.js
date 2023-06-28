import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./css/likeButton.css";
import "./css/homeComments.css";
import "./css/searchAll.css";
import Home from "./pages/home";
import OwnProfile from "./pages/OwnProfile";
import OtherProfile from "./pages/OtherProfile";
import CommentsPage from "./pages/commentsPage";
import UploadPage from "./pages/upload";
import NewPost from "./pages/post";
import SearchAll from "./pages/searchAll";
import { useState } from "react";


function App() {
  const [darkLight, setDarkLight] = useState(false);
  return (
    <div
      className="App"
      style={{
        color: darkLight ? "#000" : "#fff",
        backgroundColor: darkLight ? "#fff" : "#000",
      }}
    >
      <Routes>
        <Route
          path="/"
          element={<Home darkLight={darkLight} setDarkLight={setDarkLight} />}
        />
        <Route path="/profile" element={<OwnProfile />} />
        <Route
          path="/commentsPage"
          element={
            <CommentsPage darkLight={darkLight} setDarkLight={setDarkLight} />
          }
        />
        <Route
          path="/search"
          element={
            <SearchAll darkLight={darkLight} setDarkLight={setDarkLight} />
          }
        />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/post" element={<NewPost />} />
        <Route path="/otherprofile" element={<OtherProfile />} />
      </Routes>
    </div>
  );
}

export default App;

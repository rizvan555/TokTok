import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./css/likeButton.css";
import "./css/homeComments.css";
import "./css/searchAll.css";
import "./css/upload.css";
import "./css/post.css";
import "./css/settingsPage.css";
import Home from "./pages/home";
import OwnProfile from "./pages/OwnProfile";
import OtherProfile from "./pages/OtherProfile";
import EditProfile from "./pages/EditProfile";
import CommentsPage from "./pages/commentsPage";
import UploadPage from "./pages/upload";
import NewPost from "./pages/post";
import SearchAll from "./pages/searchAll";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useState } from "react";
import SettingsPage from "./pages/settingsPage";

function App() {
  const [darkLight, setDarkLight] = useState(true);
  return (
    <div
      className="App"
      style={{
        color: darkLight ? "#000" : "#fff",
        backgroundColor: darkLight ? "#fff" : "#000",
      }}
    >
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
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
        <Route
          path="/upload"
          element={
            <UploadPage darkLight={darkLight} setDarkLight={setDarkLight} />
          }
        />
        <Route
          path="/post"
          element={
            <NewPost darkLight={darkLight} setDarkLight={setDarkLight} />
          }
        />
        <Route path="/otherprofile" element={<OtherProfile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route
          path="/settingsPage"
          element={
            <SettingsPage darkLight={darkLight} setDarkLight={setDarkLight} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

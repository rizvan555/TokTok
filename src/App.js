import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import CommentsPage from "./pages/commentsPage";
import UploadPage from "./pages/upload";
import NewPost from "./pages/post";
import SearchAll from "./pages/searchAll";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/commentsPage" element={<CommentsPage />} />
        <Route path="/search" element={<SearchAll />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/post" element={<NewPost />} />
      </Routes>
    </div>
  );
}

export default App;

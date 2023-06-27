import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import CommentsPage from "./pages/commentsPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/commentsPage" element={<CommentsPage />} />
      </Routes>
    </div>
  );
}

export default App;

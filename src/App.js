import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import OwnProfile from "./pages/OwnProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<OwnProfile />} />
      </Routes>
    </div>
  );
}

export default App;

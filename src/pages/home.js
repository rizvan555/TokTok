import React from "react";
import toktokLogo from "../resource/logos/toktokLogo.png";
import Heart from "../resource/images/Heart.png";

function Home() {
  return (
    <div>
      <header className="header">
        <img src={toktokLogo} alt="" />
        <h1 className="">TokTok</h1>
        <img src={Heart} alt="" />
      </header>
    </div>
  );
}

export default Home;

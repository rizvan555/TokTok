import React, { useState } from "react";
import { AiOutlineMinus, AiOutlineInfoCircle } from "react-icons/ai";
import { FiSettings, FiArchive, FiClock } from "react-icons/fi";
import { MdOutlineQrCodeScanner, MdPeople } from "react-icons/md";
import { GoHeart } from "react-icons/go";
import { CiSaveDown2 } from "react-icons/ci";
import "../css/ownProfile.css";

function ProfileSettings({ click, setClick, darkLight }) {
  const [settings] = useState([
    { icon: <FiSettings size={25} />, name: "Settings" },
    { icon: <FiArchive size={25} />, name: "Archive" },
    { icon: <FiClock size={25} />, name: "Your Activity" },
    { icon: <MdOutlineQrCodeScanner size={25} />, name: "QR Code" },
    { icon: <CiSaveDown2 size={25} />, name: "Save" },
    { icon: <MdPeople size={25} />, name: "Close Friends" },
    { icon: <GoHeart size={25} />, name: "Favorites" },
    { icon: <AiOutlineInfoCircle size={25} />, name: "Information Center" },
  ]);

  return (
    <div
      className={`profile-settings-container ${
        click ? "slide-up" : "slide-down"
      }`}
      style={{
        color: !darkLight ? "white" : "black",
        background: darkLight ? "white" : "#242222",
      }}
    >
      <button className="minus-button" onClick={() => setClick(!click)}>
        <AiOutlineMinus
          size={50}
          style={{ color: !darkLight ? "white" : "black" }}
        />
      </button>
      {settings.map((setting, index) => (
        <div className="setting-item" key={index}>
          {setting.icon}
          <p className="setting-name">{setting.name}</p>
        </div>
      ))}
    </div>
  );
}

export default ProfileSettings;

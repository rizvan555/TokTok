import React from "react";
import "../css/settingsPage.css";
import { FiShare, FiLink, FiSave } from "react-icons/fi";
import { BsQrCode, BsStar, BsArrowLeft } from "react-icons/bs";
import { RiUserUnfollowLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BiHide } from "react-icons/bi";
import { MdReportGmailerrorred } from "react-icons/md";
import { Link } from "react-router-dom";

function SettingsPage({ darkLight, setDarkLight }) {
  return (
    <div className="settingsPage-container">
      <Link to="/" className="left-button">
        <BsArrowLeft
          size={20}
          style={{ color: !darkLight ? "white" : "black" }}
        />
      </Link>
      <header className="settings-header">
        <div>
          <FiShare size={25} />
          <p>Share</p>
        </div>
        <div>
          <FiLink size={25} />
          <p>Link</p>
        </div>
        <div>
          <FiSave size={25} />
          <p>Save</p>
        </div>
        <div>
          <BsQrCode size={25} />
          <p>QR code</p>
        </div>
      </header>

      <main className="settings-main-container">
        <div>
          <BsStar size={25} />
          <p>Add to favourites</p>
        </div>
        <div>
          <RiUserUnfollowLine size={25} />
          <p>Unfollow</p>
        </div>
      </main>
      <footer className="settings-footer-container">
        <div>
          <CgProfile size={25} />
          <p>About this account</p>
        </div>
        <div>
          <AiOutlineInfoCircle size={25} />
          <p>Why you are seeing this post</p>
        </div>
        <div>
          <BiHide size={25} />
          <p>Hide</p>
        </div>
        <div>
          <MdReportGmailerrorred size={25} />
          <p>Report</p>
        </div>
      </footer>
    </div>
  );
}

export default SettingsPage;

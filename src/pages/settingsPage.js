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
          size={30}
          style={{ color: !darkLight ? "white" : "black" }}
          className="left-button-icon"
        />
      </Link>
      <header className="settings-header">
        <div className="settings-header-category">
          <FiShare size={25} />
          <p>Share</p>
        </div>
        <div className="settings-header-category">
          <FiLink size={25} />
          <p>Link</p>
        </div>
        <div className="settings-header-category">
          <FiSave size={25} />
          <p>Save</p>
        </div>
        <div className="settings-header-category">
          <BsQrCode size={25} />
          <p>QR code</p>
        </div>
      </header>

      <main className="settings-main-container">
        <div>
          <BsStar size={25} />
          <p className="settings-main-category">Add to favourites</p>
        </div>
        <div>
          <RiUserUnfollowLine size={25} />
          <p className="settings-main-category">Unfollow</p>
        </div>
      </main>

      <footer className="settings-footer-container">
        <div>
          <CgProfile size={25} />
          <p className="setting-footer-category">About this account</p>
        </div>
        <div>
          <AiOutlineInfoCircle size={25} />
          <p className="setting-footer-category">
            Why you are seeing this post
          </p>
        </div>
        <div>
          <BiHide size={25} />
          <p className="setting-footer-category">Hide</p>
        </div>
        <div>
          <MdReportGmailerrorred size={25} />
          <p className="setting-footer-category">Report</p>
        </div>
      </footer>
    </div>
  );
}

export default SettingsPage;

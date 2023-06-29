// Import - Images -----------------------------------

import logo from "../resource/logos/toktokLogo.png";
import postIcon from "../resource/icons/Plusframe_rounded.png";
import editIcon from "../resource/icons/EditeditIcon.png";
import settingIcon from "../resource/icons/GroupsettingIcon.png";
import { useState } from "react";

// ---------------------------------------------------

const ProfileMainBar = ({click,setClick}) => {

  return (
    <nav className="profile_mainbar">
      <section>
        <img src={logo} alt="logo toktok klein" />
        <h2>john_doe</h2>
      </section>
      <nav>
        <img src={postIcon} alt="icon_post_small" />
        <img src={editIcon} alt="icon_edit_small" />
        <button className="settingsButton" onClick={() => setClick(!click)}>
          <img src={settingIcon} alt="icon_settings_small" />
        </button>
      </nav>
    </nav>
  );
};

export default ProfileMainBar;

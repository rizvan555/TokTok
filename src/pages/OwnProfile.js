// Import - components ----------------

import ProfileMainBar from "../components/ProfileMainBar";
import ProfileFacts from "../components/ProfileFacts";
import ProfileGallery from "../components/ProfileGallery";

// --- style --------------------------

import "../css/ownProfile.css";
import ProfileSettings from "../components/ProfileSettings";
import { useState } from "react";

// ------------------------------------

function OwnProfile() {
  const [click, setClick] = useState(false);

  return (
    <>
      <div
        className="ownprofile_page"
        style={{ backgroundColor: click ? "rgba(0,0,0,0.5)" : "" }}
      >
        <ProfileMainBar click={click} setClick={setClick} />
        <ProfileFacts click={click} setClick={setClick}/>
        {!click ? <ProfileGallery click={click} setClick={setClick} /> : ""}
      </div>
      {click ? <ProfileSettings click={click} setClick={setClick} /> : ""}
    </>
  );
}

export default OwnProfile;

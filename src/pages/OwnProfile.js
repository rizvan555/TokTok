// Import - components ----------------

import ProfileMainBar from "../components/ProfileMainBar";
import ProfileFacts from "../components/ProfileFacts";
import ProfileGallery from "../components/ProfileGallery";
import FooterNavbar from '../components/FooterNavbar';

// --- style --------------------------

import "../css/ownProfile.css";
import ProfileSettings from "../components/ProfileSettings";
import { useState } from "react";

// ------------------------------------

function OwnProfile({ darkLight }) {

  const [click, setClick] = useState(false);

  const [user, setUser] = useState({
    avatar: "",
    name: "",
    username: "",
    activity: "",
    birthday: "",
    email: "",
    tel: "",
    gender: "",
    website: "",
    aboutMe: "",
    comments: "",
  })


  return (
    <>
      <div
        className="ownprofile_page"
        style={{
          backgroundColor: click ? "rgba(0,0,0,0.5)" : "",
        }}
      >
        <ProfileMainBar
          click={click}
          setClick={setClick}
          darkLight={darkLight} user={user} setUser={setUser}
        />
        <ProfileFacts click={click} setClick={setClick} darkLight={darkLight} user={user} setUser={setUser} />
        <ProfileGallery
          click={click}
          setClick={setClick}
          darkLight={darkLight}
        />
        <FooterNavbar />

      </div>
      {click ? (
        <ProfileSettings
          click={click}
          setClick={setClick}
          darkLight={darkLight}
        />
      ) : (
        ""
      )}
    </>
  );

}

export default OwnProfile;

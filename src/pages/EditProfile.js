import { Link } from "react-router-dom";
// Import - components ----------------

import EditProfileImage from "../components/EditProfileImage";
import EditProfileTextInput from "../components/EditProfileTextInput";
import UpdateButton from "../components/UpdateButton";

// --- style --------------------------

import "../css/editProfile.css";
import { BsArrowLeft } from "react-icons/bs";

// ------------------------------------

const EditProfile = ({ darkLight, setDarkLight }) => {
  return (
    <div className="editprofile_page">
      <section className="editprofile_topbar">
        <Link to="/profile">
          <BsArrowLeft
            size={25}
            style={{ color: !darkLight ? "white" : "black" }}
          />
        </Link>
        <h5 style={{ color: !darkLight ? "white" : "black" }}>Edit Profile</h5>
      </section>
      <form>
        <EditProfileImage />
        <EditProfileTextInput />
        <UpdateButton />
      </form>
    </div>
  );
};

export default EditProfile;

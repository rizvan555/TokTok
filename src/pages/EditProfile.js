import { Link } from "react-router-dom";
import leftArrowImage from "../resource/icons/Groupleft_arrow_back.svg"

// Import - components ----------------

import EditProfileImage from "../components/EditProfileImage";
import EditProfileTextInput from "../components/EditProfileTextInput";
import UpdateButton from "../components/UpdateButton";

// --- style --------------------------

import '../css/editProfile.css';

// ------------------------------------


const EditProfile = () => {
    return (
        <div className="editprofile_page">
            <section className="editprofile_topbar">
                <Link to='/profile'><img src={leftArrowImage} alt="left_arrow_icon" /></Link>
                <h5>Edit Profile</h5>
            </section>
            <form>
                <EditProfileImage />
                <EditProfileTextInput />
                <UpdateButton />
            </form>
        </div>
    );
}

export default EditProfile;
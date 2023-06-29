import EditProfileImage from "../components/EditProfileImage";
import EditProfileTextInput from "../components/EditProfileTextInput";

// --- style --------------------------

import '../css/editProfile.css';

// ------------------------------------


const EditProfile = () => {
    return (
        <div className="editprofile_page">
            <form>
                <EditProfileImage />
                <EditProfileTextInput />
            </form>
        </div>
    );
}

export default EditProfile;
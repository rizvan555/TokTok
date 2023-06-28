
// Import - Components -------------------------------

import OtherProfileGallery from "../components/OtherProfileGallery";
import OtherProfileFacts from "../components/OtherProfileFacts";
import OtherProfileMainBar from "../components/OtherProfileMainBar";

// --- Style --------------------------

import '../css/otherProfile.css';

// ------------------------------------

const OtherProfile = () => {
    return (
        <div className="otherprofile_page">
            <OtherProfileMainBar />
            <OtherProfileFacts />
            <OtherProfileGallery />
        </div>
    );
}

export default OtherProfile;
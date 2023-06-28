
// Import - Components -------------------------------

import OtherProfileGallery from "../components/OTHERProfileGallery";
import OtherProfileFacts from "../components/OtherProfileFacts";
import OtherProfileMainBar from "../components/OtherProfileMainBar";

// --- Style --------------------------

import '../css/own_profile.css';

// ------------------------------------

const OtherProfile = () => {
    return (
        <div className="otherprofilepage">
            <OtherProfileMainBar />
            <OtherProfileFacts />
            <OtherProfileGallery />
        </div>
    );
}

export default OtherProfile;
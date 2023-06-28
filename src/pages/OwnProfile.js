// --- style --------------------------
import '../css/own_profile.css';

// ------------------------------------

// Import - components ----------------
import ProfileMainBar from '../components/ProfileMainBar';
import ProfileFacts from '../components/ProfileFacts';
import ProfileGallery from '../components/ProfileGallery';

// ------------------------------------


function OwnProfile() {
    return (
        <div className='ownprofilepage'>
            <ProfileMainBar />
            <ProfileFacts />
            <ProfileGallery />
        </div>
    )
}

export default OwnProfile;
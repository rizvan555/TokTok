
// Import - components ----------------

import ProfileMainBar from '../components/ProfileMainBar';
import ProfileFacts from '../components/ProfileFacts';
import ProfileGallery from '../components/ProfileGallery';

// --- style --------------------------

import '../css/own_profile.css';

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
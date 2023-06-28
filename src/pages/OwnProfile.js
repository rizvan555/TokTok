
// Import - components ----------------

import ProfileMainBar from '../components/ProfileMainBar';
import ProfileFacts from '../components/ProfileFacts';
import ProfileGallery from '../components/ProfileGallery';

// --- style --------------------------

import '../css/ownProfile.css';

// ------------------------------------

function OwnProfile() {
    return (
        <div className='ownprofile_page'>
            <ProfileMainBar />
            <ProfileFacts />
            <ProfileGallery />
        </div>
    )
}

export default OwnProfile;
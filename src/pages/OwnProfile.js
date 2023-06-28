// --- style --------------------------
import '../css/own_profile.css';

// ------------------------------------

// Import - components ----------------
import ProfileMainBar from '../components/ProfileMainBar';
import ProfileFacts from '../components/ProfileFacts';
// ------------------------------------


function OwnProfile() {
    return (
        <div className='ownprofilepage'>
            <ProfileMainBar />
            <ProfileFacts />
        </div>
    )
}

export default OwnProfile;
// --- style --------------------------
import '../css/own_profile.css';
// ------------------------------------

// Import - components ----------------
import { ProfileMainBar } from '../components/ProfileMainBar';
// ------------------------------------


function own_Profile() {
    return (
        <div>
            <ProfileMainBar />
            <ProfileFacts />

        </div>
    )
}

export default own_Profile;
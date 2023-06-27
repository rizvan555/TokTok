import logo from '../resource/logos/toktokLogo.png';
import postIcon from '../resource/icons/Plusframe_rounded.png';
import editIcon from '../resource/icons/EditeditIcon.png';
import settingIcon from '../resource/icons/GroupsettingIcon.png';

// --- style --------------------------
import '../css/own_profile.css';
// ------------------------------------


const ProfileMainBar = () => {
    return (
        <nav className='profile_main_bar'>
            <section>
                <img src={logo} alt="logo toktok klein" />
                <h2>john_doe</h2>
            </section>
            <nav>
                <img src={postIcon} alt='icon_post_small' />
                <img src={editIcon} alt='icon_edit_small' />
                <img src={settingIcon} alt="icon_settings_small" />
            </nav>
        </nav>
    );
}

export default ProfileMainBar;
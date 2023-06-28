
// Import - Images -----------------------------------

import logo from '../resource/logos/toktokLogo.png';
import settingIcon from '../resource/icons/GroupsettingIcon.png';

// ---------------------------------------------------

const OtherProfileMainBar = () => {
    return (
        <nav className='otherprofile_mainbar'>
            <section>
                <img src={logo} alt="logo toktok klein" />
                <h2>julia_adaline</h2>
            </section>
            <nav>
                <img src={settingIcon} alt="icon_settings_small" />
            </nav>
        </nav>
    );
}

export default OtherProfileMainBar;
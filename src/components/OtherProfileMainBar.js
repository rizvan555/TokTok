
import { Link } from 'react-router-dom';

// Import - Images -----------------------------------

import leftArrowImage from '../resource/icons/Groupleft_arrow_back.svg';
import settingIcon from '../resource/icons/GroupsettingIcon.png';

// ---------------------------------------------------

const OtherProfileMainBar = () => {
    return (
        <nav className='profile_mainbar'>
            <section>
                <Link to='/profile'><img src={leftArrowImage} alt="left_arrow_icon" /></Link>
                <h2>julia_adaline</h2>
            </section>
            <nav>
                <img src={settingIcon} alt="icon_settings_small" />
            </nav>
        </nav>
    );
}

export default OtherProfileMainBar;
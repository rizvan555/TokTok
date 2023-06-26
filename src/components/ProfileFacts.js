import profile_image from '../resource/images/Ellipseprofile_image_small.png';
import profile_edit_icon from '../resource/icons/Edit Squareprofile_image_edit_icon.png';


// --- style --------------------------
import '../css/own_profile.css';
// ------------------------------------

const ProfileFacts = () => {
    return (
        <div>
            <article>
                <img src={profile_image} alt="profile_image_user" />
                <img src={profile_edit_icon} alt="edit_icon" />
                <h1>John Doe</h1>
                <h3>UI/UX Designer</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus sunt ipsa minima ipsum dolores animi delectus magni odit reiciendis voluptatum?</p>
                <p>www.youtdomain.com</p>
            </article>
        </div>
    );
}

export default ProfileFacts;
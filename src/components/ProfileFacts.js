import profile_image from '../resource/images/Ellipseprofile_image_small.png';
import profile_edit_icon from '../resource/icons/Edit Squareprofile_image_edit_icon.png';

// --- style --------------------------
import '../css/own_profile.css';
// ------------------------------------

const ProfileFacts = () => {
    return (
        <div>
            <article className='profile_article'>
                <img src={profile_image} alt="profile_image_user" />
                <img src={profile_edit_icon} alt="edit_icon" />
                <h1>John Doe</h1>
                <h3>UI/UX Designer</h3>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus sunt ipsa minima ipsum dolores animi delectus magni odit reiciendis voluptatum?</p>
                <p>www.yourdomain.com</p>
            </article>
            <section className='follower_section'>
                <div className='posts'>
                    <h5>356</h5>
                    <p>Posts</p>
                </div>
                <div className='followers'>
                    <h5>46,379</h5>
                    <p>Followers</p>
                </div>
                <div className='following'>
                    <h5>318</h5>
                    <p>Following</p>
                </div>
            </section>
        </div>
    );
}

export default ProfileFacts;
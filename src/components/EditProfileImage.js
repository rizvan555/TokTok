import newUserImage from '../resource/images/EllipseunknownUser.png';
import profile_edit_icon from '../resource/icons/Edit Squareprofile_image_edit_icon.png';

const EditProfileImage = () => {
    return (
        <div className='image-container'>
            <img src={newUserImage} className='profile_image' alt="new_user_image" />
            <img src={profile_edit_icon} className='edit_icon' alt="profile_edit_icon" />
        </div>
    );
}

export default EditProfileImage;
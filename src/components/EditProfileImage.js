import newUserImage from '../resource/images/EllipseunknownUser.png';
import profile_edit_icon from '../resource/icons/Edit Squareprofile_image_edit_icon.png';

const EditProfileImage = () => {
    return (
        <div className='UserImage'>
            <img src={newUserImage} alt="new_user_image" />
            <img src={profile_edit_icon} alt="profile_edit_icon" />
        </div>
    );
}

export default EditProfileImage;
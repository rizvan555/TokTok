
// Import - Images -----------------------------------

import profile_feed_icon from '../resource/icons/Groupfeed-icon.png';
import gallery_image1 from '../resource/images/Imagegallery-image1.png';
import gallery_image2 from '../resource/images/Imagegallery-image2.png';
import gallery_image3 from '../resource/images/Imagegallery-image3.png';

// ---------------------------------------------------

const ProfileGallery = () => {
    return (
        <section className='profile_gallery'>
            <div className='profile_gallery_header'>
                <img src={profile_feed_icon} alt="profile_feed_icon" />
                <h5>Feeds</h5>
            </div>
            <div className='line'></div>
            <div className='profile_gallery_images'>
                <img src={gallery_image1} alt="gallery_image1" />
                <img src={gallery_image2} alt="gallery_image2" />
                <img src={gallery_image3} alt="gallery_image3" />
            </div>
        </section>
    );
}

export default ProfileGallery;
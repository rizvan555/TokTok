import profile_feed_icon from '../resource/icons/Groupfeed-icon.png';

const ProfileGallery = () => {
    return (
        <section className='gallery'>
            <img src={profile_feed_icon} alt="profile_feed_icon" />
            <h5>Feeds</h5>
        </section>
    );
}

export default ProfileGallery;
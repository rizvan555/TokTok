
// Import - Images -----------------------------------

import otherprofile_image from '../resource/images/Ellipseprofile_image_julia.png';

// ---------------------------------------------------

const OtherProfileFacts = () => {
    return (
        <div>
            <article className='otherprofile_article'>
                <div className='image-container'>
                    <img src={otherprofile_image} className='profile_img' alt="profile_image_user" />
                </div>
                <h1>Julia Adaline</h1>
                <h3>Photographer</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio magni totam, harum exercitationem accusamus facere praesentium expedita.</p>
                <p>www.yourdomain.com</p>
            </article>
            <section className='follower_section'>
                <div className='posts'>
                    <h5>267</h5>
                    <p>Posts</p>
                </div>
                <div className='followers'>
                    <h5>24,278</h5>
                    <p>Followers</p>
                </div>
                <div className='following'>
                    <h5>237</h5>
                    <p>Following</p>
                </div>
            </section>
            <div className='follower_section_line'></div>
        </div>
    );
}

export default OtherProfileFacts;
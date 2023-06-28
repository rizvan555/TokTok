import "../css/post.css"

import Anny from "../resource/images/image1.png"
import Profile from "../resource/images/Ellipseprofile_image_small.png"
import Location from "../resource/icons/Location.svg"

const NewPost = () => {
    return (
        <div>
            <header>
                <section className="new_post_title">
                    <img src="" alt="" />
                    <h2>New Post</h2>
                </section>
                <section className="new_post">
                    <img src={Profile} alt="profile" className="profile_pic" />
                    <input type="text" name="text" id="post_text" placeholder="Write a caption..." />
                    <img src={Anny} alt="anny" className="post_pic" />
                </section>
            </header>
            <main>
                <div className="location">
                    <img src={Location} alt="location" />
                    <p>Add Location</p>
                </div>
                <section>
                    <div>
                        <p>Also post to</p>
                    </div>
                    <div className="toggle">
                        <label>
                            Facebook
                            <input type="checkbox" />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="toggle">
                        <label>
                            Twitter
                            <input type="checkbox" />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="toggle">
                        <label>
                            Tumblr
                            <input type="checkbox" />
                            <span className="slider"></span>
                        </label>

                    </div>
                </section>
            </main>
        </div>
    );
}

export default NewPost;
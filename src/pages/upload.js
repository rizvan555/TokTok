import "../css/upload.css";
import React, { useState } from "react";

import CloseSquare from "../resource/icons/Close_Square.svg";
import Exclude from "../resource/icons/Exclude.svg";
import ArrowDown from "../resource/icons/ArrowDown.svg";
import Camera from "../resource/icons/Camera.svg";
import Category from "../resource/icons/Category.svg";
import Anny from "../resource/images/image1.png";
import Albert from "../resource/images/image2.png";
import Hime from "../resource/images/image3.png";

const pictures = [
    {
        image: Anny,
        label: "Anny"
    },
    {
        image: Albert,
        label: "Albert"
    },
    {
        image: Hime,
        label: "Hime"
    },
    {
        image: Anny,
        label: "Anny"
    },
    {
        image: Albert,
        label: "Albert"
    },
    {
        image: Hime,
        label: "Hime"
    },
    {
        image: Anny,
        label: "Anny"
    },
    {
        image: Albert,
        label: "Albert"
    },
    {
        image: Hime,
        label: "Hime"
    }
]



const Home = () => {

    const [showGallery, setShowGallery] = useState(false);

    const handleUploadClick = () => {
        setShowGallery(!showGallery);
    };
    return (
        <div>
            <header>
                <section className="new_post_title">
                    <img src={CloseSquare} alt="" />
                    <h2>New Post</h2>
                </section>
                <section className="background_photo">
                    <div className="add_photo">
                        <button className="upload_button" onClick={handleUploadClick}>
                            <img src={Exclude} alt="exclude" />Upload</button>
                    </div>
                </section>
            </header>
            <main>
                {showGallery && (
                    <div className="whole_gallery">
                        <div className="gallery">
                            <div className="gallery_left">
                                <p>Gallery</p>
                                <img src={ArrowDown} alt="arrow" />
                            </div>
                            <div className="gallery_right">
                                <img src={Category} alt="category" />
                                <img src={Camera} alt="camera" />
                            </div>
                        </div>
                        <div className="dropdown-options">
                            {pictures.map(picture => (
                                <div
                                    key={picture.value}
                                    className="dropdown-option"
                                >
                                    <img
                                        src={picture.image}
                                        alt={picture.label}
                                        className="dropdown-option-image"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Home;
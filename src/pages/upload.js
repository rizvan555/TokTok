import "../css/upload.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FileUpload from "../components/FileUpload"


import Exclude from "../resource/icons/Exclude.svg";
import Anny from "../resource/images/image1.png";
import Albert from "../resource/images/image2.png";
import Hime from "../resource/images/image3.png";
import Layout from "../resource/images/Auto Layout Vertical.svg";

import { BiCategory, BiSolidCategory } from "react-icons/bi";
import { AiFillCamera, AiOutlineCamera } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CgCloseR } from "react-icons/cg";



const pictures = [
    {
        image: Anny,
        label: "Anny",
    },
    {
        image: Albert,
        label: "Albert",
    },
    {
        image: Hime,
        label: "Hime",
    },
    {
        image: Anny,
        label: "Anny",
    },
    {
        image: Albert,
        label: "Albert",
    },
    {
        image: Hime,
        label: "Hime",
    },
    {
        image: Anny,
        label: "Anny",
    },
    {
        image: Albert,
        label: "Albert",
    },
    {
        image: Hime,
        label: "Hime",
    },
];

const Upload = ({ darkLight, setDarkLight }) => {
    const [showGallery, setShowGallery] = useState(false);

    const handleUploadClick = () => {
        setShowGallery(!showGallery);
    };

    // const handleImageClick = () => {
    //     document.getElementById('file-input').click();
    // };

    return (
        <div className="master">
            <header>
                <section className="new_post_title">
                    <Link to="/">
                        <CgCloseR
                            size={30}
                            style={{ color: !darkLight ? "white" : "black" }}
                        />
                    </Link>
                    <h2 style={{ color: !darkLight ? "white" : "black" }}>New Post</h2>
                    <Link to={"/post"}>weiter</Link>

                    <FileUpload />

                </section>
                <section className="background_photo">
                    <div className="add_photo">
                        <button className="upload_button" onClick={handleUploadClick}>
                            <img src={Exclude} alt="exclude" />
                            Upload
                        </button>
                    </div>
                </section>
            </header>
            <main>
                {showGallery && (
                    <div className="whole_gallery">
                        <div className="gallery">
                            <div className="gallery_left">
                                <p style={{ color: !darkLight ? "white" : "black" }}>Gallery</p>
                                <MdOutlineKeyboardArrowDown
                                    size={30}
                                    style={{ color: darkLight ? "black" : "white" }}
                                />
                            </div>
                            <div className="gallery_right">
                                {!darkLight ? (
                                    <BiCategory
                                        size={40}
                                        style={{ color: !darkLight ? "white" : "black" }}
                                    />
                                ) : (
                                    <BiSolidCategory size={40} />
                                )}
                                {!darkLight ? (
                                    <AiFillCamera
                                        size={40}
                                        style={{ color: !darkLight ? "white" : "black" }}
                                    />
                                ) : (
                                    <AiOutlineCamera size={40} />
                                )}
                            </div>
                        </div>
                        <div className="dropdown-options">

                            {/* <FileUpload /> */}


                            {/* <button>
                                <input type="file" id="file-input" />
                                <img
                                    src={Layout}
                                    alt='layout'
                                    className="dropdown-option-image"
                                    onclick={handleImageClick}
                                />
                            </button> */}



                            {/* {pictures.map((picture) => (
                                <div key={picture.value} className="dropdown-option">
                                    <Link to={"/post"}>
                                        <img
                                            src={picture.image}
                                            alt={picture.alt}
                                            className="dropdown-option-image"
                                        />
                                    </Link>
                                </div>
                            ))} */}
                        </div>
                    </div >
                )}
            </main >
        </div >
    );
};

export default Upload;

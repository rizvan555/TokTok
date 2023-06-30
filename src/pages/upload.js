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




const Upload = ({ darkLight, setDarkLight }) => {
    const [showGallery, setShowGallery] = useState(false);

    const handleUploadClick = () => {
        setShowGallery(!showGallery);
    };

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
                </section>
                <section className="background_photo">
                    <div className="add_photo">
                        <button className="upload_button" onClick={handleUploadClick}>
                            <img src={Exclude} alt="exclude" />
                            Upload
                        </button>
                    </div>
                </section>
                <div className="whole_gallery">
                    <div className="gallery">
                        <div className="gallery_left">
                            <button className="gallery_button"><p style={{ color: !darkLight ? "white" : "black" }} onClick={handleUploadClick}>Gallery</p>
                                <MdOutlineKeyboardArrowDown
                                    size={25}
                                    style={{ color: darkLight ? "black" : "white" }}
                                /></button>
                        </div>
                        <div className="gallery_right">
                            {!darkLight ? (
                                <BiCategory
                                    size={35}
                                    style={{ color: !darkLight ? "white" : "black" }}
                                />
                            ) : (
                                <BiSolidCategory size={35} />
                            )}
                            {!darkLight ? (
                                <AiFillCamera
                                    size={35}
                                    style={{ color: !darkLight ? "white" : "black" }}
                                />
                            ) : (
                                <AiOutlineCamera size={35} />
                            )}
                        </div>
                    </div>
                    {showGallery && (
                        <div className="dropdown-options">
                            <FileUpload />
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
                        </div>)}
                </div >
            </header>
            <main>
                {showGallery && (
                    <div className="dropdown-options">
                        <input type="file" id="file-input" />
                        <img
                            src={Layout}
                            alt='layout'
                            className="dropdown-option-image"
                            onclick={handleImageClick}
                        />
                    </div>
                )}
            </main >
        </div >
    );
};

export default Upload;

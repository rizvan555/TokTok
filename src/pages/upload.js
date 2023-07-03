import "../css/upload.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FileUpload from "../components/FileUpload";
import Exclude from "../resource/icons/Exclude.svg";
// import Layout from "../resource/images/Auto Layout Vertical.svg";
import { BiCategory, BiSolidCategory } from "react-icons/bi";
import { AiFillCamera, AiOutlineCamera } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CgCloseR } from "react-icons/cg";

const Upload = ({ darkLight, setDarkLight }) => {
    const [showGallery, setShowGallery] = useState(false);

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [res, setRes] = useState({});
    const navigate = useNavigate();

    const handleUploadClick = () => {
        setShowGallery(!showGallery);
    };
    console.log(file);

    const handleSelectFile = (e) => setFile(e.target.files[0]);
    const handleUpload = async () => {
        try {
            setLoading(true);
            const data = new FormData();
            data.append("image", file);
            const res = await axios.post("/api/upload/image", data, { withCredentials: true });
            setRes(res.data);

            const imageURL = res.data.secure_url;
            navigate("/post", { state: { imageURL } })

            // setUploadedURL(imageURL);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
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
                        <button onClick={handleUpload} className="upload_button">
                            {loading ? (
                                <>
                                    <img src={Exclude} alt="exclude" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <img src={Exclude} alt="exclude" />
                                    Upload
                                </>
                            )}
                        </button>
                    </div>
                </section>
                <div className="whole_gallery">
                    <div className="gallery">
                        <div className="gallery_left">
                            <button className="gallery_button" onClick={handleUploadClick}>
                                <p
                                    style={{ color: !darkLight ? "white" : "black" }}
                                >
                                    Gallery
                                </p>
                                <MdOutlineKeyboardArrowDown
                                    size={25}
                                    style={{ color: darkLight ? "black" : "white" }}
                                />
                            </button>
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
                </div>
            </header>
            <main>
                {showGallery && (
                    <div className="dropdown-options">
                        <FileUpload handleUpload={handleUpload} handleSelectFile={handleSelectFile} />
                    </div>
                )}
            </main>
        </div>
    );
};

export default Upload;

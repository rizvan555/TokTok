import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Import Images ----------------------------------------------------

import newUserImage from '../resource/images/EllipseunknownUser.png';
import editIcon from '../resource/icons/Edit Squareprofile_image_edit_icon.png';

// ------------------------------------------------------------------

const EditProfileImage = ({ user, setUser }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [res, setRes] = useState({});
    const navigate = useNavigate();

    const handleSelectFile = (e) => setFile(e.target.files[0]);
    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = new FormData();
            data.append("avatar", file);
            const response = await axios.post("/api/upload/avatar", data, { withCredentials: true });
            setRes(response.data);

            const imageURL = response.data.secure_url;
            setUser({ ...user, avatar: imageURL })
            // navigate("/profile", { state: { imageURL } });

        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    {/* <label htmlFor="file" className="file_label">
                {" "}

                <input
                    className="edit_profile_file"
                    type="file"
                    onChange={handleSelectFile}
                    multiple={false}
                    // className="file_button"
                    style={{ border: 'none' }}
                />
                {res.secure_url ? (
                    <img src={res.secure_url} className='profile_image' alt="" />
                ) : (
                    <img src={newUserImage} className='profile_image' alt="" />
                )}
                {file && <center> {file.name}</center>}
                <img className="edit_icon" src={editIcon} alt="editIcon" />
            </label> */}







    return (
        <div className='edit-image-container'>
            {/* <label for="fileInput" className="file-input-label"> */}
            {res.secure_url ? (
                <img src={res.secure_url} className='profile-image' alt="" width='140' height='auto' />
            ) : (
                <img src={newUserImage} className='profile-image' alt="" width='140' height='auto' />
            )}
            {/* </label> */}
            <input
                type="file"
                className="edit-profile-file"
                onChange={handleSelectFile}
                multiple={false}
            // className="file_button"
            // style={{ border: 'none' }}
            />

            {file && <center className="center-file-name">{file.name}</center>}

            {file && (
                <button onClick={handleUpload} className="btn-green">
                    {loading ? "uploading..." : "upload to cloudinary"}
                </button>
            )}
            <button className="edit-icon">
                <img src={editIcon} alt="editIcon" />
            </button>
            {/* <code>
                {Object.keys(res).length > 0 &&
                    Object.keys(res).map((key) => (
                        <p className="output-item" key={key}>
                            <span>{key}:</span>
                            <span>
                                {typeof res[key] === "object" ? "object" : res[key]}
                            </span>
                        </p>
                    ))}
            </code> */}
        </div>
    );
}

export default EditProfileImage;

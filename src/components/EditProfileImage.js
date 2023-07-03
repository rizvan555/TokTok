import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import newUserImage from '../resource/images/EllipseunknownUser.png';

const EditProfileImage = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [res, setRes] = useState({});
    const navigate = useNavigate();

    const handleSelectFile = (e) => setFile(e.target.files[0]);
    const handleUpload = async () => {
        try {
            setLoading(true);
            const data = new FormData();
            data.append("avatar", file);
            const response = await axios.post("/api/upload/avatar", data, { withCredentials: true });
            setRes(response.data);

            const imageURL = response.data.secure_url;
            navigate("/editprofile", { state: { imageURL } });
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='image-container'>
            <label htmlFor="file" className="file_label">
                {" "}
            </label>
            {res.secure_url ? (
                <img src={res.secure_url} className='profile_image' alt="" />
            ) : (
                <img src={newUserImage} className='profile_image' alt="" />
            )}
            {file && <center> {file.name}</center>}
            <input
                id="file"
                type="file"
                onChange={handleSelectFile}
                multiple={false}
                className="file_button"
                style={{ border: "none" }}
            />
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
            {file && (
                <button onClick={handleUpload} className="btn-green">
                    {loading ? "uploading..." : "upload to cloudinary"}
                </button>
            )}
        </div>
    );
}

export default EditProfileImage;

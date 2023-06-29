import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function FileUpload() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [res, setRes] = useState({});
    const navigate = useNavigate();

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
        <div className="file-upload">
            <label htmlFor="file" className="btn-grey">
                {" "}
            </label>
            {file && <center> {file.name}</center>}
            <input
                id="file"
                type="file"
                onChange={handleSelectFile}
                multiple={false}
            />
            <code>
                {Object.keys(res).length > 0
                    ? Object.keys(res).map((key) => (
                        <p className="output-item" key={key}>
                            <span>{key}:</span>
                            <span>
                                {typeof res[key] === "object" ? "object" : res[key]}
                            </span>
                        </p>
                    ))
                    : null}
            </code>
            {res && <img src={res.secure_url} />}
            {file && (
                <>
                    <button onClick={handleUpload} className="btn-green">
                        {loading ? "uploading..." : "upload to cloudinary"}
                    </button>
                </>
            )}
        </div>
    );
}
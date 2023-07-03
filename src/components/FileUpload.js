import React, { useState, useRef } from "react";

import Layout from "../resource/images/Auto Layout Vertical.svg";

import "../css/fileButton.css"

export default function FileUpload({ handleSelectFile }) {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);


    const openFileInput = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="file-upload">
            <label htmlFor="file" className="file_label">
                {" "}
            </label>
            {file && <center> {file.name}</center>}
            <button onClick={openFileInput}><img src={Layout} alt="layout" /></button>
            <input
                ref={fileInputRef}
                id="file"
                type="file"
                name="file"
                onChange={handleSelectFile}
                multiple={false}
                className="file_button"
                style={{ border: "none" }}
            />
        </div>
    );
}
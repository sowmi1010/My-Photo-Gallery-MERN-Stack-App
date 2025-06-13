import React, { useState } from "react";
import axios from "axios";

function UploadForm({ onUpload }) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    const urls = selected.map(file => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setFiles(selected);
    setPreviews(urls);
  };

  const handleRemove = (index) => {
    const newFiles = [...files];
    const newPreviews = [...previews];

    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach(file => formData.append("images", file)); // 👈 MUST match backend field name!

    try {
      await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      onUpload(); // call parent to refresh gallery
      setFiles([]);
      setPreviews([]);
      document.getElementById("fileInput").value = "";
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="bg-white rounded p-4 mb-6 shadow">
      <input
        id="fileInput"
        type="file"
        multiple
        onChange={handleFileChange}
        className="mb-2"
      />

      <div className="flex gap-4 flex-wrap mb-2">
        {previews.map((item, index) => (
          <div key={index} className="relative">
            <img src={item.url} alt="preview" className="h-24 rounded shadow" />
            <button
              onClick={() => handleRemove(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleUpload}
        disabled={files.length === 0}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Upload
      </button>
    </div>
  );
}

export default UploadForm;

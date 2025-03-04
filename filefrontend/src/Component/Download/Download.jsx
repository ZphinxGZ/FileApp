import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Download.css";

function Download({ refreshTrigger }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, [refreshTrigger]); 

  const fetchFiles = () => {
    axios.get("http://localhost:3000/files/list")
      .then((res) => {
        setFiles(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = (fileName) => {
    axios
      .delete(`http://localhost:3000/files/delete/${fileName}`)
      .then(() => {
        fetchFiles();
      })
      .catch((err) => {
        console.error("Error deleting file:", err);
      });
  };
  

  return (
    <div className="download-container">
      <h1>Download</h1>
      <div className="files-list">
        {files.map((file) => (
          <div className="file" key={file.name}>
            <b>{file.name}</b>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              <button className="download-button">&darr;</button>
            </a>
            <button 
              className="delete-button" 
              onClick={() => handleDelete(file.name)}
            >
              —
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Download;

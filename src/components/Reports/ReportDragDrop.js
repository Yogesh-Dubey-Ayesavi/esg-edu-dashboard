"use client";

import { Box, Button, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import ESG from "@/lib/esg-helper";
import toast from "react-hot-toast";

const FileUploader = ({ handleClickOpen, file, setFile, handleFileChange }) => {
  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    handleFileChange(droppedFile);
  }, []);

  
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInput = (event) => {
    const selectedFile = event.target.files[0];
    handleFileChange(selectedFile);
  };

  const fileInputRef = React.createRef();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "70vh",
        backgroundColor: "#f1eff2",
        border: "1px solid #dcddea",
        borderRadius: "20px",
      }}
    >
      <div
        style={{
          width: "80%",
          height: "50vh",
          border: "4px dashed #6366f1",
          textAlign: "center",
          paddingTop: "20px",
          margin: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: "10px",
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>Drag & drop a file here</Typography>

        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "20px" }}>
          <UploadFileOutlinedIcon style={{ fontSize: "50px", marginTop: "20px" }} />
          <Button variant="contained" sx={{ marginTop: "20px", backgroundColor: "#6366f1 !important", color: "white" }} onClick={handleButtonClick}>
            Select PDF
          </Button>
        </Box>

        {file && <p style={{ paddingTop: "20px" }}>{file.name}</p>}
        <input type="file" accept=".pdf" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileInput} />
      </div>
    </Box>
  );
};

export default FileUploader;

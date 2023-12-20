"use client";

import ESG from "@/lib/esg-helper";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ReportDragDrop from "./ReportDragDrop";
import ReportDropdown from "./ReportDropdown";
import ReportTable from "./ReportTable";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReportsPage = ({ type }) => {
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [file, setFile] = useState("");
  const [reRender, setReRender] = useState(false);

  const handleSubmit = (data) => {
    // setReRender((prev) => !prev);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = async (selectedFile) => {
    try {
      const fileSizeInMB = selectedFile.size / (1024 * 1024);
      if (fileSizeInMB > 3) {
        toast.error("File size exceeds 3 MB limit");
        return;
      }

      setFile(selectedFile);

      const userData = await ESG.getUserInfo();

      const currentDate = new Date();
      const currentISOString = currentDate.toISOString();

      const loadingToastId = toast.loading("Uploading the document.");
      handleClose();

      const { data } = await ESG.supabase.storage.from("reports").upload(`${userData.id}-${currentISOString}`, selectedFile, {
        cacheControl: "3600",
        upsert: false,
      });

      const { error } = await ESG.supabase.from("reports").insert({ name: selectedFile.name, uri: `${type}/${selectedFile.name}`, institution_id: selectedInstitution });

      toast.dismiss(loadingToastId);

      if (data) {
        toast.success("Your report has been uploaded.");
      }
      setReRender((prev) => !prev);
    } catch (e) {
      toast.error(e);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "800px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "3rem" }}>
        {/* <ReportDropdown onSelect={handleSubmit} selectedInstitution={selectedInstitution} setSelectedInstitution={setSelectedInstitution} /> */}
        <Button
          variant="contained"
          startIcon={<AddOutlinedIcon />}
          style={{
            backgroundColor: "#6366F1",
            padding: "8px 20px",
            borderRadius: "11px",
            textTransform: "none",
            fontWeight: "600",
          }}
          size="large"
          onClick={() => {
            handleClickOpen();
          }}
        >
          Add Report
        </Button>
      </Box>
      <ReportTable selectedInstitution={selectedInstitution} reRender={reRender} setReRender={setReRender} type={type}/>

      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description" fullWidth={true} maxWidth={"md"}>
        <DialogTitle style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: "bold", marginTop: "10px", marginBottom: "20px", color: "#1f1c1cba" }}>
          Upload your certificate
          <CloseIcon sx={{ color: "#6366F1" }} onClick={handleClose} />
        </DialogTitle>
        <DialogContent>
          <ReportDragDrop handleClickOpen={handleClickOpen} handleClose={handleClose} file={file} setFile={setFile} handleFileChange={handleFileChange} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ReportsPage;

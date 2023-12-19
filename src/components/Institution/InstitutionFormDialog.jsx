"use client";

import ESG from "@/lib/esg-helper";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { InstitutionModel } from "esg-sdk";
import * as React from "react";
import toast from "react-hot-toast";
import InstitutionForm from "./InstitutionForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setOpen, handleClickOpen, handleClose }) {
  const handleSubmit = async (formValues) => {
    const userData = await ESG.getUserInfo();

    const data = formValues;
    data["handler_id"] = userData?.id;
    setOpen(false);
    try {
      const response = await ESG.registerInstitution(new InstitutionModel(data));

      if (response) {
        toast.success("Institution has been successfully registered.");
      }
    } catch (e) {
      toast.error(e);
    }
  };

  return (
    <React.Fragment>
      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
        <DialogTitle style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: "bold", marginTop: "10px", marginBottom: "20px", color: "#1f1c1cba" }}>
          Add institution details
          <CloseIcon sx={{ color: "#6366F1" }} onClick={handleClose} />
        </DialogTitle>
        <DialogContent>
          <InstitutionForm handleSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

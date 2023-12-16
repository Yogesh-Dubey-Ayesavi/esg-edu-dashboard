"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ESG from "@/lib/esg-helper";

export default function FormDialog({ open, handleClose }) {
  const [email, setEmail] = useState("");

  const handleInvite = () => {
    async function invite() {
      await ESG.inviteAdmin(email)
      setEmail("");
    }
    invite()
    handleClose()
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="font-bold">Collaborate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Invite someone to collaborate on this project.
          </DialogContentText>
          <TextField
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              color: '#6366F1',
              padding: "8px 20px",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "600",
              marginTop: "16px",
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            style={{
              color: '#6366F1',
              padding: "8px 20px",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "600",
              marginTop: "16px",
            }}
            onClick={handleInvite}
          >
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

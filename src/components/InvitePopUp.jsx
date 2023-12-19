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
import { UserRole } from "esg-sdk";
import { FormControl, MenuItem, Paper, Select } from "@mui/material";
import toast from "react-hot-toast";

export default function FormDialog({ open, handleClose }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleInvite = () => {
    async function invite() {
      try {
        await ESG.inviteAdmin(email, role === "" ? UserRole.InitiativeWriter : role);

        setEmail("");
        setRole("");
        toast.success("Invite has been sent successfully.");
      } catch (e) {
        console.log(e);
      }
    }
    invite();
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="font-bold" sx={{ mt: 2 }}>
          Collaborate
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Invite someone to collaborate on this project.</DialogContentText>

          <TextField sx={{ mt: 6 }} value={email} onChange={(e) => setEmail(e.target.value)} autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth variant="standard" />
          <FormControl sx={{ minWidth: 120, mt: 4 }}>
            <Select
              value={role}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                border: "5px",
              }}
            >
              <MenuItem value="">Initiative Writer</MenuItem>

              <MenuItem value={UserRole.InitiativeReviewer}>Initiative Reviewer</MenuItem>
              <MenuItem value={UserRole.Institution}>Institution</MenuItem>
              <MenuItem value={UserRole.Corporate}>Corporate</MenuItem>
              <MenuItem value={UserRole.CertificateReviewer}>Certificate Reviewer</MenuItem>
              <MenuItem value={UserRole.SuperAdmin}>Super Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            style={{
              color: "#6366F1",
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
              color: "#6366F1",
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

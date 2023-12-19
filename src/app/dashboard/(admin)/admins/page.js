"use client";

import AdministratorsTable from "@/components/Administrators/AdministratorsTable";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import InvitePopUp from "../../../../components/InvitePopUp";

export default function page() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div style={{ height: "100vh" }}>
        <Box>
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: "2rem",
              "@media (maxWidth:600px)": {
                fontSize: "0.5rem",
              },
            }}
          >
            Administrators 
          </Typography>
          <AdministratorsTable handleClickOpen={handleClickOpen} />
          <InvitePopUp open={open} handleClose={handleClose} />
        </Box>
      </div>
    </>
  );
}
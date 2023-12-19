"use client";

import InstitutionFormDialog from "@/components/Institution/InstitutionFormDialog";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import InstitutionTable from "../../../components/Institution/InstitutionTable";

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
            Institutions List
          </Typography>
          <InstitutionTable handleClickOpen={handleClickOpen} />
          {/* <InstitutionFormDialog open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} /> */}
        </Box>
      </div>
    </>
  );
}

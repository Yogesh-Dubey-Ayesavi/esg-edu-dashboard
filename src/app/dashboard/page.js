"use client";

import LineChart from "../../components/charts/LineChart";
import DonutChart from "../../components/charts/DonutChart";
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";

const page = () => {
  const [reRender, setReRender] = useState(false);


  return (
    <>
      <div>
      <Typography
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            "@media (maxWidth:600px)": {
              fontSize: "0.5rem",
            },
            marginBottom: "1em",
          }}
        >
          Overview
        </Typography>
        <Button
          color="inherit"
          size="small"
          startIcon={<SyncIcon />}
          style={{ color: "grey" }}
          onClick={() => {
            setReRender((prev) => !prev);
          }}
        >
          Sync
        </Button>
      </div>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          alignItems: "flex-end",
          flexDirection: "row",
          "@media (maxWidth: 1130px)": {
            flexDirection: "column",
            alignItems: "flex-start",
          },
        }}
      >
        <LineChart
          sx={{
            height: "100%",
            width: "60%",
            "@media (maxWidth: 1130px)": {
              width: "100%",
            },
          }}
          reRender={reRender}
        />
        <DonutChart
          sx={{
            height: "100%",
            "@media (maxWidth: 1130px)": {
              width: "100%",
            },
          }}
          reRender={reRender}
        />
      </Box>
    </>);
};

export default page;

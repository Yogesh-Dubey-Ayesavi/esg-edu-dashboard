"use client";

import LineChart from "../../components/charts/LineChart";
import DonutChart from "../../components/charts/DonutChart";
import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";
import SalesChart from "@/components/charts/SalesChart";

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
          Sync All
        </Button>
      </div>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          alignItems: "flex-end",
          flexDirection: "row",
          "@media (max-width: 1130px)": {
            flexDirection: "column",
            alignItems: "flex-start",
          },
          marginBottom: "20px",
        }}
      >
        <LineChart
          sx={{
            height: "100%",
            width: "70%",
            "@media (max-width: 1130px)": {
              width: "100%",
            },
          }}
          reRender={reRender}
        />
        <DonutChart
          sx={{
            height: "100%",
            // "@media (maxWidth: 1130px)": {
            //   // width: "100%",
            // },
          }}
          reRender={reRender}
        />
      </Box>
      <SalesChart
        reRender={reRender}
        // chartSeries={[
        //   {
        //     name: "This year",
        //     data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
        //   },
        // ]}
        sx={{ height: "100%", width: "100%" }}
      />
    </>
  );
};

export default page;

/* <SalesChart
        chartSeries={[
          {
            name: "This year",
            data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
          },
        ]}
        sx={{ height: "100%", width: "70%" }}
/> */

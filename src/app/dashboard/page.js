"use client";

import LineChart from "../../components/charts/LineChart";
import DonutChart from "../../components/charts/DonutChart";
import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import SyncIcon from "@mui/icons-material/Sync";

const page = () => {
  const [reRender, setReRender] = useState(false);

  return (
    <>
      <div>
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

{
  /* <SalesChart
        chartSeries={[
          {
            name: "This year",
            data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
          },
        ]}
        sx={{ height: "100%", width: "70%" }}
      /> */
}

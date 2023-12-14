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
          "@media (max-width: 1130px)": {
            flexDirection: "column",
            alignItems: "flex-start",
          },
        }}
      >
        <LineChart
          sx={{
            height: "100%",
            width: "60%",
            "@media (max-width: 1130px)": {
              width: "100%",
            },
          }}
          reRender={reRender}
        />
        <DonutChart
          sx={{
            height: "100%",
            "@media (max-width: 1130px)": {
              width: "100%",
            },
          }}
          reRender={reRender}
        />
      </Box>
    </>
=======
import React, { useLayoutEffect, useState } from "react";
import { LineChart, DonutChart } from "@tremor/react";
import ESG from "@/lib/esg-helper";

let views = [
  { date: "Jan 01", views: 100 },
  { date: "Feb 01", views: 200 },
  { date: "Mar 01", views: 300 },
  { date: "Apr 01", views: 250 },
  { date: "May 01", views: 325 },
];

const page = () => {
  const [viewData, setViewData] = useState([]);
  // useLayoutEffect(() => {
  //   const fetchData = async () => {
  //     const data = await ESG.getViewsByDate();
  //     setViewData(data);
  //     views = [...data]
  //   };
  //   fetchData();
  // }, [])
  return (
    <div className="h-[95vh] bg-violet-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-center">Dashboard Overview</h1>
      <LineChart
        data={views}
        className="my-6"
        index="date"
        categories={["views"]}
        color="blue"
        yAxisWidth={30}
      />
      <DonutChart
        data={views}
        colors={["blue", "green", "red", "yellow", "amber"]}
        index="date"
        category="views"
        className="my-10"
      />
    </div>
 );
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

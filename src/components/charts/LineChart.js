"use client";

import React, { useState, useEffect } from "react";
// import { EsgSDK } from "esg-sdk";
import ESG from "@/lib/esg-helper";
import Chart from "react-apexcharts";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";



const Page = ({ sx, reRender }) => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [],
      },
      //   colors: ["#6366F1"],
    },
    series: [
      {
        name: "series-1",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await ESG.getViewsByDate();
        const data = await ESG.getViewsByDate();
        // Assuming data is an array of objects with "date" and "views" properties
        const categories = data.map((entry) =>
          new Date(entry.date).toLocaleDateString()
        );
        const views = data.map((entry) => parseInt(entry.views));

        setChartData({
          options: {
            chart: {
              id: "basic-bar",
            },
            xaxis: {
              categories: categories,
            },
            colors: ["#6366F1"],
          },
          series: [
            {
              name: "Views",
              data: views,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [reRender]);

  return (
    <Card sx={sx}>
      <CardHeader
        title={
          <p style={{ fontWeight: "bold", fontSize: "15px" }}>Page Views</p>
        }
      />
      <CardContent>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="line"
          width="100%"
          height="300"
        />
      </CardContent>
    </Card>
  );
};

export default Page;

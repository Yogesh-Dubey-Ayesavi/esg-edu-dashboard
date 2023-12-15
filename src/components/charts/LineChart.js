"use client";

import React, { useState, useEffect } from "react";
import ESG from "@/lib/esg-helper";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Card, CardContent, CardHeader } from "@mui/material";

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
        name: "",
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

        const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));

        const categories = sortedData.map((entry) => new Date(entry.date).toLocaleDateString());
        const views = sortedData.map((entry) => parseInt(entry.views));

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
      <CardHeader title={<p style={{ fontWeight: "bold", fontSize: "15px" }}>Date Views</p>} />
      <CardContent>
        <Chart options={chartData.options} series={chartData.series} type="line" width="100%" height="300" />
      </CardContent>
    </Card>
  );
};

export default Page;

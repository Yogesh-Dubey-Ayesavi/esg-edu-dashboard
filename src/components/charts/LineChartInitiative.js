"use client";

import React, { useState, useEffect } from "react";
import ESG from "@/lib/esg-helper";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { Card, CardContent, CardHeader } from "@mui/material";

// ... (imports remain unchanged)

const Page = ({ sx, reRender }) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [], // To be updated with month names
      },
      colors: ["#6366F1"],
    },
    series: [
      {
        name: "Initiatives",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the backend
        const data = await ESG.getPerMonthIntiativeCountByYear(2023);
        // console.log(data);

        // Extract months and initiative counts from the received data
        const categories = data.map((entry) => monthNames[entry.month - 1]); // Adjust for 0-based index
        const initiativeCounts = data.map((entry) => entry.initiative_count);

        // Update chart data
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
              name: "Initiatives",
              data: initiativeCounts,
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
      <CardHeader title={<p style={{ fontWeight: "bold", fontSize: "15px" }}>Initiatives Per Month of 2023</p>} />
      <CardContent>
        <Chart options={chartData.options} series={chartData.series} type="line" width="100%" height="300" />
      </CardContent>
    </Card>
  );
};

export default Page;

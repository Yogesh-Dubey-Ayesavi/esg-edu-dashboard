"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Chart } from "./chart";
import ESG from "@/lib/esg-helper";

const Page = ({ sx, reRender }) => {
  const [chartData, setChartData] = useState({
    series: [],
    labels: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ESG.getInitiativeCountByLocation();

        // Extract location names and total initiative counts from the received data
        const locations = data.map((entry) => entry.location_name);
        const initiativeCounts = data.map((entry) => entry.total_initiative_count);

        // Update chart data
        setChartData({
          series: initiativeCounts,
          labels: locations,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [reRender]);

  return (
    <Card sx={sx}>
      <CardHeader title={<p style={{ fontWeight: "bold", fontSize: "15px" }}>Initiative Count By Location</p>} />
      <CardContent>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Chart
            options={{
              labels: chartData.labels,
              responsive: [
                {
                  breakpoint: 1130, // width at which the chart becomes responsive
                  options: {
                    chart: {
                      width: "100%",
                      height: "",
                    },
                  },
                },
              ],
              legend: {
                show: false,
              },
            }}
            series={chartData.series}
            type="donut"
            width="410"
            height=""
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;

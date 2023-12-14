"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Chart } from "./chart";
import { EsgSDK } from "esg-sdk";

const ESG = EsgSDK.initialize(process.env.NEXT_PUBLIC_SDKAPI);

const Page = ({ sx, reRender }) => {
  const [chartData, setChartData] = useState({
    series: [],
    labels: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ESG.getViewsByCityAndPage();
        // console.log(data);
        const uniqueEntries = Array.from(new Set(data.map((entry) => entry.city_name + " | " + entry.page_name)));
        const seriesData = uniqueEntries.map((uniqueEntry) => {
          const viewsSum = data.filter((entry) => entry.city_name + " | " + entry.page_name === uniqueEntry).reduce((sum, entry) => sum + parseInt(entry.views), 0);
          return viewsSum;
        });

        setChartData({
          series: seriesData,
          labels: uniqueEntries,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [reRender]);

  // console.log("Options:", chartData.labels);
  // console.log("Series:", chartData.series);

  return (
    <Card sx={sx}>
      <CardHeader title={<p style={{ fontWeight: "bold", fontSize: "15px" }}>Traffic Source</p>} />
      <CardContent>
        <Chart
          options={{
            labels: chartData.labels,
            responsive: [
              {
                breakpoint: 768, // width at which the chart becomes responsive
                options: {
                  chart: {
                    width: "100%",
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
      </CardContent>
    </Card>
  );
};

export default Page;

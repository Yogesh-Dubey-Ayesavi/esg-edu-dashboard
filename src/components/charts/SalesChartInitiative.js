"use client";

// import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
// import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import ESG from "@/lib/esg-helper";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { Chart } from "./chart";

const useChartOptions = (categories) => {
  const theme = useTheme();

  return {
    zoom: {
      enabled: true,
      type: "x",
      autoScaleYaxis: false,
      zoomedArea: {
        fill: {
          color: "#90CAF9",
          opacity: 0.4,
        },
        stroke: {
          color: "#0D47A1",
          opacity: 0.4,
          width: 1,
        },
      },
    },
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: ["#6366F1"],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: "solid",
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: true,
    },
    plotOptions: {
      bar: {
        columnWidth: "40px",
      },
    },
    stroke: {
      colors: ["transparent"],
      show: true,
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      categories: categories,
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => (value > 0 ? `${value}` : `${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
  };
};

const SalesChart = (props) => {
  const { reRender } = props;

  const [chartData, setChartData] = useState({
    categories: [],
    views: [],
  });

  const chartOptions = useChartOptions(chartData.categories);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ESG.getPerYearCreatedClosedInitiatives();
        
        console.log(data);
        // const categories = data.map((entry) => {
        //   const parts = entry.page_name.split("|");
        //   return parts[0].trim();
        // });
        // const views = data.map((entry) => parseInt(entry.views));

        // setChartData({
        //   categories: categories,
        //   views: views,
        // });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [reRender]);

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Initiatives Created and Closed Per Year
          </Typography>
        }
      />
      <CardContent>
        <Chart height={350} options={chartOptions} series={[{ data: chartData.views, name: "Views" }]} type="bar" width="100%" />
      </CardContent>
    </Card>
  );
};

export default SalesChart;

"use client";
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

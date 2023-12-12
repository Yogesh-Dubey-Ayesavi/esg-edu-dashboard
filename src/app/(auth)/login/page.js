"use client";

import React from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { FaGoogle } from "react-icons/fa";

const page = () => {
  const handleClick = () => {
    console.log("handleClick");
  };

  return (
    <div className="h-[95vh] bg-black/20 py-[12.5vh] flex">
      <div className="w-[50%]">
        <h1 className="text-center text-4xl my-10 font-bold">
          Welcome to ESG Edu!
        </h1>
        <Card className="flex flex-col justify-center items-start w-[80%] text-center mx-auto h-[40vh] p-8 border-2 border-black/25 bg-white/50 drop-shadow-2xl">
          <CardTitle>Login to ESG Edu</CardTitle>
          <p className="text-gray-500 mt-3 text-left">
            ESG Edu is a solution for Jharkhand Government.
          </p>
          <p className="text-gray-500 mb-3 text-left">
            Login to get access to the management dashboard.
          </p>
          <CardContent className="my-5 px-0">
            <button
              className="flex justify-between w-full border-2 border-black/25 font-bold rounded-lg py-2 px-8 bg-violet-400 hover:bg-violet-500 transition-colors ease-linear"
              onClick={handleClick}
            >
              <FaGoogle className="translate-y-1 mr-2" />
              Sign-In
            </button>
          </CardContent>
        </Card>
      </div>
      <div className="w-[50%] border-2 border-violet-500/50 mr-10">
        {" "}
        image here{" "}
      </div>
    </div>
  );
};

export default page;

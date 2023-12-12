"use client";

import React from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { FaGoogle } from "react-icons/fa";

const page = () => {
  const handleClick = () => {
    console.log("handleClick");
  };

  return (
    <div className="h-[95vh] bg-black/20 py-[12.5vh]">
    <h1 className="text-center text-4xl my-3 font-bold">Welcome to ESG Edu!</h1>
      <Card className=" flex flex-col justify-center items-center w-[40%] text-center mx-auto h-[40vh] p-4 border-2 border-black/25 bg-white/50 drop-shadow-2xl">
        <CardTitle>Sign-In with Google</CardTitle>
        <CardContent className="my-5 mx-3">
          <button
            className="flex justify-between border-2 mx-1 border-black/25 font-bold rounded-lg py-2 px-3 bg-violet-400 hover:bg-violet-500 transition-colors ease-linear"
            onClick={handleClick}
          >
            <FaGoogle className="translate-y-1 mr-3" />
            Sign-In
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;

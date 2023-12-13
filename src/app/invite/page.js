"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@mui/material";

const AccessDenied = () => {
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full ">
      <div className="bg-gray-200 rounded-full h-16 w-16"></div>
      <h1 className="text-4xl font-bold mt-7 mb-4">ESG Edu Admin</h1>
      <h1 className="text-3xl mb-7">Wants to collaborate on this forum</h1>
      <p className="text-2xl">
        Accept the invite to become a collaborator on the forum.
      </p>
      <p className="text-2xl">token: {searchParams.get("token")}</p>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#6366F1",
          padding: "8px 20px",
          borderRadius: "12px",
          textTransform: "none",
          fontWeight: "600",
          marginTop: "16px",
        }}
      >
        <Link href="/dashboard">Accept Invitation</Link>
      </Button>
    </div>
  );
};

export default AccessDenied;

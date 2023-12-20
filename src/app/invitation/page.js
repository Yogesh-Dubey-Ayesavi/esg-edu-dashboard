"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import ESG from "@/lib/esg-helper";

const AccessDenied = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const role = searchParams.get("role");

  const handleAccept = async () => {
    toast.promise(ESG.acceptInvitation(token), {
      loading: "Accepting Invitation",
      success: "Invitation Accepted",
      error: "An Error occured while joining the board.",
    });
    return redireect("/");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full ">
      <h1 className="text-4xl font-bold mt-7 mb-4">ESG Edu Admin</h1>
      <h1 className="text-3xl mb-7">Wants to collaborate on this forum</h1>
      <p className="text-2xl">Accept the invite to become a collaborator on the forum.</p>
      <p className="text-2xl">token: {token}</p>
      <p className="text-2xl">role: {role}</p>
      <Button
        variant="outlined"
        style={{
          backgroundColor: "#6366F1",
          color: "white",
          padding: "8px 20px",
          borderRadius: "12px",
          textTransform: "none",
          fontWeight: "600",
          marginTop: "16px",
        }}
        onClick={handleAccept}
      >
        <Link href="/dashboard">Accept Invitation</Link>
      </Button>
    </div>
  );
};

export default AccessDenied;

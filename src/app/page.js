"use client";

import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // router.push("/dashboard");
  }, []);

  return (
    <Box sx={{ display: "flex", alignItem: "center", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
}

"use client";

import { Box, Button, Link, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Google from "../../../lottie/google.json";
import Lottie from "lottie-react";
import LoginTooltip from "../../../components/LoginTooltip";

import ESG from "@/lib/esg-helper";

const Page = () => {
  const router = useRouter();

  const handleSkip = useCallback(() => {
    router.push("/dashboard");
  }, [router]);

  const handleClick = () => {
    ESG.signIn((a, b) => {
      console.log(a, b);
    });
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Login
              </Typography>
              <span color="grey">
                If you are signing in for the first time, you will be redirected to the ESG self-assessment.
                <span>
                  <LoginTooltip />
                </span>
              </span>
            </Stack>
            <Lottie animationData={Google} style={{ height: "200px", margin: "30px 0px" }} />
            <button
              className="flex justify-center items-center w-full font-bold rounded-lg py-2 px-8   transition-colors ease-linear text-white border-0"
              style={{ backgroundColor: "#6366F1", transition: "background-color 0.3s ease" }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#7C83F4")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#6366F1")}
              onClick={handleClick}
            >
              <FaGoogle className="mr-2" />
              Sign In with Google
            </button>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Page;

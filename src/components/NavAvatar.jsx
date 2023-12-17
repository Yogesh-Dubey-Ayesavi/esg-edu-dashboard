"use client";

import { Avatar, Box, CircularProgress } from "@mui/material";
import { usePopover } from "../hooks/use-popover";
import { AccountPopover } from "./account-popover";
import { useEffect, useState } from "react";
import ESG from "@/lib/esg-helper";

export const NavAvatar = (props) => {
  const accountPopover = usePopover();
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await ESG.getUserInfo();
      // console.log(data);
      setUserData({
        avatarUrl: data.user_metadata.avatar_url,
        name: data.user_metadata.full_name,
      });
    };

    fetchData();
  }, []);

  return (
    <>
      {userData ? (
        <>
          <Avatar
            onClick={accountPopover.handleOpen}
            ref={accountPopover.anchorRef}
            sx={{
              cursor: "pointer",
              height: 40,
              width: 40,
            }}
            src={userData?.avatarUrl}
          />

          <AccountPopover name={userData?.name} anchorEl={accountPopover.anchorRef.current} open={accountPopover.open} onClose={accountPopover.handleClose} />
        </>
      ) : (
        <Box sx={{ display: "flex", color: "#6366f1" }}>
          <CircularProgress color="inherit" size="1.8rem" />
        </Box>
      )}
    </>
  );
};

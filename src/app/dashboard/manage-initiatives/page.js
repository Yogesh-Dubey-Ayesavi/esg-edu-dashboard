"use client";

import {
  EnvironmentInitiative,
  SocialInitiative,
  GovernanceInitiative,
} from "@/components/ESGTabs/index";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Search } from "@/components/Search";
import { Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useRouter } from "next/navigation";
import Link from "next/link";

const tabStyle = {
  fontWeight: "600 !important",
  fontSize: "17px !important",
  borderBottom: "none !important",
  textTransform: "none !important",
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ display: "flex", justifyContent: "left" }}>{children}</Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabsDemo() {
  const [value, setValue] = useState(0);
  const urls = ["environment", "social", "governance"];
  const router = useRouter();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box>
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            "@media (maxWidth:600px)": {
              fontSize: "0.5rem",
            },
            marginBottom: "1em",
          }}
        >
          Overview
        </Typography>

        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="scrollable force tabs example"
          TabIndicatorProps={{
            style: {
              // display: "none",
              borderBottom: "none !important",
            },
          }}
          sx={{
            "& .Mui-selected": {
              color: "#6366F1 !important", // Selected tab text color
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#6366F1", // Indicator color
            },
          }}
        >
          <Tab sx={tabStyle} label="Environmental" {...a11yProps(0)} />
          <Tab sx={tabStyle} label="Social" {...a11yProps(1)} />
          <Tab sx={tabStyle} label="Governance" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <Box width="800px">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Search placeholder={"Search file.."} />
          <Button
            variant="contained"
            startIcon={<AddOutlinedIcon />}
            style={{
              backgroundColor: "#6366F1",
              padding: "8px 20px",
              borderRadius: "11px",
              textTransform: "none",
              fontWeight: "600",
            }}
            size="large"
            onClick={() => {
              router.push(`/${urls[value]}`);
            }}
          >
            <Link href={`${value}`}>Add</Link>
          </Button>
        </Box>

        <Box>
          <CustomTabPanel value={value} index={0}>
            <EnvironmentInitiative />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <SocialInitiative />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <GovernanceInitiative />
          </CustomTabPanel>
        </Box>
      </Box>
    </>
  );
}

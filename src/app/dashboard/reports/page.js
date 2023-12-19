"use client";

import ReportsPage from "@/components/Reports/ReportsPage";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const tabStyle = {
  fontWeight: "600 !important",
  fontSize: "17px !important",
  borderBottom: "none !important",
  textTransform: "none !important",
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ display: "flex", justifyContent: "left" }}>{children}</Box>}
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
          Reports
        </Typography>

        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="scrollable force tabs example"
          TabIndicatorProps={{
            style: {
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

      <Box>
        <Box>
          <CustomTabPanel value={value} index={0}>
            <ReportsPage type="environment" />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ReportsPage type="social" />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <ReportsPage type="governance" />
          </CustomTabPanel>
        </Box>
      </Box>
    </>
  );
}

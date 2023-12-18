"use client";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";
import { Search } from "@/components/Search";
import { Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useRouter } from "next/navigation";
import ESGTable from "@/components/ESGTabs/ESGTable";
import GetAppIcon from "@mui/icons-material/GetApp";

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
  const exportRef = useRef();

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
          Manage Initiatives
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
            <ESGTable type="environment" exportRef={exportRef} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <ESGTable type="social" exportRef={exportRef} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <ESGTable type="governance" exportRef={exportRef} />
          </CustomTabPanel>
        </Box>
      </Box>
    </>
  );
}

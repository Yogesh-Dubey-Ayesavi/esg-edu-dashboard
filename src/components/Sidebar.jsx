"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import HttpsIcon from "@mui/icons-material/Https";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import UnfoldLessOutlinedIcon from "@mui/icons-material/UnfoldLessOutlined";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/theme"; // Import the created theme
import Link from "next/link";
import { NavAvatar } from "./NavAvatar";
import { Logo } from "./logo";
import { SvgIcon } from "@mui/material";

import loggedIn from "@/lib/is-logged-in";

const drawerWidth = 280;

const isLoggedIn = async () => {
  return await loggedIn();
};
const tabs = [
  "Overview",
  "Manage Initiatives",
  "Administrators",
  "Settings",
  `${!isLoggedIn ? "Login" : "Logout"}`,
];

const tab_urls = [
  "/dashboard",
  "/dashboard/manage-initiatives",
  "/dashboard/admins",
  "/dashboard/settings",
  `${!isLoggedIn ? "/login" : "/logout"}`,
];

const iconStyle = {
  color: "white",
  marginRight: "10px",
};

function Sidebar(props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  const drawer = (
    <div
      style={{ backgroundColor: "#1c2536", height: "130vh", color: "white" }}
    >
      <Box>
        <Box sx={{ p: 3 }}>
          <Box
            href="/"
            sx={{
              display: "inline-flex",
              height: 32,
              width: 32,
            }}
          >
            <Logo />
          </Box>
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderRadius: 2,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              p: "12px",
            }}
          >
            <div>
              <Typography color="inherit" style={{ fontWeight: "600" }}>
                EsgEdu
              </Typography>
              <Typography color="grey" variant="body2" style={{}}>
                Production
              </Typography>
            </div>
            <SvgIcon fontSize="small" sx={{ color: "neutral.500" }}>
              <UnfoldLessOutlinedIcon />
            </SvgIcon>
          </Box>
        </Box>
      </Box>
      <Divider
        style={{
          backgroundColor: "#252e3e",
          height: "2px",
          marginBottom: "30px",
        }}
      />
      <List style={{ padding: "24px 16px" }}>
        {tabs.map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            style={{
              backgroundColor:
                selectedTab === index ? "#252e3e" : "transparent",
              borderRadius: "10px",
              marginBottom: "5px",
            }}
          >
            <Link style={{ width: "100%" }} href={tab_urls[index]}>
              <ListItemButton
                onClick={() => handleTabClick(index)}
                sx={{
                  borderRadius: "10px",
                }}
              >
                {index === 0 && (
                  <DashboardIcon
                    style={{
                      ...iconStyle,
                      color: selectedTab === index ? "#6366f1" : "#959ca6",
                    }}
                  />
                )}
                {index === 1 && (
                  <ManageSearchIcon
                    style={{
                      ...iconStyle,
                      color: selectedTab === index ? "#6366f1" : "#959ca6",
                    }}
                  />
                )}
                {index === 2 && (
                  <PeopleAltIcon
                    style={{
                      ...iconStyle,
                      color: selectedTab === index ? "#6366f1" : "#959ca6",
                    }}
                  />
                )}
                {index === 3 && (
                  <SettingsIcon
                    style={{
                      ...iconStyle,
                      color: selectedTab === index ? "#6366f1" : "#959ca6",
                    }}
                  />
                )}
                {!isLoggedIn && index === 4 && (
                  <HttpsIcon
                    style={{
                      ...iconStyle,
                      color: selectedTab === index ? "#6366f1" : "#959ca6",
                    }}
                  />
                )}
                {isLoggedIn && index === 4 && (
                  <LogoutIcon
                    style={{
                      ...iconStyle,
                      color: selectedTab === index ? "#6366f1" : "#959ca6",
                    }}
                  />
                )}
                <Typography
                  sx={{
                    fontWeight: selectedTab === index ? "bold" : "normal",
                    fontSize: "14px",
                    color: selectedTab === index ? "white" : "#959ca6",
                  }}
                >
                  {text}
                </Typography>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider
        style={{ backgroundColor: "#252e3e", height: "2px", marginTop: "30px" }}
      />
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            color: "grey",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(20px)",
          }}
          elevation={0}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              "@media(maxWidth: 600px)": {
                justifyContent: "space-between",
              },
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <NavAvatar />
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <div style={{ marginTop: "70px" }}>{children}</div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

Sidebar.propTypes = {
  window: PropTypes.func,
};

export default Sidebar;

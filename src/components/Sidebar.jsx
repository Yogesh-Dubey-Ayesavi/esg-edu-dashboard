"use client";

import DashboardIcon from "@mui/icons-material/Dashboard";
import HttpsIcon from "@mui/icons-material/Https";
import LaunchIcon from "@mui/icons-material/Launch";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import UnfoldLessOutlinedIcon from "@mui/icons-material/UnfoldLessOutlined";
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
import { usePathname } from "next/navigation";
import * as React from "react";
import WhatsNewPanel from "./WhatsNewPanel";

import { Button, SvgIcon } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import theme from "../theme/theme"; // Import the created theme
import { NavAvatar } from "./NavAvatar";
import { Logo } from "./logo";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

// import loggedIn from "@/lib/is-logged-in";

const drawerWidth = 280;

// const isLoggedIn = async () => {
//   return await loggedIn();
// };

const tabs = ["Overview", "Manage Initiatives", "Administrators", "Institutions", "Question Context", "Settings"];

const tab_urls = ["/dashboard", "/dashboard/manage-initiatives", "/dashboard/admins", "/dashboard/institutions", "/dashboard/questions", "/dashboard/settings"];

const iconStyle = {
  color: "white",
  marginRight: "10px",
};

function Sidebar(props) {
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState("");
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  const path = usePathname();

  React.useEffect(() => {
    function startsWithCategory(str) {
      const categories = ["/environment", "/social", "/governance"];
      return categories.some((category) => str.startsWith(category));
    }

    if (startsWithCategory(path)) {
      setSelectedTab(1);
      return;
    }

    const getCurrentTab = () => {
      const currentUrl = path;
      const tabIndex = tab_urls.findIndex((url) => url === currentUrl);
      return tabIndex !== -1 ? tabIndex : selectedTab;
    };

    setSelectedTab(getCurrentTab());
  }, [path, selectedTab]);

  const drawer = (
    <div style={{ backgroundColor: "#1c2536", height: "130vh", color: "white" }}>
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
        }}
      />
      <List style={{ padding: "24px 16px" }}>
        {tabs.map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            style={{
              backgroundColor: selectedTab === index ? "#252e3e" : "transparent",
              borderRadius: "10px",
              marginBottom: "5px",
            }}
          >
            <Link style={{ width: "100%", textDecoration: "none" }} href={tab_urls[index]}>
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
                  <AccountBalanceIcon
                    style={{
                      ...iconStyle,
                      color: selectedTab === index ? "#6366f1" : "#959ca6",
                    }}
                  />
                )}
                {index === 4 && (
                  <HistoryEduIcon
                    style={{
                      ...iconStyle,
                      color: selectedTab === index ? "#6366f1" : "#959ca6",
                    }}
                  />
                )}
                {index === 5 && (
                  <SettingsIcon
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
      <Divider style={{ backgroundColor: "#252e3e", height: "2px" }} />
      <Box
        sx={{
          px: 2,
          py: 3,
        }}
      >
        <Typography color="neutral.100" variant="subtitle2">
          Need more features?
        </Typography>
        <Box
          sx={{
            display: "flex",
            mt: 2,
            mx: "auto",
            width: "160px",
            "& img": {
              width: "100%",
            },
          }}
        >
          <img alt="" src="/assets/dashboard.png" />
        </Box>
        <Button
          component="a"
          style={{
            backgroundColor: "#6366f1",
            borderRadius: "20px",
            textTransform: "none",
            fontWeight: "600",
          }}
          endIcon={<LaunchIcon />}
          fullWidth
          href="https://github.com/Yogesh-Dubey-Ayesavi"
          sx={{ mt: 2 }}
          target="_blank"
          variant="contained"
        >
          Checkout our github
        </Button>
      </Box>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : null;

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
              "@media(max-width: 600px)": {
                justifyContent: "space-between",
              },
            }}
          >
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
              <MenuIcon />
            </IconButton>

            <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
              <Box
                sx={{ color: "#5a5a5a", position: "relative", padding: "10px", paddingTop: "14px", cursor: "pointer", textDecoration: "none" }}
                onClick={() => {
                  setOpenDrawer((prev) => !prev);
                }}
              >
                <NotificationsIcon style={{ color: "black" }}></NotificationsIcon>
                <span style={{ position: "absolute", top: "12px", right: "5px" }}>
                  <div
                    style={{
                      width: "15px",
                      height: "15px",
                      backgroundColor: "#6366f1",
                      borderRadius: "50%",
                      border: "3px solid white",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  ></div>
                </span>
              </Box>
              <WhatsNewPanel openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
              <NavAvatar style={{ marginLeft: "5px" }} />
            </div>
          </Toolbar>
        </AppBar>
        <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
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

export default Sidebar;

import NextLink from "next/link";
import { Box, Typography, Grid } from "@mui/material";
import { Logo } from "../../../components/logo";
import WithAuth from "@/components/WithAuth";

// TODO: Change subtitle text

export default function RootLayout({ children }) {
  return (
    <WithAuth>
      <Box
        component="main"
        sx={{
          display: "flex",
          flex: "1 1 auto",
          height: "100vh",
        }}
      >
        <Grid container sx={{ flex: "1 1 auto" }}>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              backgroundColor: "background.paper",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Box
              component="header"
              sx={{
                left: 0,
                p: 3,
                position: "fixed",
                top: 0,
                width: "100%",
              }}
            >
              <Box
                component={NextLink}
                href="/"
                sx={{
                  display: "inline-flex",
                  height: 32,
                  width: 32,
                }}
              >
                <Logo />
              </Box>
            </Box>
            {children}
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              alignItems: "center",
              background:
                "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
              color: "white",
              display: "flex",
              justifyContent: "center",
              "& img": {
                maxWidth: "100%",
              },
            }}
          >
            <Box sx={{ p: 3 }}>
              <Typography
                align="center"
                color="inherit"
                sx={{
                  fontSize: "24px",
                  lineHeight: "32px",
                  mb: 1,
                }}
                variant="h1"
              >
                Welcome to{" "}
                <Box component="a" sx={{ color: "#15B79E" }} target="_blank">
                  ESG Edu
                </Box>
              </Typography>
              <Typography align="center" sx={{ mb: 3, ml: 10, mr: 10 }} variant="subtitle1">
                Developing a collaborative ESG platform for higher education,
                focusing on sustainability, energy efficiency, and dynamic
                dashboards for progress monitoring.
              </Typography>
              <img alt="" src="/assets/auth-illustration.svg" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </WithAuth>
  );
}

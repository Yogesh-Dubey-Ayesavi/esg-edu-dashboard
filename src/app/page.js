"use client";

import SalesChart from "@/components/charts/SalesChart";
import { ActiveProjects } from "@/components/overview/active-projects";
import { Completed } from "@/components/overview/completed";
import { Stopped } from "@/components/overview/stopped";
import { TotalInitiatives } from "@/components/overview/total-initiatives";
import SyncIcon from "@mui/icons-material/Sync";
import { Box, Button, Container, Grid } from "@mui/material";
import { useState } from "react";
import DonutChart from "@/components/charts/DonutChart";
import LineChart from "@/components/charts/LineChart";

const page = () => {
  const [reRender, setReRender] = useState(false);

  return (
    <>
      <div>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              <Grid xs={12} sm={6} lg={3}>
                <TotalInitiatives difference={12} positive sx={{ height: "100%" }} value="22.65k" />
              </Grid>
              <Grid xs={12} sm={6} lg={3}>
                <ActiveProjects difference={16} positive={false} sx={{ height: "100%" }} value="15.6k" />
              </Grid>
              <Grid xs={12} sm={6} lg={3}>
                <Completed sx={{ height: "100%" }} value={5.2} />
              </Grid>
              <Grid xs={12} sm={6} lg={3}>
                <Stopped sx={{ height: "100%" }} value="102" />
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Button
          color="inherit"
          size="small"
          startIcon={<SyncIcon />}
          style={{ color: "grey" }}
          onClick={() => {
            setReRender((prev) => !prev);
          }}
        >
          Sync All
        </Button>
      </div>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          alignItems: "flex-end",
          flexDirection: "row",
          "@media (max-width: 1130px)": {
            flexDirection: "column",
            alignItems: "flex-start",
          },
          marginBottom: "20px",
        }}
      >
        <LineChart
          sx={{
            height: "100%",
            width: "70%",
            "@media (max-width: 1130px)": {
              width: "100%",
            },
          }}
          reRender={reRender}
        />
        <DonutChart
          sx={{
            height: "100%",
          }}
          reRender={reRender}
        />
      </Box>
      <SalesChart reRender={reRender} sx={{ height: "100%", width: "100%" }} />
    </>
  );
};

export default page;

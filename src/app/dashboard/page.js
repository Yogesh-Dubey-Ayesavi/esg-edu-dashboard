"use client";

import SalesChart from "@/components/charts/SalesChart";
import { ActiveProjects } from "@/components/overview/active-projects";
import { Completed } from "@/components/overview/completed";
import { Stopped } from "@/components/overview/stopped";
import { TotalInitiatives } from "@/components/overview/total-initiatives";
import SyncIcon from "@mui/icons-material/Sync";
import { Box, Button, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import DonutChart from "../../components/charts/DonutChart";
import LineChart from "../../components/charts/LineChart";
import ESG from "@/lib/esg-helper";

const page = () => {
  const [reRender, setReRender] = useState(false);
  const [values, setValues] = useState({
    totalCount: 0,
    prevYearCount: 0,
    percentageChangeThisYear: 0,
    underGoingCurrentMonth: 0,
    underGoingPrevMonth: 0,
    percentageChangeUndergoingMonth: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalInitiativesCurrentYear = await ESG.getCurrentYearTotalInitiatives();
        const totalInitiativesPrevYear = await ESG.getPrevYearTotalInitiatives();
        const currentMonthUndergoingInitiativeCounts = await ESG.getCurrentMonthUndergoingInitiativeCounts();
        const prevMonthUndergoingInitiativeCounts = await ESG.getPrevMonthUndergoingInitiativeCounts();

        const percentageChangeInMonthUndergoing = (currentMonthUndergoingInitiativeCounts / prevMonthUndergoingInitiativeCounts) * 100;
        const percentageChangeInYear = ((totalInitiativesCurrentYear - totalInitiativesPrevYear) / totalInitiativesPrevYear) * 100;

        setValues({
          totalCount: totalInitiativesCurrentYear,
          prevYearCount: totalInitiativesPrevYear,
          percentageChangeThisYear: percentageChangeInYear.toFixed(2),
          underGoingCurrentMonth: currentMonthUndergoingInitiativeCounts,
          underGoingPrevMonth: prevMonthUndergoingInitiativeCounts,
          percentageChangeUndergoingMonth: percentageChangeInMonthUndergoing.toFixed(2),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
              <Grid item xs={12} sm={6} lg={3}>
                <TotalInitiatives values={values} positive={values.percentageChangeThisYear > 0 ? true : false} sx={{ height: "100%" }} />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <ActiveProjects values={values} positive={values.percentageChangeUndergoingMonth > 0 ? true : false} sx={{ height: "100%" }} value="15.6k" />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
                <Completed sx={{ height: "100%" }} value={5.2} />
              </Grid>
              <Grid item xs={12} sm={6} lg={3}>
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

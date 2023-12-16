import { Box, Drawer, useTheme } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useMediaQuery } from "@mui/material";

const WhatsNewPanel = (props) => {
  const { openDrawer, setOpenDrawer } = props;

  const theme = useTheme();
  const isWide = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            width: isWide ? 500 : "100%",
            maxHeight: isWide ? "100vh" : "50%",
          },
        }}
        anchor={isWide ? "right" : "bottom"}
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
      >
        <Box p={2}>
          <Card sx={{ minWidth: "100%" }}>
            <CardMedia sx={{ height: 375, width: 450, backgroundSize: "cover" }} image="https://webapi.earthood.in/media/assets/earthscope/files/24e8569b-dc33-4603-b8ed-8c2f18f6470d5163e6dd-89cb-4133-ba92-b3c3_cIMTb40.png" />
            <CardContent>
              <p gutterBottom variant="h6" component="div">
                ESG reporting is about companies sharing how they handle Environmental, Social, and Governance matters, showing their impact on the planet, people, and ethical practices. It helps
                stakeholders assess a company's commitment to sustainability and responsible business conduct.
              </p>
            </CardContent>
          </Card>
        </Box>
      </Drawer>
    </>
  );
};

export default WhatsNewPanel;

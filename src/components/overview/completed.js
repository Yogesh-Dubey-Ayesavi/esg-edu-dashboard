import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Avatar, Box, Card, CardContent, LinearProgress, Stack, SvgIcon, Typography } from "@mui/material";

export const Completed = (props) => {
  const { value, sx } = props;

  return (
    <Card sx={sx} elevation={0}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" gutterBottom variant="overline" sx={{ fontWeight: "bold" }}>
              Completed
            </Typography>
            <Typography variant="h4">{value}k</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "#05CD8A",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <CheckCircleIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Box sx={{ mt: 3 }}>{/* <LinearProgress value={value} variant="determinate" /> */}</Box>
      </CardContent>
    </Card>
  );
};

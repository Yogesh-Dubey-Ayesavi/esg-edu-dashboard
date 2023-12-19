import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";

export const ActiveProjects = (props) => {
  const { positive, sx, values } = props;

  return (
    <Card sx={sx} elevation={0}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline" sx={{ fontWeight: "bold" }}>
              Active Projects
            </Typography>
            <Typography variant="h4">999</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "#FEB019",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <HourglassBottomIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {values.percentageChangeUndergoingMonth && values.underGoingPrevMonth != 0 && (
          <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
            <Stack alignItems="center" direction="row" spacing={0.5}>
              <SvgIcon color={positive ? "success" : "error"} fontSize="small">
                {positive ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
              </SvgIcon>
              <Typography color={positive ? "success.main" : "error.main"} variant="body2">
                {difference}%
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="caption">
              Since last month
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";

export const TotalInitiatives = (props) => {
  const { difference, positive = false, sx, value } = props;

  return (
    <Card sx={sx} elevation={0}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline" sx={{ fontWeight: "bold" }}>
              Total Initiatives
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "#6366f1",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <BookmarkAddedIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {difference && (
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
              Since last year
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

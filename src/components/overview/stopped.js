import PropTypes from "prop-types";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

export const Stopped = (props) => {
  const { value, sx } = props;

  return (
    <Card sx={sx} elevation={0}>
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline" sx={{ fontWeight: "bold" }}>
              Stopped
            </Typography>
            <Typography variant="h4">{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "#ff4560",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <CancelIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};
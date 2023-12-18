import { Chip } from "@mui/material";

export const Completed = ({ status }) => {
  return (
    <Chip
      label={status}
      sx={{
        color: "green",
        border: "none",
        backgroundColor: "#e3f3e3",
      }}
      variant="outlined"
    />
  );
};
export const Undergoing = ({ status }) => {
  return (
    <Chip
      label={status}
      sx={{
        color: "#b6b63d",
        border: "none",
        backgroundColor: "#f2f2dd",
      }}
      variant="outlined"
    />
  );
};
export const Neverending = ({ status }) => {
  return (
    <Chip
      label={status}
      sx={{
        color: "purple",
        border: "none",
        backgroundColor: "#ede7ed",
      }}
      variant="outlined"
    />
  );
};
export const Stopped = ({ status }) => {
  return (
    <Chip
      label={status}
      sx={{
        color: "grey",
        border: "none",
        backgroundColor: "#ffffff",
      }}
      variant="outlined"
    />
  );
};
export const Delayed = ({ status }) => {
  return (
    <Chip
      label={status}
      sx={{
        color: "red",
        border: "none",
        backgroundColor: "#f3eae3",
      }}
      variant="outlined"
    />
  );
};

import SearchIcon from "@mui/icons-material/Search";
import { Box, Card, InputAdornment, OutlinedInput, Paper, SvgIcon } from "@mui/material";

export const Search = () => {
  return (
    <Paper
      sx={{
        margin: "3rem 0",
        width: "400px",
        borderRadius: "11px",
        "@media (max-width: 600px)": {
          width: "100%",
        },
      }}
    >
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder="Search company"
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <SearchIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: "3px solid #6366f1",
              transition: "0.3s ease-in-out",
            },
          },
          "&:hover": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: "3px solid #6366f1",
              transition: "0.3s ease-in-out",
            },
          },
          borderRadius: "10px",
        }}
      />
    </Paper>
  );
};

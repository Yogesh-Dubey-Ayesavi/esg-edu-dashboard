import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

export const Search = () => {
  return (
    <Box
      sx={{
        margin: "3rem 0",
        width: "400px",
        "@media (max-width: 600px)": {
          width: "100%",
          // Styles for screens with a minimum width of 600px
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
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "3.5px solid #6366f1",
            transition: "0.3s ease-in-out",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "3.5px solid #6366f1",
            transition: "0.3s ease-in-out",
          },
          borderRadius: "10px",
        }}
      />
    </Box>
  );
};

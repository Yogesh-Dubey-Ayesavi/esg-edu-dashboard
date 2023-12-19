import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, OutlinedInput, Paper, SvgIcon } from "@mui/material";

export const Search = ({ placeholder, search, setSearch }) => {
  return (
    <Paper
      sx={{
        margin: "3rem 0",
        width: "200px",
        "@media (maxWidth: 600px)": {
          width: "100%",
        },
      }}
    >
      <OutlinedInput
        value={search}
        fullWidth
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <SearchIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{
          // "&.Mui-focused": {
          //   "& .MuiOutlinedInput-notchedOutline": {
          //     border: "3px solid #6366f1",
          //     transition: "0.3s ease-in-out",
          //   },
          // },
          // "&:hover": {
          //   "& .MuiOutlinedInput-notchedOutline": {
          //     border: "3px solid #6366f1",
          //     transition: "0.3s ease-in-out",
          //   },
          // },
        }}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </Paper>
  );
};

"use client";

import { Paper } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as React from "react";

export default function Dropdown({ filter, setFilter }) {
  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Paper sx={{ padding: 0 }}>
      <FormControl sx={{ minWidth: 120 }}>
        <Select
          value={filter}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            border: "5px",
          }}
        >
          <MenuItem value="">Initiative Name</MenuItem>
          <MenuItem value={"location"}>Location</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
}

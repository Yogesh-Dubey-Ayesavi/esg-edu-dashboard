"use client";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as React from "react";

export default function Dropdown() {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            border: "5px",
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Initiative Name</MenuItem>
          <MenuItem value={20}>Location</MenuItem>
          <MenuItem value={30}>Created By</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

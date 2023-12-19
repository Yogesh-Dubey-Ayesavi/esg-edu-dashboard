"use client";

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const InstitutionForm = ({ handleSubmit }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    city: "",
    email: "",
    phone_number: "",
    address: "",
    established_in: "",
    website: "",
    employee_size: "",
    handler_id: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormValues({
      name: "",
      city: "",
      email: "",
      phone_number: "",
      address: "",
      established_in: "",
      website: "",
      employee_size: "",
      handler_id: "",
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(formValues);
    handleReset();
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: "auto",
        gap: "30px",
      }}
      onSubmit={handleFormSubmit}
    >
      <Box style={{ display: "flex", gap: "20px" }}>
        <TextField label="Name" variant="outlined" name="name" value={formValues.name} onChange={handleInputChange} required sx={{ mt: 1 }} />
        <TextField label="City" variant="outlined" name="city" value={formValues.city} onChange={handleInputChange} required sx={{ mt: 1 }} />
      </Box>
      <Box style={{ display: "flex", gap: "20px" }}>
        <TextField label="Email" variant="outlined" name="email" type="email" value={formValues.email} onChange={handleInputChange} required sx={{ mt: 1 }} />
        <TextField
          label="Phone Number"
          variant="outlined"
          type="number"
          name="phone_number"
          value={formValues.phone_number}
          onChange={handleInputChange}
          inputProps={{ maxLength: 10 }}
          sx={{ mt: 1 }}
        />
      </Box>
      <Box style={{ display: "flex", gap: "20px" }}>
        <TextField label="Address" variant="outlined" name="address" value={formValues.address} onChange={handleInputChange} sx={{ mt: 1, width: "50%" }} />
        <TextField variant="outlined" type="date" name="established_in" value={formValues.established_in} onChange={handleInputChange} sx={{ mt: 1, width: "50%" }} />
      </Box>
      <Box style={{ display: "flex", gap: "20px" }}>
        <TextField label="Website" variant="outlined" name="website" value={formValues.website} onChange={handleInputChange} sx={{ mt: 1 }} />
        <TextField label="Employee Size" variant="outlined" type="number" name="employee_size" value={formValues.employee_size} onChange={handleInputChange} sx={{ mt: 1 }} />
      </Box>

      <Button type="submit" variant="text" sx={{ justifyContent: "flex-end", textTransform: "none", fontSize: "17px", color: "#6366F1" }}>
        Submit
      </Button>
    </Box>
  );
};

export default InstitutionForm;

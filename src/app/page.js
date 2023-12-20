"use client";

import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ESG from "@/lib/esg-helper";
import { Container, Paper, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const InstitutionForm = () => {
  const router = useRouter();

  const handleSubmit = async (formValues) => {
    const userData = await ESG.getUserInfo();
    console.log(formValues);
    try {
      const response = await ESG.supabase.from("institutions").insert({
        ...formValues,
      });
      router.push("/quiz");
      toast.success("Institution has been successfully registered.");
    } catch (e) {
      toast.error(e);
    }
  };

  useEffect(() => {
    try {
      const makeAsync = async () => {
        const role = await ESG.getRole();
        if (role === "super_admin") {
          router.push("/dashboard");
          return;
        }

        const { data, error } = await ESG.supabase.from("institutions").select();

        if (data.length != 0) {
          router.push("/quiz");
        }
      };
      makeAsync();
    } catch (e) {
      toast.error(e);
    }
  }, []);

  const [formValues, setFormValues] = useState({
    name: "",
    city: "",
    phone_number: "",
    address: "",
    established_in: "",
    website: "",
    employee_size: "",
    industry: "",
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
      phone_number: "",
      address: "",
      established_in: "",
      website: "",
      employee_size: "",
      industry: "",
    });
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "50%",
          padding: "2rem",
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          "@media(max-width: 600px)": {
            width: "100%",
          },
          borderRadius: "10px",
        }}
      >
        <Typography
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            "@media (maxWidth:600px)": {
              fontSize: "0.5rem",
            },
            marginBottom: "2rem",
            fontStyle: "Inter, sans-serif",
          }}
        >
          Institution Details
        </Typography>
        <Typography
          style={{
            fontSize: "18px",
            marginBottom: "2rem",
            fontStyle: "Inter, sans-serif",
          }}
        >
          Your company's details are crucial for our initial understanding and ESG analysis. Providing this information helps us assess your ESG practices accurately.
        </Typography>
        <Box style={{ display: "flex", gap: "20px" }}>
          <TextField fullWidth label="Name" variant="outlined" name="name" value={formValues.name} onChange={handleInputChange} required sx={{ mt: 1 }} />
          <TextField fullWidth label="City" variant="outlined" name="city" value={formValues.city} onChange={handleInputChange} required sx={{ mt: 1 }} />
        </Box>
        <Box style={{ display: "flex", gap: "20px" }}>
          <TextField fullWidth label="Website" variant="outlined" name="website" value={formValues.website} onChange={handleInputChange} sx={{ mt: 1 }} />

          <TextField
            fullWidth
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
          <TextField fullWidth label="Industry" variant="outlined" name="industry" value={formValues.industry} onChange={handleInputChange} sx={{ mt: 1 }} />
          <TextField fullWidth label="Employee Size" variant="outlined" type="number" name="employee_size" value={formValues.employee_size} onChange={handleInputChange} sx={{ mt: 1 }} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
          <Button
            onClick={() => {
              handleSubmit(formValues);
            }}
            type="submit"
            variant="contained"
            size="large"
            sx={{ backgroundColor: "#6631f1", color: "white", textTransform: "none", fontSize: "17px", borderRadius: "10px", marginTop: "20px" }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default InstitutionForm;

"use client";

import React, { useState, useEffect } from "react";
import { CircularProgress, FormControl, MenuItem, Select } from "@mui/material";
import ESG from "@/lib/esg-helper";

const ReportDropdown = ({ onSelect, selectedInstitution, setSelectedInstitution }) => {
  // const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    const getInstitutions = async () => {
      try {
        const institutionsData = await ESG.getMyInstitutionDetails();
        setInstitutions(institutionsData);
      } catch (error) {
        console.error("Error fetching institutions:", error);
      }
    };

    getInstitutions();
  }, []);

  const handleChange = (event) => {
    const selectedInstitution = event.target.value;
    setSelectedInstitution(selectedInstitution);
    onSelect(selectedInstitution);
  };

  return (
    <>
      {institutions ? (
        <FormControl sx={{ minWidth: "400px" }}>
          <Select style={{ width: "100%" }} value={selectedInstitution} onChange={handleChange} displayEmpty inputProps={{ "aria-label": "Select Institution" }}>
            <MenuItem value="" disabled>
              Select Institution
            </MenuItem>
            {institutions.map((institution) => (
              <MenuItem key={institution.id} value={institution.id}>
                {institution.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default ReportDropdown;

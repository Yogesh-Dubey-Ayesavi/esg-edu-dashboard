"use client";

import React from "react";
import { TextField, ButtonGroup, Button, Typography, Box } from "@mui/material";

const Question = ({ question, isNumeric, currentAnswer, onChange, questions, currentQuestionIndex }) => {
  return (
    <>
      <div>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "2rem" }}>
          {question}
        </Typography>
        <Typography sx={{ color: "#6d7073", marginBottom: "2rem", fontStyle: "Inter, sans-serif" }}>{questions[currentQuestionIndex].description}</Typography>

        {isNumeric ? (
          <TextField type="number" fullWidth variant="outlined" value={currentAnswer} onChange={onChange} placeholder="Type your answer" sx={{ marginBottom: "3rem" }} />
        ) : (
          <Box sx={{ marginBottom: "3rem" }}>
            <Button variant={currentAnswer === "Yes" ? "contained" : "outlined"} sx={{ marginRight: "20px" }} onClick={() => onChange("Yes")}>
              Yes
            </Button>
            <Button variant={currentAnswer === "No" ? "contained" : "outlined"}  onClick={() => onChange("No")}>
              No
            </Button>
          </Box>
        )}
      </div>
    </>
  );
};

export default Question;

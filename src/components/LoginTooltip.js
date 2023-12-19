import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const CustomWidthTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
    backgroundColor: "grey",
    color: "white",
    fontSize: "16px",
  },
});

const longText = `
ESG is a system that helps people see how well a company handles risks and opportunities linked to environmental, social, and governance aspects (ESG factors). It looks at sustainability in a broader sense, covering more than just environmental concerns. 
`;

export default function VariableWidth() {
  return (
    <CustomWidthTooltip title={longText}>
      <Button sx={{ color: "blue" }}>
        <ErrorOutlineIcon />
      </Button>
    </CustomWidthTooltip>
  );
}

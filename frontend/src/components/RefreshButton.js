import { IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import React from "react";

function RefreshButton({ onClick }) {
  return (
    <Tooltip title="Refresh">
      <IconButton color="primary" onClick={onClick}>
        <RefreshIcon />
      </IconButton>
    </Tooltip>
  );
}

export default RefreshButton;

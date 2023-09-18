import { IconButton, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import React from "react";

function RefreshButton() {
  return (
    <Tooltip title="Refresh">
      <IconButton color="primary">
        <RefreshIcon />
      </IconButton>
    </Tooltip>
  );
}

export default RefreshButton;

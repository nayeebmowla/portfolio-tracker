import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function PortfolioSelect({ accounts, account, onChange }) {
  return (
    <FormControl color="primary" fullWidth>
      <InputLabel id="select-label">Account</InputLabel>
      <Select
        size="small"
        labelId="select-label"
        id="select"
        value={account}
        label="Account"
        onChange={onChange}
      >
        {accounts.map((account) => (
          <MenuItem key={account.type} value={account.type}>
            {account.type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

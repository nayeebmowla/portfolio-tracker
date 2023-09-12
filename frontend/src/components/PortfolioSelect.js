import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function PortfolioSelect() {
  const [account, setAccount] = React.useState("");

  const handleChange = (event) => {
    setAccount(event.target.value);
  };

  return (
    <FormControl color="primary" fullWidth>
      <InputLabel id="select-label">Account</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={account}
        label="Account"
        onChange={handleChange}
      >
        <MenuItem value={"TFSA"}>TFSA</MenuItem>
        <MenuItem value={"Margin"}>Margin</MenuItem>
        <MenuItem value={"RRSP"}>RRSP</MenuItem>
      </Select>
    </FormControl>
  );
}

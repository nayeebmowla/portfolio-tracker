import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function PortfolioSelect({ accounts }) {
  const primaryAccount = accounts.find((account) => account.isPrimary === true);
  const [account, setAccount] = React.useState(primaryAccount.type);

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
        {accounts.map((account) => (
          <MenuItem key={account.type} value={account.type}>
            {account.type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

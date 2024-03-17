import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Generate from "./Generate"
import Passwords from "./Passwords"

export default () => {
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} className="bg-blue-950 text-white">
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Generate Password" />
        <Tab label="Stored Passwords" />
      </Tabs>
      {value? <Passwords />: <Generate /> }
    </Box>
  );
}


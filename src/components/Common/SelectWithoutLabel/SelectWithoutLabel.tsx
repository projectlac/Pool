import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';

export default function SelectWithoutLabel() {
  const [age, setAge] = React.useState<string>('Today');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select
        value={age}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{
          '& .MuiOutlinedInput-input': {
            background: '#e9ecef',
            padding: '13px',
            color: '#044b7e',
            fontWeight: 'bold',
            fontSize: '16px',
            alignItems: 'center',
            display: 'flex'
          },
          '& .MuiSelect-icon': {
            color: '#044b7e'
          }
        }}
      >
        <MenuItem value={'Today'}>Today</MenuItem>
        <MenuItem value={'Yesterday'}>Yesterday</MenuItem>
      </Select>
    </FormControl>
  );
}

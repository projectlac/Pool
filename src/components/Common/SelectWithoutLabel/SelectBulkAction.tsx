import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';

export default function SelectBulkAction(props) {
  const [age, setAge] = React.useState<string>('Bulk Action');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 90 }}>
      <Select
        value={age}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{
          '& .MuiOutlinedInput-input': {
            background: '#fff',
            padding: '9px 13px',
            color: '#959ca3',

            fontSize: '15px',
            alignItems: 'center',
            display: 'flex'
          },
          '& .MuiSelect-icon': {
            color: '#959ca3'
          }
        }}
      >
        <MenuItem value="Bulk Action">Bulk Action</MenuItem>
        <MenuItem value="Delete all selected">Delete all selected</MenuItem>
      </Select>
    </FormControl>
  );
}

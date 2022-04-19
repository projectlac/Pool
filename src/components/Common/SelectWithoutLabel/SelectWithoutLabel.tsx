import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';

interface PropsSelect {
  handleChangeDate: (time: string) => void;
  day: string;
}
export default function SelectWithoutLabel({
  handleChangeDate,
  day
}: PropsSelect) {
  const handleChange = (event: SelectChangeEvent) => {
    handleChangeDate(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select
        value={day}
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
        <MenuItem value={'Last 7 days'}>Last 7 days</MenuItem>
        <MenuItem value={'Last 30 days'}>Last 30 days</MenuItem>
      </Select>
    </FormControl>
  );
}

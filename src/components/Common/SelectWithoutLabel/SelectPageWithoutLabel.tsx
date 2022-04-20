import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';

export default function SelectPageWithoutLabel(props) {
  const { handleSetPage } = props;
  const [page, setPage] = React.useState<string>('1');

  const handleChange = (event: SelectChangeEvent) => {
    setPage(event.target.value);
    handleSetPage(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 75 }}>
      <Select
        value={page}
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
        <MenuItem value={'1'}>10</MenuItem>
        <MenuItem value={'2'}>20</MenuItem>
      </Select>
    </FormControl>
  );
}

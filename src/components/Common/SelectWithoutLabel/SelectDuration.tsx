import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';

interface PropsTime {
  value: Array<string>;
  defaultValue: string;
  index: number;
  title: string;
  handleTime: (index: number, title: string, quality: string) => void;
}
export default function SelectDuration({
  value,
  defaultValue,
  index,
  title,
  handleTime
}: PropsTime) {
  const [age, setAge] = React.useState<string>(defaultValue);

  React.useEffect(() => {
    setAge(defaultValue);
  }, [defaultValue]);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
    handleTime(index, title, event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 75 }}>
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
        {value &&
          value.map((d, index) => (
            <MenuItem value={d} key={index}>
              {d}s
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

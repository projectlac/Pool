import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

interface PropCustomizeCheckbox {
  listData: string[];
  defaultValue: string;
}
export default function CustomizeCheckBox({
  listData,
  defaultValue
}: PropCustomizeCheckbox) {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
        sx={{
          flexDirection: 'row',
          '& .MuiRadio-root, & .MuiFormControlLabel-label': { color: '#000' }
        }}
      >
        {listData &&
          listData.map((d, index) => (
            <FormControlLabel
              sx={{ minWidth: '250px' }}
              key={index}
              value={d}
              control={<Radio />}
              label={d}
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
}

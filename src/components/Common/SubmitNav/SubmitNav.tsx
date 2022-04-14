import { Box, Button } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
const BoxNav = styled(Box)({
  height: '65px',
  position: 'absolute',
  width: ' calc(100% - 280px)',
  marginLeft: '-24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: ' #f4f4f4',
  bottom: 0,
  padding: '0px 50px'
});
interface PropsSubmit {
  onSubmit: () => void;
}
function SubmitNav({ onSubmit }: PropsSubmit) {
  return (
    <BoxNav>
      <Button color="error">Delete</Button>
      <Box>
        <Button>Save as draft</Button>
        <Button variant="contained" type="submit" onClick={onSubmit}>
          Save
        </Button>
      </Box>
    </BoxNav>
  );
}

export default SubmitNav;
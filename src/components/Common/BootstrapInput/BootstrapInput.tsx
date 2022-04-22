import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2)
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: `1px solid ${theme.palette.primary.main}`,
    fontSize: '16px',
    width: '100%',
    height: '40px',
    padding: '7px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow'
    ]),
    '&[aria-invalid="true"]': {
      border: `1px solid ${theme.palette.error.main}`,
      '&:focus': {
        boxShadow: 'rgb(255 0 0 / 25%) 0 0 0 0.2rem',
        borderColor: theme.palette.error.main
      }
    },
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      'Open Sans',
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol'
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}));
export default BootstrapInput;

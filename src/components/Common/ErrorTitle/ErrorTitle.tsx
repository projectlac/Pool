import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
const ErrorTitle = styled(Typography)(({ theme }) => ({
  fontSize: 21,
  fontWeight: 'normal',
  marginLeft: '15px',
  color: theme.palette.error.main,
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
  ].join(',')
}));
export default ErrorTitle;

import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
const LabelInput = styled(InputLabel)(({ theme }) => ({
  fontSize: 22,
  fontWeight: 'bold',
  display: 'flex',
  color: theme.palette.primary.main,
  // Use the system font instead of the default Roboto font.
  fontFamily: [
    'farro',
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
export default LabelInput;

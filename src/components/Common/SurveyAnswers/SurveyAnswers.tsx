import { alpha, styled } from '@mui/material/styles';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  InputLabel
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import BootstrapInput from '../BootstrapInput/BootstrapInput';

const AnswerInput = styled(InputLabel)(({ theme }) => ({
  fontSize: 21,
  color: '#000',
  fontWeight: 'normal',

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

interface PropsSurveyAnswers {
  handleUptateListAnswer: (listAnswer: string[], indexQuestion) => void;
  indexQuestion: number;
}
function SurveyAnswers({
  handleUptateListAnswer,
  indexQuestion
}: PropsSurveyAnswers) {
  const [numberOfAnswer, setNumberOfAnswer] = React.useState<string>('2');
  const [listAnswer, setListAnswer] = React.useState<string[]>([
    '',
    '',
    '',
    '',
    ''
  ]);
  const handleChangeNumberOfAnswer = (event: SelectChangeEvent) => {
    setNumberOfAnswer(event.target.value);
  };

  const handleFillAnswer = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let tempAnswer = [...listAnswer];
    tempAnswer[index] = e.target.value;
    setListAnswer(tempAnswer);
    handleUptateListAnswer(tempAnswer, indexQuestion);
  };
  return (
    <div>
      <Box sx={{ mt: 3 }}>
        <Typography
          sx={{
            fontSize: '17px',
            fontWeight: 'bold',
            color: '#044b7e',
            mb: 1
          }}
        >
          Number of Answer options{' '}
          <span style={{ fontWeight: 'normal' }}>(Min. 2)</span>
        </Typography>
        <Select
          value={numberOfAnswer}
          onChange={handleChangeNumberOfAnswer}
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{
            minWidth: 75,
            '& .MuiOutlinedInput-input': {
              background: '#fff',
              padding: '13px',
              color: '#000',

              fontSize: '16px',
              alignItems: 'center',
              display: 'flex'
            },
            '& fieldset': {
              borderColor: '#ddd'
            },
            '& .MuiSelect-icon': {
              color: '#044b7e'
            }
          }}
        >
          <MenuItem value={'2'}>2</MenuItem>
          <MenuItem value={'3'}>3</MenuItem>
          <MenuItem value={'4'}>4</MenuItem>
          <MenuItem value={'5'}>5</MenuItem>
        </Select>
      </Box>
      <Box mt={3}>
        {[...Array(+numberOfAnswer)].map((d, index) => (
          <FormControl key={index} variant="standard" sx={{ width: '100%' }}>
            <AnswerInput shrink htmlFor="bootstrap-input">
              Answer #{index + 1}{' '}
              <span
                style={{
                  fontSize: '16px',
                  color: '#999',
                  fontWeight: 'normal',
                  marginLeft: '10px'
                }}
              >
                (Max. 250 characters)
              </span>
            </AnswerInput>
            <BootstrapInput
              sx={{
                '& .MuiInputBase-input': {
                  border: '1px solid #ddd',
                  background: '#fff',
                  height: '35px'
                }
              }}
              defaultValue=""
              placeholder="Fill Answer"
              id="bootstrap-input"
              onChange={(e) => {
                handleFillAnswer(
                  e as React.ChangeEvent<HTMLInputElement>,
                  index
                );
              }}
            />
          </FormControl>
        ))}
      </Box>
    </div>
  );
}

export default SurveyAnswers;

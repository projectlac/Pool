import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import CustomizeCheckBox from '../CheckBox/CustomizeCheckBox';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  }
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}));

interface PropsAccordions {
  numberOfQuestions: number;
}
export default function CustomizedAccordions({
  numberOfQuestions
}: PropsAccordions) {
  const [numberOfAnswer, setNumberOfAnswer] = React.useState<string>('2');

  const [expanded, setExpanded] = React.useState<string | false>(
    `panel${numberOfQuestions - 1}`
  );

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleChangeNumberOfAnswer = (event: SelectChangeEvent) => {
    setNumberOfAnswer(event.target.value);
  };
  return (
    <div>
      {[...Array(numberOfQuestions)].map((d, index) => (
        <Box mb={1}>
          <Accordion
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              aria-controls={`panel${index}d-content`}
              id={`panel${index}d-header`}
              sx={{
                '& .MuiAccordionSummary-expandIconWrapper': {
                  display: 'none'
                },
                '& .MuiAccordionSummary-content': {
                  justifyContent: 'space-between',
                  padding: '15px 25px 15px 0px'
                }
              }}
            >
              <Typography variant="h3">QUESTION #{index + 1}</Typography>
              <Typography variant="h3">
                {expanded !== `panel${index}` ? 'Expanded' : 'Collapse'}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box mb={3}>
                <Typography
                  sx={{
                    fontSize: '17px',
                    fontWeight: 'bold',
                    color: '#044b7e',
                    mb: 1
                  }}
                >
                  Question type:
                </Typography>
                <CustomizeCheckBox
                  listData={['Mandatory', 'Optional']}
                  defaultValue={'Optional'}
                />
              </Box>
              <Box mb={3}>
                <Typography
                  sx={{
                    fontSize: '17px',
                    fontWeight: 'bold',
                    color: '#044b7e',
                    mb: 1
                  }}
                >
                  Type of Question
                </Typography>
                <CustomizeCheckBox
                  listData={['Text', 'Image with caption']}
                  defaultValue={'Image with caption'}
                />
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography
                  sx={{
                    fontSize: '17px',
                    fontWeight: 'bold',
                    color: '#044b7e',
                    mb: 1
                  }}
                >
                  Number of Answer options (Min. 2)
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
            </AccordionDetails>
          </Accordion>
        </Box>
      ))}
    </div>
  );
}

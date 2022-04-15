import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { FormControl, Grid } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, {
  AccordionSummaryProps
} from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import * as React from 'react';
import TinyEditorQuestionMode from 'src/components/TinyEditor/TinyEditorQuestionMode';
import { ContentQuestion } from 'src/models';
import CustomizeCheckBox from '../CheckBox/CustomizeCheckBox';
import SurveyAnswers from '../SurveyAnswers/SurveyAnswers';
import UploadTableSurvey from '../Table/UploadTableSurvey';

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
  handleSetContentQuestion: (content: ContentQuestion[]) => void;
}
export default function CustomizedAccordions({
  numberOfQuestions,
  handleSetContentQuestion
}: PropsAccordions) {
  const handleGetDataFromEditor = (data: string, index: number) => {
    let tempContetQuestion = [...contentQuestion];
    tempContetQuestion[index].caption = data;
    setContentQuestion(tempContetQuestion);
    handleSetContentQuestion(tempContetQuestion);
  };

  const [expanded, setExpanded] = React.useState<string | false>(
    `panel${numberOfQuestions - 1}`
  );

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleUptateListAnswer = (listAnswer: string[], index: number) => {
    let tempContetQuestion = [...contentQuestion];
    tempContetQuestion[index].listAnswer = listAnswer;
    setContentQuestion(tempContetQuestion);
    handleSetContentQuestion(tempContetQuestion);
  };

  const handleCheckBox = (checked: string, title: string, index: number) => {
    let tempContetQuestion = [...contentQuestion];
    tempContetQuestion[index][title] = checked;
    setContentQuestion(tempContetQuestion);
    handleSetContentQuestion(tempContetQuestion);
  };

  const handleUploadFile = (file: File, index: number) => {
    let tempContetQuestion = [...contentQuestion];
    tempContetQuestion[index].file = file;
    setContentQuestion(tempContetQuestion);
    handleSetContentQuestion(tempContetQuestion);
  };
  const [contentQuestion, setContentQuestion] = React.useState<
    ContentQuestion[]
  >([
    {
      questionType: 'Optional',
      typeOfQuestion: 'Image with caption',
      caption: '',
      listAnswer: ['', '', '', '', ''],
      file: undefined
    },
    {
      questionType: 'Optional',
      typeOfQuestion: 'Image with caption',
      caption: '',
      listAnswer: ['', '', '', '', ''],
      file: undefined
    }
  ]);
  return (
    <div>
      {[...Array(numberOfQuestions)].map((d, index) => (
        <Box mb={1} key={index}>
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
                  title={'questionType'}
                  indexQuestion={index}
                  handleCheckBox={handleCheckBox}
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
                  title={'typeOfQuestion'}
                  indexQuestion={index}
                  handleCheckBox={handleCheckBox}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Grid item md={6}>
                  {contentQuestion[index].typeOfQuestion ===
                    'Image with caption' && (
                    <UploadTableSurvey
                      indexQuestion={index}
                      numberOfContent="1"
                      handleUploadFile={handleUploadFile}
                    />
                  )}

                  <Box sx={{ mt: 3 }}>
                    <FormControl variant="standard" sx={{ width: '100%' }}>
                      <Typography
                        sx={{
                          fontSize: '17px',
                          fontWeight: 'bold',
                          color: '#044b7e',
                          mb: 1
                        }}
                      >
                        {contentQuestion[index].typeOfQuestion ===
                        'Image with caption'
                          ? 'Caption'
                          : 'Content'}

                        <span
                          style={{
                            fontSize: '13px',
                            color: '#999',
                            fontWeight: 'normal',
                            marginLeft: '10px'
                          }}
                        >
                          (Max. 250 characters)
                        </span>
                      </Typography>
                      <TinyEditorQuestionMode
                        initialValue={''}
                        limit={250}
                        handleGetDataFromEditor={handleGetDataFromEditor}
                        indexQuestion={index}
                      />
                    </FormControl>
                  </Box>
                  <SurveyAnswers
                    handleUptateListAnswer={handleUptateListAnswer}
                    indexQuestion={index}
                  />
                </Grid>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      ))}
    </div>
  );
}
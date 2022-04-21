import { DesktopDatePicker } from '@mui/lab';
import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import surveyApi from 'src/api/surveyApi';
import { AuthContext } from 'src/App';
import CustomizedAccordions from 'src/components/Common/Accordions/CustomizedAccordions';
import BootstrapInput from 'src/components/Common/BootstrapInput/BootstrapInput';
import LabelInput from 'src/components/Common/BootstrapInput/LabelInput';
import ErrorTitle from 'src/components/Common/ErrorTitle/ErrorTitle';
import SubmitNav from 'src/components/Common/SubmitNav/SubmitNav';
import TinyEditor from 'src/components/TinyEditor/TinyEditor';
import { Answer, ContentQuestion, PropsEdit } from 'src/models';

function Add({ editId, editMode }: PropsEdit) {
  const { handleOpenToast, handleChangeMessageToast } = useContext(AuthContext);
  const [status, setStatus] = useState<string>('1');
  const [numberOfQuestions, setNumberOfQuestions] = useState<string>('1');
  const [idContentPack, setIdContentPack] = useState<string>(undefined);
  const [surveyDurationFrom, setSurveyDurationFrom] =
    React.useState<Date | null>(new Date());
  const [surveyDurationTo, setSurveyDurationTo] = React.useState<Date | null>(
    new Date()
  );

  const [complete, setComplete] = useState<boolean>(false);
  const [answer, getAnswer] = useState<Answer[]>([]);
  const [contentQuestion, setContentQuestion] = React.useState<
    ContentQuestion[]
  >([]);

  const nav = useNavigate();
  const handleSetContentQuestion = (content: ContentQuestion[]) => {
    setContentQuestion(content);
  };
  const handleChange = (event: SelectChangeEvent) => {
    setNumberOfQuestions(event.target.value);
  };
  const handleChangeTimeFrom = (newValue: Date | null) => {
    setSurveyDurationFrom(newValue);
  };
  const handleChangeTimeTo = (newValue: Date | null) => {
    setSurveyDurationTo(newValue);
  };
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const onSubmit = (data) => {
    const {
      headerWelcome,
      surveyName,
      surveyDescription,
      bodyWelcome,
      headerThankYou,
      headerExpired,
      bodyExpired,
      bodyThankYou
    } = data;

    const formData = new FormData();

    formData.append('Name', surveyName);

    formData.append('Description', surveyDescription);

    formData.append('HeaderWelcome', headerWelcome);

    formData.append('BodyWelcome', bodyWelcome);

    formData.append('HeaderThankyou', headerThankYou);

    formData.append('BodyThankyou', bodyThankYou);

    formData.append('HeaderExpired', headerExpired);

    formData.append('BodyExpired', bodyExpired);

    formData.append(
      'StartSurveyDate',
      format(new Date(surveyDurationFrom), 'MM-dd-yyy')
    );

    formData.append(
      'EndSurveyDate',
      format(new Date(surveyDurationTo), 'MM-dd-yyy')
    );

    formData.append('SurveyStatus', status);

    formData.append('NumberOfQuestion', numberOfQuestions);

    contentQuestion.forEach((d, i) => {
      if (d.id !== undefined) {
        formData.append(`Questions[${i}].id`, d.id);
      }

      formData.append(`Questions[${i}].questionType`, d.questionType);
      formData.append(`Questions[${i}].typeOfQuestion`, d.typeOfQuestion);
      formData.append(`Questions[${i}].questionCaption`, d.questionCaption);
      formData.append(`Questions[${i}].numberOfAnswer`, d.numberOfAnswer);

      if (d.answers !== undefined)
        [...Array(+numberOfQuestions)].forEach((ans, index) => {
          if (editId === undefined) console.log(contentQuestion[index]);

          contentQuestion[index].answers.forEach((getAnswer, key) => {
            if (getAnswer.answerStr !== '') {
              formData.append(
                `Questions[${index}].answers[${key}].answerStr`,
                getAnswer.answerStr
              );
            }
          });
        });
    });
    if (editId === undefined) {
      try {
        surveyApi.add(formData).then((res) => {
          handleChangeMessageToast(res.data.message);
          handleOpenToast();
          if (res.data.success) {
            nav(`${process.env.REACT_APP_BASE_NAME}/survey`);
          }
        });
      } catch (error) {
        handleChangeMessageToast('Some thing went wrong!');
        handleOpenToast();
      }
    } else {
      formData.append(`Id`, editId);

      [...Array(+numberOfQuestions)].forEach((d, index) => {
        contentQuestion[index].answers.forEach((ans, key) => {
          if (ans.answerStr) {
            formData.append(
              `Questions[${index}].answers[${key}].answerStr`,
              ans.answerStr
            );
          }
          if (ans.id) {
            formData.append(`Questions[${index}].answers[${key}].id`, ans.id);
          }
        });
      });
      try {
        surveyApi.update(formData).then((res) => {
          handleChangeMessageToast(res.data.message);
          handleOpenToast();
          if (res.data.success) {
            nav(`${process.env.REACT_APP_BASE_NAME}/survey`);
          }
        });
      } catch (error) {
        handleChangeMessageToast('Some thing went wrong!');
        handleOpenToast();
      }
    }
    // console.log('contentQuestion', contentQuestion);
    // console.log(data);
    // console.log('from', surveyDurationFrom);
    // console.log('to', surveyDurationTo);
  };

  const submitAsDraft = () => {
    setStatus('1');
    handleSubmit(onSubmit);
  };
  const submitFromNav = () => {
    setStatus('2');
    handleSubmit(onSubmit);
  };

  const handleGetDataFromEditor = (data: string, title: string) => {
    setValue(title, data);
  };

  useEffect(() => {
    register('bodyWelcome');
    register('bodyThankYou');
    register('bodyExpired');
    trigger('bodyWelcome');
    trigger('bodyThankYou');
    trigger('bodyExpired');
    setValue('bodyWelcome', '');
    setValue('bodyThankYou', '');
    setValue('bodyExpired', '');
  }, [register, trigger]);

  useEffect(() => {
    if (editId) {
      surveyApi.getDataById(editId).then((res) => {
        if (res.data.success) {
          let data = res.data.data;

          setValue('bodyWelcome', data.bodyWelcome);
          setValue('bodyThankYou', data.bodyThankyou);
          setValue('bodyExpired', data.bodyExpired);
          setValue('headerWelcome', data.headerWelcome);
          setValue('headerThankYou', data.headerThankyou);
          setValue('headerExpired', data.headerExpired);
          setValue('surveyName', data.name);
          setValue('surveyDescription', data.description);
          setSurveyDurationFrom(data.startSurveyDate);
          setSurveyDurationFrom(data.endSurveyDate);
          setNumberOfQuestions(data.numberOfQuestion);

          let tempContent = [];
          {
            data.questionResponse.length > 0 &&
              data.questionResponse.forEach((d, i) => {
                tempContent.push(d);
              });
          }
          // console.log(data.questionResponse);

          setContentQuestion(tempContent);

          setComplete(true);
        }
      });
    }
  }, [editId]);
  return (
    <Grid container>
      <Grid item md={12}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex' }}>
            <Grid item md={6}>
              <FormControl variant="standard" sx={{ width: '100%' }}>
                <LabelInput shrink htmlFor="bootstrap-input">
                  Survey Name{' '}
                  {errors.surveyName && (
                    <ErrorTitle>*This field is require</ErrorTitle>
                  )}
                </LabelInput>
                <BootstrapInput
                  sx={{
                    '& .MuiInputBase-input': {
                      border: '1px solid #ddd',
                      background: '#fff',
                      height: '35px'
                    }
                  }}
                  error={errors.surveyName ? true : false}
                  defaultValue=""
                  placeholder="Default input"
                  id="bootstrap-input"
                  {...register('surveyName', { required: true })}
                />
              </FormControl>
              <Box sx={{ mt: 3 }}>
                <Typography
                  sx={{
                    fontSize: '17px',
                    fontWeight: 'bold',
                    color: '#044b7e',
                    mb: 1
                  }}
                >
                  Description
                </Typography>
                <TextField
                  sx={{
                    width: '100%',
                    background: '#fff'
                  }}
                  multiline
                  rows={4}
                  {...register('surveyDescription')}
                />
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box
                sx={{
                  background: '#f4f4f4',
                  width: '93%',
                  height: '100%',
                  padding: ' 25px 50px',
                  marginLeft: '50px',
                  borderRadius: '10px',
                  '& .MuiTextField-root': {
                    width: '75%'
                  },
                  '& >div > div': {
                    flexDirection: 'row-reverse',
                    background: '#fff',
                    width: '100%',
                    '& input': {
                      textDecoration: 'underline'
                    }
                  }
                }}
              >
                <Typography
                  sx={{
                    fontSize: '17px',
                    fontWeight: 'bold',
                    color: '#044b7e',
                    mb: 1
                  }}
                >
                  Survey Duration
                </Typography>
                <DesktopDatePicker
                  inputFormat="MM/dd/yyyy"
                  value={surveyDurationFrom}
                  onChange={handleChangeTimeFrom}
                  renderInput={(params) => <TextField {...params} />}
                />
                <Typography
                  sx={{
                    fontSize: '18px',
                    fontWeight: 'normal',
                    color: '#a1a1a1',
                    my: 2
                  }}
                >
                  to
                </Typography>
                <DesktopDatePicker
                  inputFormat="MM/dd/yyyy"
                  value={surveyDurationTo}
                  onChange={handleChangeTimeTo}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </Grid>
          </Box>
          <Box mt={8} mb={9}>
            <Grid item md={6}>
              <Typography variant="h3">PART I: WELCOME</Typography>
              <Box sx={{ mt: 3 }}>
                <FormControl variant="standard" sx={{ width: '100%' }}>
                  <LabelInput shrink htmlFor="bootstrap-input">
                    Header{' '}
                    {errors.headerWelcome && (
                      <ErrorTitle>*This field is require</ErrorTitle>
                    )}
                  </LabelInput>
                  <BootstrapInput
                    sx={{
                      '& .MuiInputBase-input': {
                        border: '1px solid #ddd',
                        background: '#fff',
                        height: '35px'
                      }
                    }}
                    error={errors.headerWelcome ? true : false}
                    defaultValue=""
                    placeholder="Default input"
                    id="bootstrap-input"
                    {...register('headerWelcome', { required: true })}
                  />
                </FormControl>
              </Box>

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
                    Body Text
                  </Typography>
                  <TinyEditor
                    initialValue={getValues('bodyWelcome') as string}
                    limit={9999999999}
                    handleGetDataFromEditor={handleGetDataFromEditor}
                    title={'bodyWelcome'}
                  />
                </FormControl>
              </Box>
            </Grid>
          </Box>

          <Box mt={8} mb={9}>
            <Grid item md={12}>
              <Typography variant="h3">PART II: CONTENT</Typography>
              <Box sx={{ mt: 3 }}>
                <Typography
                  sx={{
                    fontSize: '17px',
                    fontWeight: 'bold',
                    color: '#044b7e',
                    mb: 1
                  }}
                >
                  Number of Question(s)
                </Typography>
                <Select
                  value={numberOfQuestions}
                  onChange={handleChange}
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
                  <MenuItem value={'1'}>1</MenuItem>
                  <MenuItem value={'2'}>2</MenuItem>
                </Select>
              </Box>

              <Box sx={{ mt: 3 }}>
                <CustomizedAccordions
                  complete={complete}
                  numberOfQuestions={+numberOfQuestions}
                  contentQuestionList={contentQuestion}
                  handleSetContentQuestion={handleSetContentQuestion}
                />
              </Box>
            </Grid>
          </Box>

          <Box mt={8} mb={9}>
            <Grid item md={6}>
              <Typography variant="h3">PART III: THANK YOU</Typography>
              <Box sx={{ mt: 3 }}>
                <FormControl variant="standard" sx={{ width: '100%' }}>
                  <LabelInput shrink htmlFor="bootstrap-input">
                    Header
                    {errors.headerThankYou && (
                      <ErrorTitle>*This field is require</ErrorTitle>
                    )}
                  </LabelInput>
                  <BootstrapInput
                    sx={{
                      '& .MuiInputBase-input': {
                        border: '1px solid #ddd',
                        background: '#fff',
                        height: '35px'
                      }
                    }}
                    error={errors.headerThankYou ? true : false}
                    defaultValue=""
                    placeholder="Default input"
                    id="bootstrap-input"
                    {...register('headerThankYou', { required: true })}
                  />
                </FormControl>
              </Box>

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
                    Body Text
                  </Typography>
                  <TinyEditor
                    initialValue={getValues('bodyThankYou') as string}
                    limit={9999999999}
                    title={'bodyThankYou'}
                    handleGetDataFromEditor={handleGetDataFromEditor}
                  />
                </FormControl>
              </Box>
            </Grid>
          </Box>

          <Box mt={8} mb={9}>
            <Grid item md={6}>
              <Typography variant="h3">PART IV: EXPIRED</Typography>
              <Box sx={{ mt: 3 }}>
                <FormControl variant="standard" sx={{ width: '100%' }}>
                  <LabelInput shrink htmlFor="bootstrap-input">
                    Header
                    {errors.headerExpired && (
                      <ErrorTitle>*This field is require</ErrorTitle>
                    )}
                  </LabelInput>
                  <BootstrapInput
                    sx={{
                      '& .MuiInputBase-input': {
                        border: '1px solid #ddd',
                        background: '#fff',
                        height: '35px'
                      }
                    }}
                    error={errors.headerExpired ? true : false}
                    defaultValue=""
                    placeholder="Default input"
                    id="bootstrap-input"
                    {...register('headerExpired', { required: true })}
                  />
                </FormControl>
              </Box>

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
                    Body Text
                  </Typography>
                  <TinyEditor
                    initialValue={getValues('bodyExpired') as string}
                    limit={9999999999}
                    title={'bodyExpired'}
                    handleGetDataFromEditor={handleGetDataFromEditor}
                  />
                </FormControl>
              </Box>
            </Grid>
          </Box>
          <SubmitNav
            idContentPack={editId}
            onDraft={submitAsDraft}
            onSubmit={submitFromNav}
            editMode={editMode}
            isShowDraftBtn={true}
            page={'survey'}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Add;

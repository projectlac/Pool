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
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomizedAccordions from 'src/components/Common/Accordions/CustomizedAccordions';
import BootstrapInput from 'src/components/Common/BootstrapInput/BootstrapInput';
import LabelInput from 'src/components/Common/BootstrapInput/LabelInput';
import SubmitNav from 'src/components/Common/SubmitNav/SubmitNav';
import TinyEditor from 'src/components/TinyEditor/TinyEditor';
import { fileObject } from 'src/models/fileObject';

function Add() {
  const [numberOfQuestions, setNumberOfQuestions] = useState<string>('1');
  const [surveyDurationFrom, setSurveyDurationFrom] =
    React.useState<Date | null>(new Date('2014-08-18T21:11:54'));
  const [surveyDurationTo, setSurveyDurationTo] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54')
  );

  const handleChange = (event: SelectChangeEvent) => {
    setNumberOfQuestions(event.target.value);
  };
  const handleChangeTimeFrom = (newValue: Date | null) => {
    setSurveyDurationFrom(newValue);
  };
  const handleChangeTimeTo = (newValue: Date | null) => {
    setSurveyDurationTo(newValue);
  };
  const { register, handleSubmit, setValue } = useForm();
  const [fileList, setFileList] = useState<fileObject[]>([]);
  const onSubmit = (data) => {
    const { contentName } = data;
    //
    console.log(fileList, contentName);
  };

  const submitFromNav = () => {
    handleSubmit(onSubmit);
  };
  const handleUploadFile = (file: fileObject[]) => {
    setFileList(file);
  };

  const handleGetDataFromEditor = (data: string) => {
    console.log(data);
  };

  return (
    <Grid container>
      <Grid item md={12}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex' }}>
            <Grid item md={6}>
              <FormControl variant="standard" sx={{ width: '100%' }}>
                <LabelInput shrink htmlFor="bootstrap-input">
                  Survey Name
                </LabelInput>
                <BootstrapInput
                  sx={{
                    '& .MuiInputBase-input': {
                      border: '1px solid #ddd',
                      background: '#fff',
                      height: '35px'
                    }
                  }}
                  defaultValue=""
                  placeholder="Default input"
                  id="bootstrap-input"
                  {...register('contentName')}
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
                    width: '100%'
                  }}
                  multiline
                  rows={4}
                  maxRows={4}
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
                    Header
                  </LabelInput>
                  <BootstrapInput
                    sx={{
                      '& .MuiInputBase-input': {
                        border: '1px solid #ddd',
                        background: '#fff',
                        height: '35px'
                      }
                    }}
                    defaultValue=""
                    placeholder="Default input"
                    id="bootstrap-input"
                    {...register('header')}
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
                    initialValue={''}
                    limit
                    handleGetDataFromEditor={handleGetDataFromEditor}
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
                <CustomizedAccordions numberOfQuestions={+numberOfQuestions} />
              </Box>
            </Grid>
          </Box>
          <SubmitNav onSubmit={submitFromNav} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Add;

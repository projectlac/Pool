import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import BootstrapInput from 'src/components/Common/BootstrapInput/BootstrapInput';
import LabelInput from 'src/components/Common/BootstrapInput/LabelInput';
import ErrorTitle from 'src/components/Common/ErrorTitle/ErrorTitle';
import SubmitNav from 'src/components/Common/SubmitNav/SubmitNav';
import { PropsEdit } from 'src/models';

function Add({ editId, editMode }: PropsEdit) {
  const {
    register,
    handleSubmit,

    formState: { errors }
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  const [content, setContent] = useState<string>('Select a Content Pack');
  const [survey, setSurvey] = useState<string>('Select a Survey');
  const onSubmit = (data) => {
    console.log(data);
  };
  const handleChange = (e: SelectChangeEvent, title: string) => {
    if (title === 'content') {
      setContent(e.target.value);
    } else {
      setSurvey(e.target.value);
    }
  };
  const submitFromNav = () => {
    handleSubmit(onSubmit);
  };

  return (
    <Grid container>
      <Grid item md={12}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex' }}>
            <Grid item md={6}>
              <Box>
                <FormControl variant="standard" sx={{ width: '100%' }}>
                  <LabelInput shrink htmlFor="bootstrap-input">
                    Outlet Name
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
              </Box>
              <Box mt={2}>
                <Typography
                  sx={{
                    fontSize: '17px',
                    fontWeight: 'bold',
                    color: '#044b7e',
                    mb: 1
                  }}
                >
                  Assign Content Pack
                </Typography>
                <FormControl sx={{ minWidth: '100%' }}>
                  <Select
                    value={content}
                    onChange={(e) => {
                      handleChange(e, 'content');
                    }}
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{
                      '& .MuiOutlinedInput-input.MuiSelect-select': {
                        background: '#fff',
                        padding: '9px 13px',
                        color: '#959ca3',

                        fontSize: '15px',
                        alignItems: 'center',
                        display: 'flex',
                        height: '35px'
                      },
                      '& .MuiSelect-icon': {
                        color: '#959ca3'
                      }
                    }}
                  >
                    <MenuItem value={'Select a Content Pack'}>
                      Select a Content Pack
                    </MenuItem>
                    <MenuItem value={'10'}>10</MenuItem>
                    <MenuItem value={'20'}>20</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box mt={5}>
                <Typography
                  sx={{
                    fontSize: '17px',
                    fontWeight: 'bold',
                    color: '#044b7e',
                    mb: 1
                  }}
                >
                  Assign Survey Form
                </Typography>
                <FormControl sx={{ minWidth: '100%' }}>
                  <Select
                    value={survey}
                    onChange={(e) => {
                      handleChange(e, 'survey');
                    }}
                    inputProps={{ 'aria-label': 'Without label' }}
                    sx={{
                      '& .MuiOutlinedInput-input.MuiSelect-select': {
                        background: '#fff',
                        padding: '9px 13px',
                        color: '#959ca3',

                        fontSize: '15px',
                        alignItems: 'center',
                        display: 'flex',

                        height: '35px'
                      },
                      '& .MuiSelect-icon': {
                        color: '#959ca3'
                      }
                    }}
                  >
                    <MenuItem value={'Select a Survey'}>
                      Select a Survey
                    </MenuItem>
                    <MenuItem value={'10'}>10</MenuItem>
                    <MenuItem value={'20'}>20</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Box>

          <SubmitNav
            page={'individual'}
            onSubmit={submitFromNav}
            editMode={editMode}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Add;

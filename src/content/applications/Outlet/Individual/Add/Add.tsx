import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import contentPackApi from 'src/api/contentPackApi';
import outletApi from 'src/api/outletApi';
import surveyApi from 'src/api/surveyApi';
import { AuthContext } from 'src/App';
import BootstrapInput from 'src/components/Common/BootstrapInput/BootstrapInput';
import LabelInput from 'src/components/Common/BootstrapInput/LabelInput';
import ErrorTitle from 'src/components/Common/ErrorTitle/ErrorTitle';
import SubmitNav from 'src/components/Common/SubmitNav/SubmitNav';
import { PropsEdit } from 'src/models';
import CircularProgress from '@mui/material/CircularProgress';

interface Respon {
  id: string;
  name: string;
}
interface ErrorType {
  errorSurvey: boolean;
  errorContent: boolean;
}

function Add({ editId, editMode }: PropsEdit) {
  const {
    register,
    handleSubmit,

    formState: { errors }
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  const { handleOpenToast, handleChangeMessageToast } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);

  const [content, setContent] = useState<string>('Select a Content Pack');
  const [survey, setSurvey] = useState<string>('Select a Survey');

  const [contentList, setContentList] = useState<Respon[]>();
  const [surveyList, setSurveyList] = useState<Respon[]>();

  const [error, setError] = useState<ErrorType>({
    errorSurvey: false,
    errorContent: false
  });

  const nav = useNavigate();
  const onSubmit = (data) => {
    if (survey === 'Select a Survey') {
      setError({ ...error, errorSurvey: true });
      setTimeout(() => {
        setError({ ...error, errorSurvey: false });
      }, 3000);
    } else {
      if (content === 'Select a Content Pack') {
        setError({ ...error, errorContent: true });
        setTimeout(() => {
          setError({ ...error, errorContent: false });
        }, 3000);
      } else {
        const formData = new FormData();
        formData.append('Name', data.outletName);
        formData.append('ContentPackId', content);
        formData.append('SurveyId', survey);

        outletApi.add(formData).then((res) => {
          handleChangeMessageToast(res.data.message);
          handleOpenToast();
          if (res.data.success) {
            nav(`${process.env.REACT_APP_BASE_NAME}/outlet/individual/`);
          }
        });
      }
    }
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

  useEffect(() => {
    if (editId) {
      setLoading(true);

      try {
        outletApi.getAllContentAndSurvey().then((res) => {
          if (res.data.success) {
            setContentList(res.data.data.contentPacks);
            setSurveyList(res.data.data.surveys);
          }
        });
        outletApi.getDataById(editId).then((res) => {
          setContent(res.data.data.contentPack.id);
          setLoading(false);
        });
      } catch (error) {}
    } else {
      outletApi.getAllContentAndSurvey().then((res) => {
        if (res.data.success) {
          setContentList(res.data.data.contentPacks);
          setSurveyList(res.data.data.surveys);
        }
      });
    }
  }, [editId]);

  return (
    <Grid container>
      <Grid item md={12}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex' }}>
              <Grid item md={6}>
                <Box>
                  <FormControl variant="standard" sx={{ width: '100%' }}>
                    <LabelInput shrink htmlFor="bootstrap-input">
                      Outlet Name
                      {errors.outletName && (
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
                      error={errors.outletName ? true : false}
                      defaultValue=""
                      placeholder="Default input"
                      id="bootstrap-input"
                      {...register('outletName', { required: true })}
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
                    Assign Content Pack{' '}
                    {error.errorContent && (
                      <ErrorTitle>*This field is require</ErrorTitle>
                    )}
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
                      {contentList !== undefined &&
                        contentList.length > 0 &&
                        contentList.map((d) => (
                          <MenuItem key={d.id} value={d.id}>
                            {d.name}
                          </MenuItem>
                        ))}
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
                    Assign Survey Form{' '}
                    {error.errorSurvey && (
                      <ErrorTitle>*This field is require</ErrorTitle>
                    )}
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
                      {surveyList !== undefined &&
                        surveyList.length > 0 &&
                        surveyList.map((d) => (
                          <MenuItem key={d.id} value={d.id}>
                            {d.name}
                          </MenuItem>
                        ))}
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
        )}
      </Grid>
    </Grid>
  );
}

export default Add;

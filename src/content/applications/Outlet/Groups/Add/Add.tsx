import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import contentPackApi from 'src/api/contentPackApi';
import outletApi from 'src/api/outletApi';
import surveyApi from 'src/api/surveyApi';
import BootstrapInput from 'src/components/Common/BootstrapInput/BootstrapInput';
import LabelInput from 'src/components/Common/BootstrapInput/LabelInput';
import DnD from 'src/components/Common/Dnd/DnD';
import ErrorTitle from 'src/components/Common/ErrorTitle/ErrorTitle';
import SubmitNav from 'src/components/Common/SubmitNav/SubmitNav';
import { DataColumns, OutletElement, PropsEdit } from 'src/models';

// export const data: OutletElement[] = [
//   {
//     id: '1',
//     OutletName: 'Create PR for the Task'
//   },
//   {
//     id: '2',
//     OutletName: 'Fix Styling'
//   },
//   {
//     id: '3',
//     OutletName: 'Handle Api Changes'
//   },
//   {
//     id: '4',
//     OutletName: 'Blog on new features'
//   },
//   {
//     id: '5',
//     OutletName: 'Call with Backend Team'
//   },
//   {
//     id: '6',
//     OutletName: 'Create PR for the Task'
//   },
//   {
//     id: '7',
//     OutletName: 'Fix Styling'
//   },
//   {
//     id: '8',
//     OutletName: 'Handle Api Changes'
//   },
//   {
//     id: '9',
//     OutletName: 'Blog on new features'
//   },
//   {
//     id: '10',
//     OutletName: 'Call with Backend Team'
//   },
//   {
//     id: '11',
//     OutletName: 'Create PR for the Task'
//   },
//   {
//     id: '12',
//     OutletName: 'Fix Styling'
//   },
//   {
//     id: '13',
//     OutletName: 'Handle Api Changes'
//   },
//   {
//     id: '14',
//     OutletName: 'Blog on new features'
//   },
//   {
//     id: '15',
//     OutletName: 'Call with Backend Team'
//   }
// ];

export const columnsFromBackend: DataColumns = {
  '1': {
    title: 'Tagged Outlet',
    items: [] as OutletElement[]
  },
  '2': {
    title: 'Available Outlet',
    items: []
  }
};

interface Respon {
  id: string;
  name: string;
}
interface ErrorType {
  errorSurvey: boolean;
  errorContent: boolean;
}

function Add({ editId, editMode }: PropsEdit) {
  const [columns, setColumns] = useState<DataColumns>(columnsFromBackend);
  const [content, setContent] = useState<string>('Select a Content Pack');
  const [survey, setSurvey] = useState<string>('Select a Survey');

  const [contentList, setContentList] = useState<Respon[]>();
  const [surveyList, setSurveyList] = useState<Respon[]>();

  const [error, setError] = useState<ErrorType>({
    errorSurvey: false,
    errorContent: false
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const handleChange = (e: SelectChangeEvent, title: string) => {
    if (title === 'content') {
      setContent(e.target.value);
    } else {
      setSurvey(e.target.value);
    }
  };

  const handleAfterDrag = (data: DataColumns) => {
    setColumns(data);
  };

  const onSubmit = (data) => {
    if (survey === 'Select a Content Pack') {
      setError({ ...error, errorSurvey: true });
      setTimeout(() => {
        setError({ ...error, errorSurvey: false });
      }, 3000);
    } else {
      if (content === 'Select a Survey') {
        setError({ ...error, errorContent: true });
        setTimeout(() => {
          setError({ ...error, errorContent: false });
        }, 3000);
      } else {
        const formData = new FormData();
        formData.append('Name', data.groupName);
        formData.append('ContentPackId', content);
        formData.append('SurveryId', content);
        formData.append('NumberOfOutlet', columns['1'].items.length.toString());
        // outletApi.add(formData).then((res) => {
        //   handleChangeMessageToast(res.data.message);
        //   handleOpenToast();
        //   if (res.data.success) {
        //     nav(`${process.env.REACT_APP_BASE_NAME}/outlet/individual/`);
        //   }
        // });
      }
    }
  };

  const submitFromNav = () => {
    handleSubmit(onSubmit);
  };

  useEffect(() => {
    if (editId) {
      try {
      } catch (error) {}
    } else {
      surveyApi.getData(99, 0).then((res) => {
        if (res.data.success) {
          let temp = res.data.data.map((d, index) => {
            return { name: d.name, id: d.id };
          });
          setSurveyList(temp);
        }
      });

      contentPackApi.getData(99, 0).then((res) => {
        if (res.data.success) {
          let temp = res.data.data.map((d, index) => {
            return { name: d.name, id: d.id };
          });
          setContentList(temp);
        }
      });

      outletApi.getData(99, 0).then((res) => {
        if (res.data.success) {
          let temp = res.data.data.map((d, index) => {
            return { outletName: d.name, id: d.id };
          });

          setColumns({
            ...columns,
            '1': { title: 'Tagged Outlet', items: [] },
            '2': { title: 'Available Outlet', items: temp }
          });
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
              <Box>
                <FormControl variant="standard" sx={{ width: '100%' }}>
                  <LabelInput shrink htmlFor="bootstrap-input">
                    Group Name
                    {errors.groupName && (
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
                    error={errors.groupName ? true : false}
                    defaultValue=""
                    placeholder="Default input"
                    id="bootstrap-input"
                    {...register('groupName', { required: true })}
                  />
                </FormControl>
              </Box>
            </Grid>
          </Box>

          <DnD columns={columns} setColumns={handleAfterDrag} />

          <Grid item xl={6}>
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
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 'normal',
                    color: '#888',
                    marginLeft: '15px'
                  }}
                >
                  (Individual assignation will be overwritten)
                  {error.errorContent && (
                    <span
                      style={{
                        color: '#d33',
                        fontSize: '15px',
                        marginLeft: '15px'
                      }}
                    >
                      *This field is require
                    </span>
                  )}
                </span>
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
            <Box mt={5} mb={10}>
              <Typography
                sx={{
                  fontSize: '17px',
                  fontWeight: 'bold',
                  color: '#044b7e',
                  mb: 1
                }}
              >
                Assign Survey Form{' '}
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 'normal',
                    color: '#888',
                    marginLeft: '15px'
                  }}
                >
                  (Individual assignation will be overwritten)
                  {error.errorSurvey && (
                    <span
                      style={{
                        color: '#d33',
                        fontSize: '15px',
                        marginLeft: '15px'
                      }}
                    >
                      *This field is require
                    </span>
                  )}
                </span>
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
                  <MenuItem value={'Select a Survey'}>Select a Survey</MenuItem>
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
          <SubmitNav
            page={'group'}
            onSubmit={submitFromNav}
            editMode={editMode}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Add;

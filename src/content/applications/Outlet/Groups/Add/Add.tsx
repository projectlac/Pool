import { Box, FormControl, Grid } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import BootstrapInput from 'src/components/Common/BootstrapInput/BootstrapInput';
import LabelInput from 'src/components/Common/BootstrapInput/LabelInput';
import DnD from 'src/components/Common/Dnd/DnD';
import ErrorTitle from 'src/components/Common/ErrorTitle/ErrorTitle';
import SubmitNav from 'src/components/Common/SubmitNav/SubmitNav';
import { DataColumns, OutletElement } from 'src/models';

export const data: OutletElement[] = [
  {
    id: '1',
    OutletName: 'Create PR for the Task'
  },
  {
    id: '2',
    OutletName: 'Fix Styling'
  },
  {
    id: '3',
    OutletName: 'Handle Api Changes'
  },
  {
    id: '4',
    OutletName: 'Blog on new features'
  },
  {
    id: '5',
    OutletName: 'Call with Backend Team'
  },
  {
    id: '6',
    OutletName: 'Create PR for the Task'
  },
  {
    id: '7',
    OutletName: 'Fix Styling'
  },
  {
    id: '8',
    OutletName: 'Handle Api Changes'
  },
  {
    id: '9',
    OutletName: 'Blog on new features'
  },
  {
    id: '10',
    OutletName: 'Call with Backend Team'
  },
  {
    id: '11',
    OutletName: 'Create PR for the Task'
  },
  {
    id: '12',
    OutletName: 'Fix Styling'
  },
  {
    id: '13',
    OutletName: 'Handle Api Changes'
  },
  {
    id: '14',
    OutletName: 'Blog on new features'
  },
  {
    id: '15',
    OutletName: 'Call with Backend Team'
  }
];

export const columnsFromBackend: DataColumns = {
  '1': {
    title: 'Tagged Outlet',
    items: [] as OutletElement[]
  },
  '2': {
    title: 'Available Outlet',
    items: data
  }
};

function Add() {
  const [columns, setColumns] = useState(columnsFromBackend);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const handleAfterDrag = (data: any) => {
    setColumns(data);
  };
  const onSubmit = (data) => {
    console.log(columns);
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
                    Group Name
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
            </Grid>
          </Box>

          <DnD columns={columns} setColumns={handleAfterDrag} />
          <SubmitNav onSubmit={submitFromNav} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Add;

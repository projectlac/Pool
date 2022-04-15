import { Box, FormControl, Grid } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import BootstrapInput from 'src/components/Common/BootstrapInput/BootstrapInput';
import LabelInput from 'src/components/Common/BootstrapInput/LabelInput';
import DnD from 'src/components/Common/Dnd/DnD';
import ErrorTitle from 'src/components/Common/ErrorTitle/ErrorTitle';
import SubmitNav from 'src/components/Common/SubmitNav/SubmitNav';

function Add() {
  const {
    register,
    handleSubmit,

    formState: { errors }
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const onSubmit = (data) => {
    console.log(data);
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

          {/* <Grid container spacing={5}>
            <Grid item md={6}>
              Tagged Outlet
            </Grid>

            <Grid item md={5}>
              Available Outlet
            </Grid>
          </Grid> */}
          <DnD />
          <SubmitNav onSubmit={submitFromNav} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Add;

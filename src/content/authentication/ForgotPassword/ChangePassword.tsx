import { Box, Button, FormControl } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import BootstrapInput from 'src/components/Common/BootstrapInput/BootstrapInput';
import LabelInput from 'src/components/Common/BootstrapInput/LabelInput';

function ChangePassword() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {
            width: { md: '70ch', xs: '100%' },
            mb: 4
          },
          '& button': {
            width: { md: '61ch', xs: '100%' },
            height: '53px'
          },

          width: { md: '70ch', xs: '100%' },
          mt: 10
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl variant="standard" sx={{ width: '100%' }}>
          <LabelInput shrink htmlFor="bootstrap-input">
            Temporary Password
          </LabelInput>
          <BootstrapInput
            defaultValue=""
            id="bootstrap-input"
            type="password"
            {...register('temporary')}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ width: '100%' }}>
          <LabelInput shrink htmlFor="bootstrap-input">
            New Password
          </LabelInput>
          <BootstrapInput
            defaultValue=""
            type="password"
            id="bootstrap-input"
            {...register('password')}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ width: '100%' }}>
          <LabelInput shrink htmlFor="bootstrap-input">
            Confirm New Password
          </LabelInput>
          <BootstrapInput
            defaultValue=""
            type="password"
            id="bootstrap-input"
            {...register('confirm')}
          />
        </FormControl>

        <Button size="large" variant="contained" type="submit" sx={{ mt: 5 }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default ChangePassword;

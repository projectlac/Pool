import { Box, Button, FormControl, Typography } from '@mui/material';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import loginApi from 'src/api/loginApi';
import BootstrapInput from 'src/components/Common/BootstrapInput/BootstrapInput';
import LabelInput from 'src/components/Common/BootstrapInput/LabelInput';

interface PropsChangePassword {
  handleChangeMessage: (msg: string) => void;
  handleOpenMessage: () => void;
  email: string;
}
function ChangePassword({
  handleChangeMessage,
  handleOpenMessage,
  email
}: PropsChangePassword) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const nav = useNavigate();

  const password = useRef({});
  password.current = watch('password', '');
  const onSubmit = (data) => {
    const { temporary, password, confirm } = data;
    try {
      loginApi
        .changePassword({
          email: email,
          temporaryPassword: temporary,
          newPassword: password,
          confirmNewPassword: confirm
        })
        .then((res) => {
          if (res.data.success) {
            handleChangeMessage(res.data.message);
            handleOpenMessage();
            nav(`${process.env.REACT_APP_BASE_NAME}/login`);
          } else {
            handleChangeMessage(res.data.message);
            handleOpenMessage();
          }
        });
    } catch (error) {}
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
            error={errors.temporary}
            id="bootstrap-input"
            type="password"
            {...register('temporary', {
              required: 'The temporary password is require'
            })}
          />
          {errors.temporary && (
            <Typography mb={2} variant="h5" color="error">
              {errors.temporary.message}
            </Typography>
          )}
        </FormControl>
        <FormControl variant="standard" sx={{ width: '100%' }}>
          <LabelInput shrink htmlFor="bootstrap-input">
            New Password
          </LabelInput>
          <BootstrapInput
            defaultValue=""
            type="password"
            error={errors.password}
            id="bootstrap-input"
            {...register('password', {
              required: 'The new password is require',
              minLength: 8
            })}
          />
          {errors.password && (
            <Typography mb={2} variant="h5" color="error">
              {errors.password.message}
            </Typography>
          )}
        </FormControl>
        <FormControl variant="standard" sx={{ width: '100%' }}>
          <LabelInput shrink htmlFor="bootstrap-input">
            Confirm New Password
          </LabelInput>
          <BootstrapInput
            defaultValue=""
            type="password"
            error={errors.confirm}
            id="bootstrap-input"
            {...register('confirm', {
              required: 'The confirm password is require',
              minLength: 8,
              validate: (value) =>
                value === password.current || 'The passwords do not match'
            })}
          />
          {errors.confirm && (
            <Typography mb={2} variant="h5" color="error">
              {errors.confirm.message}
            </Typography>
          )}
        </FormControl>

        <Button size="large" variant="contained" type="submit" sx={{ mt: 5 }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default ChangePassword;

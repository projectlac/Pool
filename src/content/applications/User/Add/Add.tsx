import { Box, FormControl, Grid, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useRef } from 'react';
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
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  const [role, setRole] = React.useState<string>('Admin');
  const onSubmit = (data) => {
    console.log(data, role);
  };

  const submitFromNav = () => {
    handleSubmit(onSubmit);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const password = useRef({});
  password.current = watch('password', '');
  return (
    <Grid container>
      <Grid item md={12}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid item md={6}>
            <Box mt={2}>
              <FormControl variant="standard" sx={{ width: '100%' }}>
                <LabelInput shrink htmlFor="bootstrap-input">
                  User Name
                  {errors.userName && (
                    <ErrorTitle>{errors.userName.message}</ErrorTitle>
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
                  error={errors.userName ? true : false}
                  defaultValue=""
                  placeholder="Default input"
                  id="bootstrap-input"
                  {...register('userName', {
                    required: '* This field is require'
                  })}
                />
              </FormControl>
            </Box>
            <Box mt={2}>
              <FormControl variant="standard" sx={{ width: '100%' }}>
                <LabelInput shrink htmlFor="bootstrap-input">
                  Email
                  {errors.email && (
                    <ErrorTitle>{errors.email.message}</ErrorTitle>
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
                  error={errors.email ? true : false}
                  defaultValue=""
                  type="email"
                  placeholder="Default input"
                  id="bootstrap-input"
                  {...register('email', {
                    required: '* This field is require',
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                      message: 'Email is invalid.'
                    }
                  })}
                />
              </FormControl>
            </Box>
            <Box mt={2}>
              <FormControl variant="standard" sx={{ width: '100%' }}>
                <LabelInput shrink htmlFor="bootstrap-input">
                  Password
                  {errors.password && (
                    <ErrorTitle>{errors.password.message}</ErrorTitle>
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
                  defaultValue=""
                  error={errors.password ? true : false}
                  placeholder="Default input"
                  id="bootstrap-input"
                  {...register('password', {
                    required: '* This field is require'
                  })}
                />
              </FormControl>
            </Box>
            <Box mt={2}>
              <FormControl variant="standard" sx={{ width: '100%' }}>
                <LabelInput shrink htmlFor="bootstrap-input">
                  Re-confirm Password{' '}
                  {errors.confirmPassword && (
                    <ErrorTitle>{errors.confirmPassword.message}</ErrorTitle>
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
                  defaultValue=""
                  placeholder="Default input"
                  error={errors.confirmPassword ? true : false}
                  id="bootstrap-input"
                  {...register('confirmPassword', {
                    required: '* This field is require',
                    validate: (value) =>
                      value === password.current || 'The passwords do not match'
                  })}
                />
              </FormControl>
            </Box>
            <Box mt={2}>
              <FormControl sx={{ minWidth: 75 }}>
                <Typography
                  sx={{
                    fontSize: '17px',
                    fontWeight: 'bold',
                    color: '#044b7e',
                    mb: 1
                  }}
                >
                  Select a role
                </Typography>
                <Select
                  value={role}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{
                    '& .MuiOutlinedInput-input': {
                      background: '#fff',
                      padding: '9px 13px',
                      color: '#000',

                      fontSize: '15px',
                      alignItems: 'center',
                      display: 'flex'
                    },
                    '& .MuiSelect-icon': {
                      color: '#959ca3'
                    }
                  }}
                >
                  <MenuItem value={'Admin'}>Admin</MenuItem>
                  <MenuItem value={'User'}>User</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <SubmitNav onSubmit={submitFromNav} editMode={editMode} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Add;

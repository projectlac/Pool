import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  Typography
} from '@mui/material';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import loginApi from 'src/api/loginApi';
import { AuthContext } from 'src/App';
import BootstrapInput from 'src/components/Common/BootstrapInput/BootstrapInput';
import LabelInput from 'src/components/Common/BootstrapInput/LabelInput';
import BpCheckbox from 'src/components/Common/BpCheckbox';
import ErrorTitle from 'src/components/Common/ErrorTitle/ErrorTitle';

function Login() {
  const { handleLoginIn, handleOpenToast, handleChangeMessageToast } =
    useContext(AuthContext);
  const {
    register,
    handleSubmit,

    formState: { errors }
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  const nav = useNavigate();

  const onSubmit = (data) => {
    const { username, password } = data;
    try {
      loginApi.login({ userName: username, password }).then((res) => {
        if (res.data.success) {
          localStorage.setItem('access_token', res.data.data.token);
          handleLoginIn();
          nav(`${process.env.REACT_APP_BASE_NAME}/dashboards/`);
        } else {
          handleChangeMessageToast(res.data.data);
          handleOpenToast();
        }
      });
    } catch (error) {}

    //
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',

        backgroundSize: 'cover'
      }}
    >
      <Container maxWidth="lg" sx={{ height: '100vh', pt: 15 }}>
        <Card sx={{ p: { md: 10, xs: 3 } }}>
          <Typography variant="h1" component="h1" align="center" sx={{ mb: 2 }}>
            Login
          </Typography>
          <Typography variant="h3" component="h3" align="center">
            Content Management System
          </Typography>
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
                  Username
                  {errors.username && (
                    <ErrorTitle>{errors.username.message}</ErrorTitle>
                  )}
                </LabelInput>
                <BootstrapInput
                  defaultValue=""
                  error={Boolean(errors.username)}
                  id="bootstrap-input"
                  placeholder="eg: Jaison"
                  {...register('username', {
                    required: '* This field is require'
                  })}
                />
              </FormControl>
              <FormControl variant="standard" sx={{ width: '100%' }}>
                <LabelInput shrink htmlFor="bootstrap-input">
                  Password
                  {errors.password && (
                    <ErrorTitle>{errors.password.message}</ErrorTitle>
                  )}
                </LabelInput>
                <BootstrapInput
                  type="password"
                  error={Boolean(errors.password)}
                  autoComplete="current-password"
                  {...register('password', {
                    required: '* This field is require'
                  })}
                />
              </FormControl>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <FormControlLabel
                  label="Remember me"
                  sx={{
                    color: '#044b7e',
                    '& .MuiTypography-root': { fontSize: '15px' }
                  }}
                  control={<BpCheckbox />}
                />

                <Typography textAlign={'right'}>
                  <Link
                    to={`${process.env.REACT_APP_BASE_NAME}/forgot-password`}
                    style={{
                      textDecoration: 'none',
                      color: '#044b7e',
                      fontSize: '15px'
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Typography>
              </Box>

              <Button
                size="large"
                variant="contained"
                type="submit"
                sx={{ mt: 5 }}
              >
                LOGIN
              </Button>
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
export default Login;

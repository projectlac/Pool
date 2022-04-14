import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  Typography
} from '@mui/material';

import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import loginApi from 'src/api/loginApi';

import { AuthContext } from 'src/App';
import BootstrapInput from 'src/components/Common/BootstrapInput/BootstrapInput';
import LabelInput from 'src/components/Common/BootstrapInput/LabelInput';
import BpCheckbox from 'src/components/Common/BpCheckbox';
import Toast from 'src/components/Common/Toast/Toast';

function Login() {
  const { handleLoginIn } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>('');
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (data) => {
    const { username, password } = data;
    loginApi.login({ userName: username, password }).then((res) => {
      if (res.data.success) {
        localStorage.setItem('access_token', res.data.data.token);
        handleLoginIn();
        nav(`${process.env.REACT_APP_BASE_NAME}/dashboards/`);
      } else {
        setErrMsg(res.data.data);
        setOpen(true);
      }
    });

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
                </LabelInput>
                <BootstrapInput
                  defaultValue=""
                  id="bootstrap-input"
                  placeholder="eg: Jaison"
                  {...register('username')}
                />
              </FormControl>
              <FormControl variant="standard" sx={{ width: '100%' }}>
                <LabelInput shrink htmlFor="bootstrap-input">
                  Password
                </LabelInput>
                <BootstrapInput
                  type="password"
                  autoComplete="current-password"
                  {...register('password')}
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
        <Toast open={open} onClose={handleClose} message={errMsg} />
      </Container>
    </Box>
  );
}
export default Login;

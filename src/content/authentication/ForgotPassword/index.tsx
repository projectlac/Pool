import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import BootstrapInput from 'src/components/Common/BootstrapInput/BootstrapInput';
import LabelInput from 'src/components/Common/BootstrapInput/LabelInput';
import Toast from 'src/components/Common/Toast/Toast';
import ChangePassword from './ChangePassword';

function ForgotPassword() {
  // const { handleLoginIn } = useContext(AuthContext);
  const [checkFillEmail, setCheckFillEmail] = useState<Boolean>(false);
  const { register, handleSubmit } = useForm();
  // const nav = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>('Something wrong');
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = (data) => {
    setCheckFillEmail(true);
    setOpen(true);
    // const { username, password } = data;
    // loginApi.login({ userName: username, password }).then((res) => {
    //   if (res.data.success) {
    //     localStorage.setItem('access_token', res.data.data.token);

    //     handleLoginIn();
    //     nav(`${process.env.REACT_APP_BASE_NAME}/dashboards/main`);
    //   } else {
    //     setErrMsg(res.data.data);
    //     setOpen(true);
    //   }
    // });

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
            Forgot Password
          </Typography>
          <Typography variant="h3" component="h3" align="center">
            Content Management System
          </Typography>
          {!checkFillEmail ? (
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
                    Email
                  </LabelInput>
                  <BootstrapInput
                    defaultValue=""
                    id="bootstrap-input"
                    placeholder="eg: Jaison"
                    {...register('email')}
                  />
                </FormControl>

                <Button
                  size="large"
                  variant="contained"
                  type="submit"
                  sx={{ mt: 5 }}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          ) : (
            <ChangePassword />
          )}
        </Card>
        <Toast open={open} onClose={handleClose} message={errMsg} />
      </Container>
    </Box>
  );
}
export default ForgotPassword;

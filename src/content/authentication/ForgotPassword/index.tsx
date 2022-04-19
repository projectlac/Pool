import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Typography
} from '@mui/material';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import loginApi from 'src/api/loginApi';
import BootstrapInput from 'src/components/Common/BootstrapInput/BootstrapInput';
import LabelInput from 'src/components/Common/BootstrapInput/LabelInput';
import Toast from 'src/components/Common/Toast/Toast';
import ChangePassword from './ChangePassword';

function ForgotPassword() {
  // const { handleLoginIn } = useContext(AuthContext);
  const [checkFillEmail, setCheckFillEmail] = useState<Boolean>(false);
  const [fillEmail, setFillEmail] = useState<string>('');
  const { register, handleSubmit, watch } = useForm();
  // const nav = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>('Something wrong');
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeMessage = (msg: string) => {
    setErrMsg(msg);
  };
  const handleOpenMessage = () => {
    setOpen(true);
  };
  const onSubmit = (data) => {
    const { email } = data;
    try {
      loginApi.forgotPassword(email).then((res) => {
        if (res.data.success) {
          setCheckFillEmail(true);
          setFillEmail(email);
        } else {
          handleChangeMessage(res.data.message);
          setOpen(true);
        }
      });
    } catch (error) {}
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
            {checkFillEmail ? 'Change Password' : 'Forgot Password'}
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
                    {...register('email', { required: 'Email is require' })}
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
            <ChangePassword
              handleChangeMessage={handleChangeMessage}
              handleOpenMessage={handleOpenMessage}
              email={fillEmail}
            />
          )}
        </Card>
        <Toast open={open} onClose={handleClose} message={errMsg} />
      </Container>
    </Box>
  );
}
export default ForgotPassword;

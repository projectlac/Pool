import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import ThemeProvider from './theme/ThemeProvider';
import { Box, CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import React from 'react';
import './assets/styles/global.scss';
import station from './api/station';
import { useNavigate } from 'react-router-dom';
export const AuthContext = React.createContext(null);
const App = () => {
  const [isLogin, setIsLogin] = useState<boolean>(
    Boolean(localStorage.getItem('access_token'))
  );
  const nav = useNavigate();
  useEffect(() => {
    const callAuth = async () => {
      const checkToken = Boolean(localStorage.getItem('access_token'));

      if (checkToken) {
        await station
          .getSation()
          .then(() => {
            setIsLogin(true);
          })
          .catch(() => {
            setIsLogin(false);
            localStorage.removeItem('access_token');
            nav(`${process.env.REACT_APP_BASE_NAME}/login`);
          });
      }
    };
    callAuth();
  }, []);
  const [updated, setUpdated] = useState<boolean>(false);
  const updateSuccess = () => {
    setUpdated(true);
    setTimeout(() => {
      setUpdated(false);
    }, 500);
  };
  const handleLoginIn = () => {
    setIsLogin(true);
  };
  const handleLoginOut = () => {
    setIsLogin(false);
  };

  const value = {
    isLogin,
    updated,
    updateSuccess,
    handleLoginIn,
    handleLoginOut
  };

  const content = useRoutes(
    routes(isLogin),
    `${process.env.REACT_APP_BASE_NAME}`
  );

  const iframe = document.getElementsByTagName('iframe');
  useEffect(() => {
    iframe[0] && iframe[0].remove();
  }, [iframe]);

  return (
    <AuthContext.Provider value={value}>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <Box>{content}</Box>
        </LocalizationProvider>
      </ThemeProvider>
    </AuthContext.Provider>
  );
};
export default App;

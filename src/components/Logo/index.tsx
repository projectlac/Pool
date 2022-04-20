import { Box, Hidden } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import logo from '../../assets/images/logo/Image 9.png';
const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoTextWrapper = styled(Box)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
      
`
);

function Logo() {
  return (
    <LogoWrapper to={`${process.env.REACT_APP_BASE_NAME}`}>
      <Hidden smDown>
        <LogoTextWrapper>
          <Box sx={{ height: { lg: '88px', sm: '88px' } }}>
            <img src={logo} alt="" width={'100%'} height={`100%`} />
          </Box>
        </LogoTextWrapper>
      </Hidden>
    </LogoWrapper>
  );
}

export default Logo;

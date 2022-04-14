import { Box, Button, Container, Grid } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from 'src/App';
function Hero() {
  const isLoginIn = useContext(AuthContext);

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item md={10} lg={8} mx="auto">
          Homepage
          <Box>
            {!isLoginIn ? (
              <Link to="./login">
                <Button variant="contained">Login</Button>
              </Link>
            ) : (
              <Link to="./dashboards">
                <Button variant="contained">Go to dashboards</Button>
              </Link>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;

import { Typography, Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
function PageHeader(props) {
  const { title, button, link } = props;
  return (
    <Grid container justifyContent="flex-start">
      <Grid item container alignItems="center">
        <Typography
          variant="h3"
          component="h3"
          color="primary"
          gutterBottom
          sx={{
            textTransform: 'capitalize',
            fontSize: '40px',
            mb: 0
          }}
        >
          {title}
        </Typography>
        {button && link && (
          <Link
            to={process.env.REACT_APP_BASE_NAME + link}
            style={{ textDecoration: 'none' }}
          >
            <Button variant="contained" sx={{ ml: 2, height: '45px' }}>
              <AddIcon /> {button}
            </Button>
          </Link>
        )}
      </Grid>
    </Grid>
  );
}

export default PageHeader;

import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Helmet } from 'react-helmet-async';
import PageHeader from 'src/components/Header/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import RecentOrders from './Table/RecentOrders';

function User() {
  return (
    <>
      <Helmet>
        <title>User</title>
      </Helmet>
      <PageTitleWrapper>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <PageHeader title={'User'} button={'Add New'} link={'/user/add'} />
        </Box>
      </PageTitleWrapper>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default User;

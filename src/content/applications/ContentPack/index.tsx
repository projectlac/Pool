import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Helmet } from 'react-helmet-async';
import PageHeader from 'src/components/Header/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import RecentOrders from './Table/RecentOrders';

function Corridor() {
  return (
    <>
      <Helmet>
        <title>Content Pack</title>
      </Helmet>
      <PageTitleWrapper>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <PageHeader
            title={'Content Pack'}
            button={'Add New'}
            link={'/content-pack/add'}
          />
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

export default Corridor;

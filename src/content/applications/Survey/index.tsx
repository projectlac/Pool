import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Helmet } from 'react-helmet-async';
import PageHeader from 'src/components/Header/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import RecentOrders from './Table/RecentOrders';

function Survey() {
  return (
    <>
      <Helmet>
        <title>Survey</title>
      </Helmet>
      <PageTitleWrapper>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <PageHeader
            title={'Survey'}
            button={'Add New'}
            link={'/survey/add'}
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

export default Survey;

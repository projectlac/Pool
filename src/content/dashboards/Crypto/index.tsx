import { Helmet } from 'react-helmet-async';
// import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Box, Typography } from '@mui/material';
import PageHeader from 'src/components/Header/PageHeader';
import SelectWithoutLabel from 'src/components/Common/SelectWithoutLabel/SelectWithoutLabel';
import TimeLine from 'src/components/Common/TimeLine/TimeLine';

function DashboardCrypto() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader title={'Dashboard'} />
      </PageTitleWrapper>
      <Container maxWidth="xl">
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
        >
          <Grid item xl={12} md={12} sm={12} xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h2" sx={{ fontWeight: '500' }}>
                Recent Activity
              </Typography>
              <SelectWithoutLabel />
            </Box>
          </Grid>

          <Grid
            item
            xl={6}
            xs={12}
            sm={12}
            md={6}
            sx={{
              position: 'relative',
              mt: 2,
              '&:before': {
                position: 'fixed',
                content: '""',
                border: ' 1px solid #d3d3d3',
                zIndex: 0,
                width: {
                  xl: '40%',
                  lg: '36%',
                  md: '33%',
                  sm: '94%',
                  xs: '94%'
                },
                height: '500px',
                borderRadius: '10px'
              }
            }}
          >
            <Box
              sx={{
                height: '500px',
                width: { sm: '100%' },
                p: 3,
                overflow: 'hidden',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '0.7em',
                  borderRadius: '5px'
                },
                '&::-webkit-scrollbar-track': {
                  background: '#ebebeb',
                  borderRadius: '5px'
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#fff',
                  border: '1px solid #ebebeb',
                  borderRadius: '5px'
                }
              }}
            >
              <TimeLine />
            </Box>
          </Grid>

          <Grid item xl={7} md={7} xs={12} sm={12}>
            <Box
              width={`100%`}
              sx={{
                border: '1px solid  #044b7e',
                borderRadius: '10px',
                background: '#e9ecef'
              }}
            >
              <Typography
                sx={{
                  color: ' #044b7e',
                  fontSize: '22px',
                  fontWeight: 'nomal',
                  padding: '17px'
                }}
              >
                Opps. You have no recent activity.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default DashboardCrypto;

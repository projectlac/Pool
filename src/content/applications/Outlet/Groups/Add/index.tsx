import { Box, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import PageHeader from 'src/components/Header/PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { ReactComponent as LeftArrow } from 'src/assets/images/svg/leftArrow.svg';
import Add from './Add';
import { useParams } from 'react-router';
function AddNewGroup() {
  const [edit, setEdit] = useState<boolean>(false);

  const { id } = useParams();
  useEffect(() => {
    if (id !== undefined) setEdit(true);
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{edit ? 'Edit Group' : 'New Group'}</title>
      </Helmet>
      <PageTitleWrapper>
        <Link
          to={`${process.env.REACT_APP_BASE_NAME}/outlet/groups`}
          style={{ textDecoration: 'none', color: '#044b7e' }}
        >
          <Typography
            sx={{ fontSize: '16px', display: 'flex', alignItems: 'center' }}
          >
            <LeftArrow style={{ transform: 'scale(2)', marginRight: '10px' }} />
            <span>back to Groups Listening</span>
          </Typography>
        </Link>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <PageHeader title={edit ? 'Edit Group' : 'New Group'} />
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
            <Add editMode={edit} editId={id} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AddNewGroup;

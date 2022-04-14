import { Grid, Typography } from '@mui/material';
import React from 'react';
import SelectPageWithoutLabel from '../SelectWithoutLabel/SelectPageWithoutLabel';
import UsePagination from './UsePagination';

function Pagination(props) {
  return (
    <Grid container>
      <Grid item md={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <SelectPageWithoutLabel />
        <Typography color="#959ca3" ml={1}>
          Item per page
        </Typography>
      </Grid>
      <Grid item md={6}>
        <UsePagination />
      </Grid>
    </Grid>
  );
}

export default Pagination;

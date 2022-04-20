import { Grid, Typography } from '@mui/material';
import React from 'react';
import SelectPageWithoutLabel from '../SelectWithoutLabel/SelectPageWithoutLabel';
import UsePagination from './UsePagination';

function Pagination(props) {
  const { total, handleSetIndex, handleSetPage, page, index } = props;
  return (
    <Grid container>
      <Grid item md={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <SelectPageWithoutLabel handleSetPage={handleSetPage} />
        <Typography color="#959ca3" ml={1}>
          Item per page
        </Typography>
      </Grid>
      <Grid item md={6}>
        {total > page && (
          <UsePagination
            total={total}
            indexPage={index}
            handleSetIndex={handleSetIndex}
            page={page}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default Pagination;

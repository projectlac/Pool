import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Box, Typography } from '@mui/material';

export default function TimeLine() {
  return (
    <Timeline>
      <Typography variant="h3">Today</Typography>
      <Box sx={{ px: 3, mt: 2 }}>
        {[...Array(8)].map((d, index) => (
          <TimelineItem
            key={index}
            sx={{ '&:last-child .MuiTimelineConnector-root': { top: '0' } }}
          >
            <TimelineSeparator>
              <TimelineDot sx={{ background: '#000' }} />
              <TimelineConnector
                sx={{
                  top: '50%'
                }}
              />
            </TimelineSeparator>
            <TimelineContent>
              <Typography
                sx={{
                  fontSize: '16px'
                }}
              >
                Eden Created
              </Typography>
              <Typography
                sx={{
                  color: '#ddd',
                  mt: 1,
                  pb: 2,
                  borderBottom: '1px solid #ddd'
                }}
              >
                10-03-2020
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Box>
    </Timeline>
  );
}

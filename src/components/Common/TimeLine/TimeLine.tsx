import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Box, Typography } from '@mui/material';
import { Audit } from 'src/models/audit';

interface PropsTimeLine {
  auditData: Audit[];
  day: string;
}
export default function TimeLine({ auditData, day }: PropsTimeLine) {
  return (
    <Timeline>
      <Typography variant="h3">{day}</Typography>
      <Box sx={{ px: 3, mt: 2 }}>
        {auditData.map((d, index) => (
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
                {d.action}
              </Typography>
              <Typography
                sx={{
                  color: '#ddd',
                  mt: 1,
                  pb: 2,
                  borderBottom: '1px solid #ddd'
                }}
              >
                {`${d.createdDate.split('T')[0]} / ${
                  d.createdDate.split('T')[1]
                }`}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Box>
    </Timeline>
  );
}

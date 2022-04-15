import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import SelectDuration from '../SelectWithoutLabel/SelectDuration';
import { fileObject } from 'src/models/fileObject';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#ebebeb',
    color: '#576271',
    padding: '10px 16px'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    background: '#fff',
    color: '#57738f',
    padding: '10px 16px'
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

interface PropsTableUpload {
  numberOfContent: string;
  indexQuestion: number;
  handleUploadFile: (file: File, indexQuestion: number) => void;
}

export default function UploadTableSurvey({
  numberOfContent,
  handleUploadFile,
  indexQuestion
}: PropsTableUpload) {
  const [defautFileList, setDefautFileList] = React.useState<File>(undefined);
  const handleUpload = (e) => {
    setDefautFileList((e.target as HTMLInputElement).files[0]);
    handleUploadFile((e.target as HTMLInputElement).files[0], indexQuestion);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ border: '1px solid #ddd', boxShadow: 'none' }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell width={'50%'}>File Name</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(+numberOfContent)].map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {defautFileList !== undefined ? (
                  defautFileList.name
                ) : (
                  <Box
                    component="label"
                    sx={{
                      display: 'flex',
                      alignItem: 'center',
                      lineHeight: 2
                    }}
                  >
                    <input
                      type="file"
                      hidden
                      accept=".jpg, .png"
                      onChange={handleUpload}
                    />
                    <DriveFileMoveIcon sx={{ marginRight: '10px' }} /> Upload
                    New File
                  </Box>
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                {defautFileList !== undefined ? (
                  <Box>
                    <Box component="label">
                      <DriveFileMoveIcon />
                      <input
                        type="file"
                        hidden
                        accept=".jpg, .png"
                        onChange={(e) => {
                          handleUpload(handleUpload);
                        }}
                      />
                    </Box>

                    <CloseIcon
                      color="error"
                      onClick={() => {
                        setDefautFileList(undefined);
                      }}
                    />
                  </Box>
                ) : (
                  ''
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

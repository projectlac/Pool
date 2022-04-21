import CloseIcon from '@mui/icons-material/Close';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { AuthContext } from 'src/App';
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
  fileName: string;
  handleUploadFile: (file: File, indexQuestion: number) => void;
}

export default function UploadTableSurvey({
  numberOfContent,
  handleUploadFile,
  indexQuestion,
  fileName
}: PropsTableUpload) {
  const [defautFileList, setDefautFileList] = React.useState<File>(undefined);

  const { handleOpenToast, handleChangeMessageToast } =
    React.useContext(AuthContext);

  const handleUpload = (e) => {
    const file = (e.target as HTMLInputElement).files[0];

    if (
      file.type.toLocaleLowerCase().includes('jpg') ||
      file.type.toLocaleLowerCase().includes('png') ||
      file.type.toLocaleLowerCase().includes('jpeg')
    ) {
      if (file.size <= 5 * 1204 * 1024) {
        setDefautFileList((e.target as HTMLInputElement).files[0]);
        handleUploadFile(
          (e.target as HTMLInputElement).files[0],
          indexQuestion
        );
      } else {
        handleChangeMessageToast('This file too large');
        handleOpenToast();
      }
    } else {
      if (file.type.toLocaleLowerCase().includes('mp4')) {
        if (file.size <= 2 * 1204 * 1024 * 1024) {
          setDefautFileList((e.target as HTMLInputElement).files[0]);
          handleUploadFile(
            (e.target as HTMLInputElement).files[0],
            indexQuestion
          );
        } else {
          handleChangeMessageToast('This file too large');
          handleOpenToast();
        }
      }
      handleChangeMessageToast('Incorrect format');
      handleOpenToast();
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ border: '1px solid #ddd', boxShadow: 'none' }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell width={'50%'}>
              File Name{' '}
              <span
                style={{
                  fontSize: '12px',
                  color: '#999',
                  textTransform: 'initial',
                  fontWeight: 'normal',
                  marginLeft: '10px'
                }}
              >
                (Please upload in .JPG/ .PNG, max 5MB)
              </span>
            </StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(+numberOfContent)].map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {defautFileList !== undefined ? (
                  defautFileList.name
                ) : fileName !== undefined ? (
                  fileName
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
                {defautFileList !== undefined || fileName !== undefined ? (
                  <Box>
                    <Box component="label">
                      <DriveFileMoveIcon />
                      <input
                        type="file"
                        hidden
                        accept=".jpg, .png"
                        onChange={(e) => {
                          handleUpload(e);
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

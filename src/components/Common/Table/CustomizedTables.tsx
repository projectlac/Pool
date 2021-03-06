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
import { useContext } from 'react';
import { AuthContext } from 'src/App';
import { fileObject } from 'src/models/fileObject';
import SelectDuration from '../SelectWithoutLabel/SelectDuration';
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
  fileList: fileObject[];
  handleUploadFile: (file: fileObject[]) => void;
}

export default function CustomizedTables({
  numberOfContent,
  fileList,
  handleUploadFile
}: PropsTableUpload) {
  const { handleOpenToast, handleChangeMessageToast } = useContext(AuthContext);

  const [defautFileList, setDefautFileList] = React.useState<fileObject[]>([
    { id: '', fileName: '', file: undefined, duration: '5', seq: '1' },
    { id: '', fileName: '', file: undefined, duration: '5', seq: '1' },
    { id: '', fileName: '', file: undefined, duration: '5', seq: '1' }
  ]);

  React.useEffect(() => {
    let temp = [...defautFileList];
    fileList.forEach((d, index) => {
      temp[index] = d;
    });
    setDefautFileList(temp);
    console.log(temp);
  }, [fileList]);

  const handleUpload = (e, index) => {
    const file = (e.target as HTMLInputElement).files[0];
    let tempData = [...defautFileList];
    if (
      file.type.toLocaleLowerCase().includes('jpg') ||
      file.type.toLocaleLowerCase().includes('png') ||
      file.type.toLocaleLowerCase().includes('jpeg')
    ) {
      if (file.size <= 5 * 1204 * 1024) {
        tempData[index].file = file;
        setDefautFileList(tempData);
        handleUploadFile(tempData);
      } else {
        handleChangeMessageToast('This file too large');
        handleOpenToast();
      }
    } else {
      if (file.type.toLocaleLowerCase().includes('mp4')) {
        if (file.size <= 2 * 1204 * 1024 * 1024) {
          tempData[index].file = file;
          setDefautFileList(tempData);
          handleUploadFile(tempData);
        } else {
          handleChangeMessageToast('This file too large');
          handleOpenToast();
        }
      }
      handleChangeMessageToast('Incorrect format');
      handleOpenToast();
    }
  };

  const handleTime = (index: number, title: string, quality: string) => {
    let tempData = [...defautFileList];
    tempData[index][title] = quality;

    setDefautFileList(tempData);
    handleUploadFile(tempData);
  };

  const deleteFile = (index: number) => {
    let tempData = [...defautFileList];
    tempData[index].file = undefined;
    setDefautFileList(tempData);
    handleUploadFile(tempData);
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
            <StyledTableCell align="center">Duration</StyledTableCell>
            <StyledTableCell align="center">Seq.</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(+numberOfContent)].map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {defautFileList[index].file !== undefined ? (
                  defautFileList[index].file.name
                ) : (
                  <Box
                    component="label"
                    sx={{
                      display: 'flex',
                      alignItem: 'center',
                      lineHeight: 2
                    }}
                  >
                    {fileList[index]?.fileName ? (
                      fileList[index]?.fileName
                    ) : (
                      <>
                        <input
                          type="file"
                          hidden
                          accept=".jpg, .png"
                          onChange={(e) => {
                            handleUpload(e, index);
                          }}
                        />
                        <DriveFileMoveIcon sx={{ marginRight: '10px' }} />{' '}
                        Upload New File
                      </>
                    )}
                  </Box>
                )}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Box>
                  <Box component="label">
                    <DriveFileMoveIcon />
                    <input
                      type="file"
                      hidden
                      accept=".jpg, .png"
                      onChange={(e) => {
                        handleUpload(e, index);
                      }}
                    />
                  </Box>

                  <CloseIcon
                    color="error"
                    onClick={() => {
                      deleteFile(index);
                    }}
                  />
                </Box>
              </StyledTableCell>
              <StyledTableCell align="center">
                <SelectDuration
                  value={['5', '10', '15', '20', '15', '30']}
                  defaultValue={defautFileList[index].duration}
                  index={index}
                  title={'duration'}
                  handleTime={handleTime}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <SelectDuration
                  value={['1', '2', '3']}
                  defaultValue={defautFileList[index].seq}
                  index={index}
                  handleTime={handleTime}
                  title={'seq'}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

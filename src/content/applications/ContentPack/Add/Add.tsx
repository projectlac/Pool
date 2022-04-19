import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import userApi from 'src/api/userApi';
import BootstrapInput from 'src/components/Common/BootstrapInput/BootstrapInput';
import LabelInput from 'src/components/Common/BootstrapInput/LabelInput';
import SubmitNav from 'src/components/Common/SubmitNav/SubmitNav';
import CustomizedTables from 'src/components/Common/Table/CustomizedTables';
import { PropsEdit } from 'src/models';
import { fileObject } from 'src/models/fileObject';

function Add({ editId, editMode }: PropsEdit) {
  const [numberOfContent, setNumberOfContent] = useState<string>('1');

  const handleChange = (event: SelectChangeEvent) => {
    setNumberOfContent(event.target.value);
  };

  const { register, handleSubmit } = useForm();
  const [fileList, setFileList] = useState<fileObject[]>([]);
  const onSubmit = (data) => {
    const { contentName } = data;
    //
    console.log(fileList, contentName);
  };

  const submitFromNav = () => {
    handleSubmit(onSubmit);
  };
  const handleUploadFile = (file: fileObject[]) => {
    setFileList(file);
  };

  useEffect(() => {
    if (editId) {
    }
  }, [editId]);
  return (
    <Grid container>
      <Grid item md={12}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid item md={6}>
            <FormControl variant="standard" sx={{ width: '100%' }}>
              <LabelInput shrink htmlFor="bootstrap-input">
                Content Pack Name
              </LabelInput>
              <BootstrapInput
                sx={{
                  '& .MuiInputBase-input': {
                    border: '1px solid #ddd',
                    background: '#fff',
                    height: '35px'
                  }
                }}
                defaultValue=""
                placeholder="Default input"
                id="bootstrap-input"
                {...register('contentName')}
              />
            </FormControl>
            <Box sx={{ mt: 3 }}>
              <Typography
                sx={{
                  fontSize: '17px',
                  fontWeight: 'bold',
                  color: '#044b7e',
                  mb: 1
                }}
              >
                Number of Content
              </Typography>
              <Select
                value={numberOfContent}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{
                  minWidth: 75,
                  '& .MuiOutlinedInput-input': {
                    background: '#fff',
                    padding: '13px',
                    color: '#000',

                    fontSize: '16px',
                    alignItems: 'center',
                    display: 'flex'
                  },
                  '& fieldset': {
                    borderColor: '#ddd'
                  },
                  '& .MuiSelect-icon': {
                    color: '#044b7e'
                  }
                }}
              >
                <MenuItem value={'1'}>1</MenuItem>
                <MenuItem value={'2'}>2</MenuItem>
                <MenuItem value={'3'}>3</MenuItem>
              </Select>
            </Box>
            <Box sx={{ mt: 3 }}>
              <LabelInput
                sx={{
                  fontSize: '17px',
                  fontWeight: 'bold',
                  color: '#044b7e',
                  mb: 1
                }}
              >
                Content Upload
                <span
                  style={{
                    fontSize: '13px',
                    color: '#999',
                    fontWeight: 'normal',
                    marginLeft: '10px'
                  }}
                >
                  (Please upload in .JPG/ .PNG, max 5MB)
                </span>
              </LabelInput>
              <Box>
                <CustomizedTables
                  numberOfContent={numberOfContent}
                  handleUploadFile={handleUploadFile}
                />
              </Box>
            </Box>
          </Grid>
          <SubmitNav
            onSubmit={submitFromNav}
            editMode={editMode}
            isShowDraftBtn={true}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Add;

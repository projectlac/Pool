import {
  Box,
  FormControl,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import contentPackApi from 'src/api/contentPackApi';
import { AuthContext } from 'src/App';
import BootstrapInput from 'src/components/Common/BootstrapInput/BootstrapInput';
import LabelInput from 'src/components/Common/BootstrapInput/LabelInput';
import SubmitNav from 'src/components/Common/SubmitNav/SubmitNav';
import CustomizedTables from 'src/components/Common/Table/CustomizedTables';
import { PropsEdit } from 'src/models';
import { fileObject } from 'src/models/fileObject';

function Add({ editId, editMode }: PropsEdit) {
  const { handleOpenToast, handleChangeMessageToast } = useContext(AuthContext);

  const [numberOfContent, setNumberOfContent] = useState<string>('1');
  const [idContentPack, setIdContentPack] = useState<string>(undefined);

  const [status, setStatus] = useState<string>('1');
  const handleChange = (event: SelectChangeEvent) => {
    setNumberOfContent(event.target.value);
  };
  const nav = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [fileList, setFileList] = useState<fileObject[]>([
    { id: '', fileName: '', file: undefined, duration: '10', seq: '5' },
    { id: '', fileName: '', file: undefined, duration: '10', seq: '5' },
    { id: '', fileName: '', file: undefined, duration: '10', seq: '5' }
  ]);
  const onSubmit = (data) => {
    const { contentName } = data;

    // console.log(fileList, contentName, numberOfContent, status);
    const formData = new FormData();

    formData.append('Name', contentName);
    formData.append('NumberOfContent', numberOfContent);
    formData.append('ContentPackStatus', status);
    fileList.forEach((d, index) => {
      formData.append(`ContentUploads[${index}].FileUpload`, d.file);
      formData.append(`ContentUploads[${index}].Duration`, d.duration);
      formData.append(`ContentUploads[${index}].Seq`, d.seq);
    });

    try {
      if (editId === undefined) {
        contentPackApi.add(formData).then((res) => {
          handleOpenToast();
          handleChangeMessageToast(res.data.message);
          if (res.data.success) {
            nav(`${process.env.REACT_APP_BASE_NAME}/content-pack`);
          }
        });
      } else {
        formData.append('Id', editId);
        contentPackApi.update(formData).then((res) => {
          handleOpenToast();
          handleChangeMessageToast(res.data.message);
          if (res.data.success) {
            nav(`${process.env.REACT_APP_BASE_NAME}/content-pack`);
          }
        });
      }
    } catch (error) {}
  };

  const submitAsDraft = async () => {
    setStatus('1');
    handleSubmit(onSubmit);
  };

  const submitFromNav = async () => {
    setStatus('2');
    handleSubmit(onSubmit);
  };
  const handleUploadFile = (file: fileObject[]) => {
    setFileList(file);
  };

  useEffect(() => {
    if (editId) {
      contentPackApi.getDataById(editId).then((res) => {
        if (res.data.success) {
          let data = res.data.data;
          setIdContentPack(data.id);
          setNumberOfContent(data.numberOfContent);
          setValue('contentName', data.name);
          let tempData = [...data.contentUploads].map((data) => ({
            ...data,
            file: undefined
          }));

          setFileList(tempData);
        }
      });
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
                error={Boolean(errors.contentName)}
                placeholder="Default input"
                id="bootstrap-input"
                {...register('contentName', { required: true })}
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
                  fileList={fileList}
                />
              </Box>
            </Box>
          </Grid>
          <SubmitNav
            idContentPack={idContentPack}
            page={'content-pack'}
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

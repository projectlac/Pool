import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import surveyApi from 'src/api/surveyApi';
import { AuthContext } from 'src/App';

export default function DeleteSurvey(props) {
  const { id } = props;
  const [open, setOpen] = React.useState(false);
  const { handleOpenToast, updateSuccess, handleChangeMessageToast } =
    React.useContext(AuthContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    surveyApi.delete(id).then((res) => {
      handleOpenToast();
      handleChangeMessageToast(res.data.message);
    });
    updateSuccess();
    handleClose();
  };
  return (
    <div>
      <CloseOutlinedIcon color="error" onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ p: 5 }}
      >
        <DialogTitle id="alert-dialog-title">
          Do you want delete this survey
        </DialogTitle>

        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="error"
            sx={{ marginRight: '15px' }}
          >
            Disagree
          </Button>
          <Button
            onClick={handleSubmit}
            autoFocus
            variant="contained"
            color="primary"
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

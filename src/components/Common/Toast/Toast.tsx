import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';

export default function Toast(props) {
  const { open, message, onClose } = props;
  React.useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 3000);
  }, [open]);
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClose}
      >
        <CloseIcon fontSize="small" onClick={onClose} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
        message={message}
        action={action}
        key={'top right'}
      />
    </div>
  );
}

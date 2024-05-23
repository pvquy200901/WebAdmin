import  { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const DeleteConfirmationDialog = ({ code, onConfirm }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    onConfirm(code)
    setOpen(false);
  };
 
  return (
    <>
      <IconButton onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          Bạn có chắc chắn muốn xóa?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleConfirm} autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DeleteConfirmationDialog.propTypes = {
    onConfirm: PropTypes.func.isRequired,
    code: PropTypes.string.isRequired,
  };
export default DeleteConfirmationDialog;

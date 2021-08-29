import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

function Alert({ title, detail, handleClose, handleContinue, open }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {detail}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleContinue} color="primary">
          Endelea
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Acha
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleContinue: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Alert;

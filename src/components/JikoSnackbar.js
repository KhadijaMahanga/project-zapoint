import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";
import React from "react";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function JikoSnackbar({ message, onClose, open, status }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
    >
      <Alert onClose={onClose} severity={status}>
        {message}
      </Alert>
    </Snackbar>
  );
}

JikoSnackbar.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  status: PropTypes.oneOf(["success", "error"]),
};

JikoSnackbar.defaultProps = {
  message: undefined,
  open: undefined,
  onClose: undefined,
  status: undefined,
};

export default JikoSnackbar;

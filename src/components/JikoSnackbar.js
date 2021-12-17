import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";
import React from "react";

import RichTypography from "@/jikopoint/components/RichTypography";

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
        <RichTypography style={{ color: "#fff" }} variant="caption">
          {message}
        </RichTypography>
      </Alert>
    </Snackbar>
  );
}

JikoSnackbar.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  status: PropTypes.oneOf(["success", "warning", "error"]),
};

JikoSnackbar.defaultProps = {
  message: undefined,
  open: undefined,
  onClose: undefined,
  status: undefined,
};

export default JikoSnackbar;

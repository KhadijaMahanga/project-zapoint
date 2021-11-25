import { Dialog, DialogContent } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

function Notification({ handleCloseDialog, openDialog, children }) {
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-category"
      fullWidth
      maxWidth="md"
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

Notification.propTypes = {
  handleCloseDialog: PropTypes.func,
  openDialog: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Notification.defaultProps = {
  handleCloseDialog: undefined,
  openDialog: undefined,
  children: undefined,
};

export default Notification;

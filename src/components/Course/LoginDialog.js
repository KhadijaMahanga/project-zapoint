import { Dialog, DialogContent } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

import Login from "@/jikopoint/components/Auth/Login";

function LoginDialog({ handleCloseDialog, openDialog, title, ...props }) {
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-category"
      fullWidth
      maxWidth="md"
    >
      <DialogContent>
        <Login
          {...props}
          title={title}
          isDialog
          onSuccess={handleCloseDialog}
        />
      </DialogContent>
    </Dialog>
  );
}

LoginDialog.propTypes = {
  handleCloseDialog: PropTypes.func,
  openDialog: PropTypes.bool,
  title: PropTypes.string,
};

LoginDialog.defaultProps = {
  handleCloseDialog: undefined,
  openDialog: undefined,
  title: "Tafadhali, Ingia kwanza",
};

export default LoginDialog;

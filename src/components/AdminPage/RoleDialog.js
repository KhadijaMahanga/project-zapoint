import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {},
  label: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(16),
  },
}));

function RoleDialog({
  handleCloseDialog,
  openDialog,
  variant,
  name: nameProp,
  ...props
}) {
  const classes = useStyles(props);
  const [name, setName] = useState(nameProp);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (name?.length) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ name }),
      };
      const role = await fetch("/api/roles", options);
      setName(role?.name);
    }

    handleCloseDialog();
  };

  const title = variant === "add" ? "Ongeza Jukumu" : "Hariri";
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-role"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
        <DialogContent>
          <Grid container alignItems="center" justifyContent="space-around">
            <Grid item container>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Jina"
                autoFocus
                InputLabelProps={{ classes: { root: classes.label } }}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Ghairi
          </Button>
          <Button type="submit" color="primary">
            Hifadhi
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

RoleDialog.propTypes = {
  handleCloseDialog: PropTypes.func,
  openDialog: PropTypes.bool,
  variant: PropTypes.oneOf(["add", "edit"]),
  name: PropTypes.string,
};

RoleDialog.defaultProps = {
  handleCloseDialog: undefined,
  openDialog: undefined,
  variant: "add",
  name: undefined,
};

export default RoleDialog;

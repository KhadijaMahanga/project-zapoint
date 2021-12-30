/* eslint-disable no-underscore-dangle */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";

import fetcher from "@/jikopoint/utils/fetcher";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {},
  label: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(16),
  },
  futaButton: {
    backgroundColor: "#CC8585",
    color: "white",
  },
  dialogActions: {
    padding: `${typography.pxToRem(8)} ${typography.pxToRem(24)}`,
  },
}));

function UserDialog({ handleCloseDialog, openDialog, onUpdate, ...props }) {
  const classes = useStyles(props);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ name, email, role, password }),
    };
    await fetcher("/api/users", options);
    if (onUpdate) {
      onUpdate();
    }
    handleCloseDialog();
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-category"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">Mtumiaji Mpya</DialogTitle>
      <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
        <DialogContent>
          <TextField
            autoComplete="fname"
            name="name"
            margin="normal"
            variant="outlined"
            value={name}
            required
            fullWidth
            id="name"
            label="Jina"
            InputLabelProps={{ classes: { root: classes.label } }}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoComplete="femail"
            name="email"
            margin="normal"
            variant="outlined"
            value={email}
            required
            fullWidth
            id="email"
            label="Barua Pepe"
            InputLabelProps={{ classes: { root: classes.label } }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            autoComplete="fpassword"
            name="password"
            margin="normal"
            variant="outlined"
            value={password}
            required
            fullWidth
            id="password"
            label="Nywila"
            autoFocus
            InputLabelProps={{ classes: { root: classes.label } }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            id="role"
            select
            margin="normal"
            label="Jukumu"
            placeholder="Chagua jukumu la mtumiaji"
            value={role}
            fullWidth
            onChange={(e) => setRole(e.target.value)}
            SelectProps={{
              native: true,
            }}
            InputLabelProps={{ classes: { root: classes.label } }}
            variant="outlined"
          >
            <option value="trainee">Mwanafunzi</option>
            <option value="trainer">Mkufunzi</option>
            <option value="admin">Admin</option>
          </TextField>
        </DialogContent>
        <DialogActions classes={{ root: classes.dialogActions }}>
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

UserDialog.propTypes = {
  handleCloseDialog: PropTypes.func,
  openDialog: PropTypes.bool,
  onUpdate: PropTypes.func,
};

UserDialog.defaultProps = {
  handleCloseDialog: undefined,
  openDialog: undefined,
  onUpdate: undefined,
};

export default UserDialog;

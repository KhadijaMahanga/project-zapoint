/* eslint-disable no-underscore-dangle */
import {
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
  Button,
  Divider,
  LinearProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import bcrypt from "bcryptjs";
import { getCsrfToken, signOut } from "next-auth/react";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import fetcher from "@/jikopoint/utils/fetcher";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {},
  label: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(16),
  },
  divider: {
    background: palette.text.primary,
  },
  notification: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(13),
  },
  button: {
    color: palette.text.secondary,
    background: palette.primary.main,
    marginBottom: typography.pxToRem(20),
  },
  futaButton: {
    margin: `${typography.pxToRem(20)} 0`,
    color: palette.text.secondary,
    backgroundColor: "#CC8585",
    "&:hover": {
      backgroundColor: "#CC8585",
      opacity: 0.7,
    },
  },
}));

function Account({ user, ...props }) {
  const classes = useStyles(props);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [reTypePassword, setReTypePassword] = useState(null);
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    setEmail(user?.email);
  }, [user]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
    const dOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ isDeleted: true }),
    };
    const newUser = await fetcher(`/api/users/${user?._id}`, dOptions);
    if (newUser?.success) {
      signOut();
    } else {
      setNotification("Kuna tatizo la kiufundi, jaribu tena baadae");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setNotification("Tunashughulikia....");

    if (
      !password?.length &&
      !newPassword?.length < 7 &&
      !reTypePassword?.length < 7
    ) {
      setNotification("Nywila inatakiwa iwe na herufi zaidi ya 6 ");
    } else if (password === newPassword) {
      setNotification("Nywila mpya inafanana na ya mwanzo. Chagua nyingine");
    } else if (newPassword !== reTypePassword) {
      setNotification("Nywila mpya si sawa na uliyochapisha mara ya pili");
    } else if (!(await bcrypt.compare(password, user?.password))) {
      setNotification("Nywila yako haiko sahihi");
    } else {
      const csrfToken = await getCsrfToken();
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ newPassword, csrfToken }),
      };
      const newUser = await fetcher(`/api/users/password`, options);
      if (newUser?.success) {
        setNotification("Umefanikiwa kuhifadhi nywila mpya");
      } else {
        setNotification("Kuna tatizo la kiufundi, jaribu tena baadae");
      }
    }
    setTimeout(() => {
      setNotification("");
    }, 600);
  };

  return (
    <>
      <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
        <TextField
          autoComplete="fname"
          name="email"
          variant="outlined"
          value={email}
          margin="normal"
          fullWidth
          id="email"
          label="Barua Pepe"
          disabled
          InputLabelProps={{ classes: { root: classes.label } }}
        />
        <TextField
          autoComplete="fpassword"
          name="password"
          variant="outlined"
          value={password}
          fullWidth
          margin="normal"
          id="password"
          label="Nywila"
          InputLabelProps={{ classes: { root: classes.label } }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          autoComplete="fnewpassword"
          name="newpassword"
          variant="outlined"
          value={newPassword}
          fullWidth
          margin="normal"
          id="newpassword"
          label="Nywila mpya"
          InputLabelProps={{ classes: { root: classes.label } }}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          autoComplete="fretypepassword"
          name="retypepassword"
          variant="outlined"
          value={reTypePassword}
          fullWidth
          margin="normal"
          id="password"
          label="Rudia Nywila mpya"
          InputLabelProps={{ classes: { root: classes.label } }}
          onChange={(e) => setReTypePassword(e.target.value)}
        />
        {notification?.length > 0 && (
          <>
            <Typography className={classes.notification}>
              {notification}
            </Typography>
            {notification.includes("Tunashughulikia") ? (
              <LinearProgress />
            ) : null}
          </>
        )}
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.button}
        >
          Hifadhi
        </Button>
      </form>
      <Divider className={classes.divider} />
      <Button
        fullWidth
        variant="contained"
        classes={{ contained: classes.futaButton }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Futa Akaunti
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography>Una hakiki kufuta account yako?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hapana
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Ndio
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

Account.propTypes = {
  profile: PropTypes.shape({
    bio: PropTypes.string,
    social: PropTypes.shape({}),
    _id: PropTypes.string,
  }),
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
  }),
};

Account.defaultProps = {
  profile: undefined,
  user: undefined,
};

export default Account;

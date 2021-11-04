/* eslint-disable no-underscore-dangle */
import {
  TextField,
  Typography,
  Button,
  LinearProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import fetcher from "@/jikopoint/utils/fetcher";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {},
  label: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(16),
  },
  caption: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(13),
    textDecoration: "underline",
    marginTop: typography.pxToRem(20),
    marginBottom: typography.pxToRem(5),
  },
  notification: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(13),
  },
  button: {
    color: palette.text.secondary,
  },
}));

function Basic({ user, profile, ...props }) {
  const classes = useStyles(props);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [social, setSocial] = useState({});
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    if (profile) {
      setBio(profile?.bio);
      setSocial(profile?.social);
    }
  }, [profile, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setNotification("Tunashughulikia....");

    const newName = name !== user?.name ? name : null;

    let newProfile;
    if (!profile) {
      const postoptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ bio, social, user: user?._id, name: newName }),
      };
      newProfile = await fetcher("/api/profile", postoptions);
    } else {
      const putoptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ bio, social, user: user?._id, name: newName }),
      };
      newProfile = await fetcher(`/api/profile/${profile?._id}`, putoptions);
    }
    if (newProfile?.success) {
      setNotification("Umefanikiwa kuhifadhi");
    } else {
      setNotification("Samahani, huduma imesitisha. Jaribu tena");
    }
    setTimeout(() => {
      setNotification("");
    }, 4000);
  };

  return (
    <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
      <TextField
        autoComplete="fname"
        name="name"
        variant="outlined"
        value={name}
        margin="normal"
        fullWidth
        id="name"
        label="Jina"
        autoFocus
        InputLabelProps={{ classes: { root: classes.label } }}
        onChange={(e) => setName(e.target.value)}
      />
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
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        autoComplete="fbio"
        name="bio"
        variant="outlined"
        value={bio}
        fullWidth
        multiline
        rows={4}
        margin="normal"
        id="duration"
        label="wasifu mfupi"
        InputLabelProps={{ classes: { root: classes.label } }}
        onChange={(e) => setBio(e.target.value)}
      />
      <Typography className={classes.caption}>
        Akaunti za social media.
      </Typography>
      <TextField
        autoComplete="ftype"
        name="type"
        variant="outlined"
        value={social?.twitter}
        fullWidth
        margin="normal"
        id="type"
        label="Jina la twitter"
        InputLabelProps={{ classes: { root: classes.label } }}
        onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
      />
      <TextField
        autoComplete="ftype"
        name="facebook"
        variant="outlined"
        value={social?.facebook}
        fullWidth
        margin="normal"
        id="type"
        label="Jina la facebook"
        InputLabelProps={{ classes: { root: classes.label } }}
        onChange={(e) => setSocial({ ...social, facebook: e.target.value })}
      />
      <TextField
        autoComplete="ftype"
        name="linkedin"
        variant="outlined"
        value={social?.linkedin}
        fullWidth
        margin="normal"
        id="type"
        label="Jina la linkedin"
        InputLabelProps={{ classes: { root: classes.label } }}
        onChange={(e) => setSocial({ ...social, linkedin: e.target.value })}
      />
      <TextField
        autoComplete="ftype"
        name="instagram"
        variant="outlined"
        value={social?.instagram}
        fullWidth
        margin="normal"
        id="type"
        label="Jina la instagram"
        InputLabelProps={{ classes: { root: classes.label } }}
        onChange={(e) => setSocial({ ...social, instagram: e.target.value })}
      />

      <TextField
        autoComplete="ftype"
        name="youtube"
        variant="outlined"
        value={social?.youtube}
        fullWidth
        margin="normal"
        id="type"
        label="Jina la youtube"
        InputLabelProps={{ classes: { root: classes.label } }}
        onChange={(e) => setSocial({ ...social, youtube: e.target.value })}
      />
      {notification?.length > 0 && (
        <>
          <Typography className={classes.caption}>{notification}</Typography>
          {notification.includes("Tunashughulikia") ? <LinearProgress /> : null}
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
  );
}

Basic.propTypes = {
  profile: PropTypes.shape({
    bio: PropTypes.string,
    social: PropTypes.shape({}),
    _id: PropTypes.string,
  }),
  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

Basic.defaultProps = {
  profile: undefined,
  user: undefined,
};

export default Basic;

import { TextField, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import bcrypt from "bcryptjs";
import { getSession, getCsrfToken, signOut } from "next-auth/client";
import PropTypes from "prop-types";
import React, { useState } from "react";

import Page from "@/jikopoint/components/Page";
import Section from "@/jikopoint/components/Section";
import fetcher from "@/jikopoint/utils/fetcher";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    padding: `${typography.pxToRem(40)} 0`,
    [breakpoints.up("md")]: {
      padding: `${typography.pxToRem(80)} 0`,
    },
  },
  section: {},
  label: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(16),
  },
  notification: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(13),
  },
  button: {
    color: palette.text.secondary,
    background: palette.primary.main,
    margin: `${typography.pxToRem(10)} 0`,
  },
}));

function NywilaMpya({ user, ...props }) {
  const classes = useStyles();
  const [newPassword, setNewPassword] = useState(null);
  const [reTypePassword, setReTypePassword] = useState(null);
  const [notification, setNotification] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setNotification("Tunashugulikia....");

    if (!newPassword?.length < 7 && !reTypePassword?.length < 7) {
      setNotification("Nywila inatakiwa iwe na herufi zaidi ya 6 ");
    } else if (newPassword !== reTypePassword) {
      setNotification("Nywila mpya si sawa na uliyochapisha mara ya pili");
    } else if (await bcrypt.compare(newPassword, user?.password)) {
      setNotification("Nywila hiyo imeshatumika");
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
    <Page {...props}>
      <div className={classes.root}>
        <Section classes={{ root: classes.section }}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Typography color="primary" variant="subtitle1">
                Badilisha Nywila yako kwa kujaza hapa chini
              </Typography>
              <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
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
                  <Typography className={classes.notification}>
                    {notification}
                  </Typography>
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
            </Grid>
          </Grid>
        </Section>
      </div>
    </Page>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const currentUser = await fetcher(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/users/${session?.user?.email}`
  );
  signOut({ redirect: false });

  return { props: { user: currentUser?.user } };
}

NywilaMpya.propTypes = {
  user: PropTypes.shape({
    password: PropTypes.string,
  }).isRequired,
};

export default NywilaMpya;

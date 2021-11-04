import {
  TextField,
  Typography,
  Button,
  Grid,
  LinearProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getSession } from "next-auth/client";
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

function SahauNywila() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(e);
    setNotification("Tunashughulikia...");
    if (!email?.length && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setNotification("Barua pepe ni batili");
    } else {
      const res = await fetcher("/api/users/password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.success) {
        setNotification("Ujumbe umetumwa kwenye barua pepe yako");
      } else {
        setNotification(res.message);
      }
    }
  };

  return (
    <Page>
      <div className={classes.root}>
        <Section classes={{ root: classes.section }}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Typography color="primary" variant="subtitle1">
                Umesahau Nywila? Ingiza barua pepe yako hapa chini na uwasilishe
              </Typography>
              <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
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
                <TextField
                  autoComplete="fname"
                  name="email"
                  variant="outlined"
                  value={email}
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Barua Pepe"
                  InputLabelProps={{ classes: { root: classes.label } }}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  className={classes.button}
                >
                  Wasilisha
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
  const { res } = context;
  const session = await getSession(context);

  if (session?.user) {
    res.writeHead(302, {
      Location: "/auth/nywila/mpya",
    });
    res.end();
    return null;
  }

  return {
    props: {
      sahau: true,
    },
  };
}

export default SahauNywila;

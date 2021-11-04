import { Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { signOut } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import Page from "@/jikopoint/components/Page";
import Section from "@/jikopoint/components/Section";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    padding: `${typography.pxToRem(40)} 0`,
    [breakpoints.up("md")]: {
      padding: `${typography.pxToRem(80)} 0`,
    },
  },
  section: {},
  button: {
    color: palette.text.secondary,
    background: palette.primary.main,
    margin: `${typography.pxToRem(10)} 0`,
  },
}));

function Thibitishwa() {
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    signOut({ redirect: false });
  }, []);

  const endelea = () => {
    signOut({ redirect: false });
    router.push("/auth/ingia");
  };

  return (
    <Page>
      <div className={classes.root}>
        <Section classes={{ root: classes.section }}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" color="primary">
                Umefanikiwa kuthibitisha akaunti yako. Ahsante kwa kujiunga na
                JikoPoint.
              </Typography>

              <Button
                onClick={endelea}
                color="primary"
                variant="contained"
                className={classes.button}
              >
                Endelea
              </Button>
            </Grid>
          </Grid>
        </Section>
      </div>
    </Page>
  );
}

export default Thibitishwa;

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

import { ReactComponent as IconLogin } from "@/jikopoint/assets/icons/icon-login-white.svg";
import Rgister from "@/jikopoint/components/Auth/Register";
import Page from "@/jikopoint/components/Page";
import Section from "@/jikopoint/components/Section";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  section: {
    height: "100vh",
    marginTop: typography.pxToRem(20),
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(40),
    },
  },
  iconDiv: {
    backgroundColor: palette.background.light,
    borderRadius: "50%",
    padding: typography.pxToRem(10),
    width: typography.pxToRem(45),
    color: palette.background.light,
    // height: typography.pxToRem(40),
    display: "inline-flex",
    alignContent: "center",
    alignSelf: "center",
    marginBottom: typography.pxToRem(10),
    [breakpoints.up("lg")]: {
      marginBottom: typography.pxToRem(20),
    },
  },
  icon: {
    width: typography.pxToRem(25),
    height: typography.pxToRem(25),
  },
  divider: {
    background: palette.text.primary,
  },
}));

function Jiunge() {
  const classes = useStyles();

  return (
    <Page>
      <Section className={classes.section}>
        <Grid
          container
          alignItems="center"
          justify="space-around"
          direction="column"
        >
          <div className={classes.iconDiv}>
            `<IconLogin className={classes.icon} />`
          </div>
          <Grid item xs={12}>
            <Typography variant="h4">Fungua akaunti mpya</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Rgister />
          </Grid>
        </Grid>
      </Section>
    </Page>
  );
}

export default Jiunge;

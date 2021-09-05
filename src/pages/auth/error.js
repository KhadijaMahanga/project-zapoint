import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

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

function Error() {
  const classes = useStyles();
  return (
    <Page>
      <div className={classes.root}>
        <Section classes={{ root: classes.section }}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" color="primary">
                Linki imeshatumitaka au muda wake umeisha.
              </Typography>
            </Grid>
          </Grid>
        </Section>
      </div>
    </Page>
  );
}
export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default Error;

import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getSession } from "next-auth/react";
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

function Kamilisha() {
  const classes = useStyles();
  return (
    <Page>
      <div className={classes.root}>
        <Section classes={{ root: classes.section }}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" color="primary">
                Ahsante kwa kujiandikisha, umetumiwa ujumbe wa kukamilisha.
                Nenda kwenye kisanduku pokezi na ufuate maelekezo.
              </Typography>
            </Grid>
          </Grid>
        </Section>
      </div>
    </Page>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}

export default Kamilisha;

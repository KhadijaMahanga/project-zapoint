import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getSession } from "next-auth/react";
import PropTypes from "prop-types";
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

const errors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  default: "Unable to sign in.",
};

function Error({ error }) {
  const classes = useStyles();
  const errorMessage = error && (errors[error] ?? errors.default);
  return (
    <Page>
      <div className={classes.root}>
        <Section classes={{ root: classes.section }}>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" color="primary">
                {errorMessage}
              </Typography>
            </Grid>
          </Grid>
        </Section>
      </div>
    </Page>
  );
}
export async function getServerSideProps(context) {
  const { error } = context.query;
  const session = await getSession(context);
  return {
    props: {
      error,
      session,
    },
  };
}

Error.defaultProps = {
  error: undefined,
};

Error.propTypes = {
  error: PropTypes.string,
};

export default Error;

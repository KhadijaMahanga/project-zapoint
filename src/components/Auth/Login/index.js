import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import LoginForm from "./LoginForm";

import { ReactComponent as IconFacebook } from "@/jikopoint/assets/icons/icon-facebook-white.svg";
import { ReactComponent as IconGoogle } from "@/jikopoint/assets/icons/icon-google-color.svg";
import { ReactComponent as IconLogin } from "@/jikopoint/assets/icons/icon-login-white.svg";
import { ReactComponent as IconTwitter } from "@/jikopoint/assets/icons/icon-twitter-white.svg";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
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
  socialBtn: {
    boxShadow: "0 2px 2px 0 rgb(28 29 31 / 24%), 0 0 2px 0 rgb(28 29 31 / 12%)",
    border: "1px solid #d1d7dc",
    marginTop: typography.pxToRem(20),
    padding: typography.pxToRem(15),
    width: "100%",
  },
  icon: {
    width: typography.pxToRem(25),
    height: typography.pxToRem(25),
  },
  facebook: {
    color: palette.text.secondary,
    background: "#1a538a",
    "&:hover": {
      background: "#1a538a",
    },
  },
  twitter: {
    background: "rgba(29,161,242,1.00)",
    color: palette.text.secondary,
    "&:hover": {
      background: "rgba(29,161,242,1.00)",
    },
  },
  divider: {
    marginTop: typography.pxToRem(20),
    display: "flex",
    alignItems: "center",
    color: palette.text.primary,
  },
  dividerBorder: {
    borderBottom: `1px solid ${palette.text.primary}`,
    width: "100%",
  },
  dividerSpan: {
    margin: `0 ${typography.pxToRem(5)}`,
  },
}));
function SwitchCase({ provider, signIn }) {
  const classes = useStyles();
  switch (provider.name) {
    case "Facebook":
      return (
        <Button
          classes={{ root: clsx(classes.socialBtn, classes.facebook) }}
          startIcon={<IconFacebook className={classes.icon} />}
          onClick={() => signIn(provider.id)}
        >
          Ingia kupitia {provider.name}
        </Button>
      );
    case "Google":
      return (
        <Button
          classes={{ root: clsx(classes.socialBtn, classes.google) }}
          startIcon={<IconGoogle className={classes.icon} />}
          onClick={() => signIn(provider.id)}
        >
          Ingia kupitia {provider.name}
        </Button>
      );
    case "Twitter":
      return (
        <Button
          classes={{ root: clsx(classes.socialBtn, classes.twitter) }}
          startIcon={<IconTwitter className={classes.icon} />}
          onClick={() => signIn(provider.id)}
        >
          Ingia kupitia {provider.name}
        </Button>
      );
    case "Login":
    case "Register":
    default:
      return null;
  }
}
SwitchCase.propTypes = {
  provider: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  signIn: PropTypes.func,
};

SwitchCase.defaultProps = {
  provider: undefined,
  signIn: undefined,
};

function Ingia({ csrfToken, signIn, providers, title, isDialog }) {
  const classes = useStyles();

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-around"
      direction="column"
    >
      {!isDialog && (
        <div className={classes.iconDiv}>
          `<IconLogin className={classes.icon} />`
        </div>
      )}
      <Grid item xs={12}>
        <Typography variant="h4">{title}</Typography>
      </Grid>
      <Grid item xs={12} md={isDialog ? 7 : 5}>
        <LoginForm signIn={signIn} csrfToken={csrfToken} />
        <div className={classes.divider}>
          <div className={classes.dividerBorder} />
          <span className={classes.dividerSpan}>au</span>
          <div className={classes.dividerBorder} />
        </div>
        {providers &&
          Object.values(providers).map((provider) => (
            <SwitchCase provider={provider} signIn={signIn} />
          ))}
      </Grid>
    </Grid>
  );
}

Ingia.propTypes = {
  signIn: PropTypes.func,
  csrfToken: PropTypes.string,
  providers: PropTypes.shape({}),
  title: PropTypes.string,
  isDialog: PropTypes.bool,
};

Ingia.defaultProps = {
  signIn: undefined,
  csrfToken: undefined,
  providers: undefined,
  title: "Ingia kwenye akaunti",
  isDialog: false,
};

export default Ingia;

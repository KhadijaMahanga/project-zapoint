import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import {
  signIn,
  getSession,
  getProviders,
  getCsrfToken,
} from "next-auth/client";
import PropTypes from "prop-types";
import React from "react";

import { ReactComponent as IconFacebook } from "@/jikopoint/assets/icons/icon-facebook-white.svg";
import { ReactComponent as IconGoogle } from "@/jikopoint/assets/icons/icon-google-color.svg";
import { ReactComponent as IconLogin } from "@/jikopoint/assets/icons/icon-login-white.svg";
import { ReactComponent as IconTwitter } from "@/jikopoint/assets/icons/icon-twitter-white.svg";
import Login from "@/jikopoint/components/Auth/Login";
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
  },
  twitter: {
    background: "rgba(29,161,242,1.00)",
    color: palette.text.secondary,
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
function SwitchCase({ provider }) {
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
    case "Credentials":
    default:
      return null;
  }
}
SwitchCase.propTypes = {
  provider: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

SwitchCase.defaultProps = {
  provider: undefined,
};

function Ingia({ providers, csrfToken }) {
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
            <Typography variant="h4">Ingia kwenye akaunti</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Login signIn={signIn} csrfToken={csrfToken} />
            <div className={classes.divider}>
              <div className={classes.dividerBorder} />
              <span className={classes.dividerSpan}>au</span>
              <div className={classes.dividerBorder} />
            </div>
            {providers &&
              Object.values(providers).map((provider) => (
                <SwitchCase provider={provider} />
              ))}
          </Grid>
        </Grid>
      </Section>
    </Page>
  );
}

Ingia.propTypes = {
  session: PropTypes.shape({}),
  providers: PropTypes.shape({}),
  csrfToken: PropTypes.string,
};

Ingia.defaultProps = {
  session: undefined,
  providers: undefined,
  csrfToken: undefined,
};

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return null;
  }
  return {
    props: {
      session: null,
      providers: await getProviders(context),
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default Ingia;

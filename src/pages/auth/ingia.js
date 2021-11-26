import { makeStyles } from "@material-ui/core/styles";
import { getSession, getProviders, getCsrfToken } from "next-auth/client";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

import Login from "@/jikopoint/components/Auth/Login";
import Page from "@/jikopoint/components/Page";
import Section from "@/jikopoint/components/Section";
import useAuth from "@/jikopoint/hooks/useAuth";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  section: {
    paddingTop: typography.pxToRem(20),
    paddingBottom: typography.pxToRem(20),
    [breakpoints.up("lg")]: {
      paddingTop: typography.pxToRem(40),
      paddingBottom: typography.pxToRem(40),
    },
  },
}));

function Ingia({ ...props }) {
  const classes = useStyles();
  const router = useRouter();
  const { isAuthenticated, signIn } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/auth/account");
    }
  }, [isAuthenticated]);
  return (
    <Page>
      <div className={classes.root}>
        <Section className={classes.section}>
          <Login {...props} signIn={signIn} />
        </Section>
      </div>
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
  const session = await getSession(context);
  if (session && session.accessToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/account",
      },
    };
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

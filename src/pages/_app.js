import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { DefaultSeo } from "next-seo";
import NextNprogress from "nextjs-progressbar";
import PropTypes from "prop-types";
import React from "react";

import theme from "@/jikopoint/theme";
import SEO from "next-seo.config";

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <DefaultSeo {...SEO} />

      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <NextNprogress
          color={theme.palette.primary.light}
          startPosition={0.2}
          stopDelayMs={200}
          height={2}
          showOnShallow
        />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

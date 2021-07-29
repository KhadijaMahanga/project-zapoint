import { Grid, Hidden, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";
import Typewriter from "typewriter-effect";

import heroImg from "@/jikopoint/assets/images/megan-thomas-xMh_ww8HN_Q-unsplash.jpg";
import Section from "@/jikopoint/components/Section";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    position: "relative",
    height: typography.pxToRem(450),
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(680),
    },
  },
  background: {
    position: "absolute",
    width: "100vw",
    overflow: "hidden",
    zIndex: -1,
    height: typography.pxToRem(450),
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(680),
    },
  },
  colorBg: {
    background:
      "linear-gradient( to right, hsla(0, 0%, 0%, 0.964) 7.4%, hsla(0, 0%, 0%, 0.918) 15.3%, hsla(0, 0%, 0%, 0.862) 23.4%, hsla(0, 0%, 0%, 0.799) 31.6%, hsla(0, 0%, 0%, 0.73) 39.9%, hsla(0, 0%, 0%, 0.655) 48.2%, hsla(0, 0%, 0%, 0.577) 56.2%, hsla(0, 0%, 0%, 0.497) 64%, hsla(0, 0%, 0%, 0.417) 71.3%, hsla(0, 0%, 0%, 0.337) 78.1%, hsla(0, 0%, 0%, 0.259) 84.2%, hsla(0, 0%, 0%, 0.186) 89.6%,hsla(0, 0%, 0%, 0.117) 94.1%, hsla(0, 0%, 0%, 0.054) 97.6%, hsla(0, 0%, 0%, 0) 100%)",
  },
  section: {
    display: "flex",
    height: typography.pxToRem(450),
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(680),
    },
  },
  starter: {
    color: palette.text.secondary,
    marginRight: typography.pxToRem(5),
  },
  text: {
    color: palette.text.secondary,
    margin: `${typography.pxToRem(20)} 0`,
  },
  textH2: {
    fontSize: typography.h2.fontSize,
    fontFamily: typography.h2.fontFamily,
    color: palette.text.secondary,
    borderBottom: `5px solid ${palette.background.light}`,
    fontWeight: "bold",
  },
  typewriter: {
    display: "inline",
  },
}));

function Hero({ tagline, title, starterText, subtitle, ...props }) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <div className={classes.background}>
        <Image
          src={heroImg}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className={classes.colorBg}>
        <Section classes={{ root: classes.section }}>
          <Grid container alignItems="center" justify="flex-start">
            <Grid item xs={12} lg={8}>
              <Typography variant="h1" className={classes.text}>
                {title}
              </Typography>
              <Hidden mdDown implementation="css">
                <Grid item container>
                  <Typography variant="h2" className={classes.starter}>
                    {starterText}{" "}
                  </Typography>
                  <Typewriter
                    options={{
                      strings: subtitle,
                      autoStart: true,
                      loop: true,
                      cursorClassName: classes.textH2,
                      wrapperClassName: classes.textH2,
                    }}
                  />
                </Grid>
              </Hidden>
              <Typography variant="body1" className={classes.text}>
                {tagline}
              </Typography>
            </Grid>
          </Grid>
        </Section>
      </div>
    </div>
  );
}

Hero.propTypes = {
  title: PropTypes.string,
  tagline: PropTypes.string,
  starterText: PropTypes.string,
  subtitle: PropTypes.arrayOf(PropTypes.string),
};

Hero.defaultProps = {
  title: undefined,
  tagline: undefined,
  starterText: "Jifunze jinsi ya ",
  subtitle: undefined,
};
export default Hero;

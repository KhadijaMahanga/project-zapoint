import { IconButton, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import { ReactComponent as Logo } from "@/jikopoint/assets/logos/logo-foodlab-white.svg";
import { ReactComponent as FacebookIcon } from "@/jikopoint/assets/icons/icon-facebook-white.svg";
import { ReactComponent as InstagramIcon } from "@/jikopoint/assets/icons/icon-instagram-white.svg";
import { ReactComponent as LinkedInIcon } from "@/jikopoint/assets/icons/icon-linkedin-white.svg";
import { ReactComponent as TwitterIcon } from "@/jikopoint/assets/icons/icon-twitter-white.svg";
import { ReactComponent as YoutubeIcon } from "@/jikopoint/assets/icons/icon-youtube-white.svg";

import Link from "@/jikopoint/components/Link";
import Section from "@/jikopoint/components/Section";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
      backgroundColor: palette.background.dark,
      padding: `${typography.pxToRem(30)} 0`,
      [breakpoints.up("lg")]: {
          padding: `${typography.pxToRem(50)} 0`,
      }
  },
  logoSocial: {
      padding: typography.pxToRem(15),
  },
  button: {
    borderRadius: "50%",
    border: `2px solid ${palette.text.secondary}`,
    marginRight: typography.pxToRem(15),
  },
  icon: {
    width: typography.pxToRem(20),
    height: typography.pxToRem(20),
    [breakpoints.up("md")]: {
        width: typography.pxToRem(25),
        height: typography.pxToRem(25),
    }
  },
  logo: {
    width: typography.pxToRem(200),
    height: typography.pxToRem(40),
  },
  social: {
    marginTop: typography.pxToRem(20),
    justifyContent: "center",
    display: "flex",
  },
}));

function Footer({ social }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <Section>
            <Grid container justify="center" alignItems="center" direction="column" className={classes.logoSocial}>
                <Grid item>
                <IconButton
                    component={Link}
                    href={"/"}
                    underline="none"
                >
                    <Logo className={classes.logo} viewBox="156 0 180 100" />
                </IconButton>
                </Grid>
                <Grid item className={classes.social}>
                <IconButton
                    component={Link}
                    className={classes.button}
                    href={social.facebook}
                    underline="none"
                >
                    <FacebookIcon className={classes.icon} />
                </IconButton>
                <IconButton
                    component={Link}
                    className={classes.button}
                    href={social.twitter}
                    underline="none"
                >
                    <TwitterIcon className={classes.icon} />
                </IconButton>
                <IconButton
                    component={Link}
                    className={classes.button}
                    href={social.linkedin}
                    underline="none"
                >
                    <LinkedInIcon className={classes.icon} />
                </IconButton>
                <IconButton
                    component={Link}
                    className={classes.button}
                    href={social.instagram}
                    underline="none"
                >
                    <InstagramIcon className={classes.icon} viewBox="0 0 500 500" />
                </IconButton>
                <IconButton
                    component={Link}
                    className={classes.button}
                    href={social.youtube}
                    underline="none"
                >
                    <YoutubeIcon className={classes.icon} />
                </IconButton>
                </Grid>
            </Grid>
        </Section>
    </div>
  );
}

export default Footer;

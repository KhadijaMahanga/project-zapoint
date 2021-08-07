import { Button, Divider, Grid, IconButton, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import { ReactComponent as FacebookIcon } from "@/jikopoint/assets/icons/icon-facebook-white.svg";
import { ReactComponent as InstagramIcon } from "@/jikopoint/assets/icons/icon-instagram-white.svg";
import { ReactComponent as LinkedInIcon } from "@/jikopoint/assets/icons/icon-linkedin-white.svg";
import { ReactComponent as IconLogin } from "@/jikopoint/assets/icons/icon-login-white.svg";
import { ReactComponent as TwitterIcon } from "@/jikopoint/assets/icons/icon-twitter-white.svg";
import { ReactComponent as IconUser } from "@/jikopoint/assets/icons/icon-user-white.svg";
import Link from "@/jikopoint/components/Link";
import Section from "@/jikopoint/components/Section";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    backgroundColor: palette.background.light,
    minHeight: typography.pxToRem(40),
  },
  auth: {
    borderTop: `1px solid ${palette.divider}`,
    justifyContent: "center",
    [breakpoints.up("lg")]: {
      justifyContent: "flex-end",
      border: 0,
    },
  },
  button: {
    textTransform: "uppercase",
    color: palette.text.secondary,
    fontSize: typography.pxToRem(13),
    fontFamily: typography.fontFamily,
    display: "flex",
    fontWeight: 400,
    "& :hover": {
      color: palette.text.secondary,
    },
  },
  divider: {
    color: palette.divider,
    height: typography.pxToRem(20),
    margin: `auto ${typography.pxToRem(15)}`,
  },
  icon: {
    width: typography.pxToRem(15),
    height: typography.pxToRem(15),
  },
  social: {
    justifyContent: "center",
    display: "flex",
  },
}));

function TopBanner({ social, ...props }) {
  const classes = useStyles(props);

  return (
    <Toolbar className={classes.root}>
      <Section>
        <Grid container>
          <Grid item xs={12} lg={6} className={classes.social}>
            <IconButton
              component={Link}
              href={social.facebook}
              underline="none"
            >
              <FacebookIcon className={classes.icon} />
            </IconButton>
            <IconButton component={Link} href={social.twitter} underline="none">
              <TwitterIcon className={classes.icon} />
            </IconButton>
            <IconButton
              component={Link}
              href={social.linkedin}
              underline="none"
            >
              <LinkedInIcon className={classes.icon} />
            </IconButton>
            <IconButton
              component={Link}
              href={social.instagram}
              underline="none"
            >
              <InstagramIcon className={classes.icon} viewBox="0 0 500 500" />
            </IconButton>
          </Grid>
          <Grid
            item
            lg={6}
            container
            alignItems="center"
            justifyContent="flex-end"
            direction="row"
            className={classes.auth}
          >
            <Grid item>
              <Button
                component={Link}
                underline="none"
                href="/auth/ingia"
                startIcon={<IconUser className={classes.icon} />}
                classes={{ text: classes.button }}
              >
                Ingia
              </Button>
            </Grid>
            <Grid item>
              <Divider
                orientation="vertical"
                flexItem
                classes={{ root: classes.divider }}
              />
            </Grid>
            <Grid item>
              <Button
                component={Link}
                underline="none"
                href="/auth/jiunge"
                startIcon={<IconLogin className={classes.icon} />}
                classes={{ text: classes.button }}
              >
                Jiunge
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Section>
    </Toolbar>
  );
}

TopBanner.propTypes = {
  social: PropTypes.shape({
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    linkedin: PropTypes.string,
    instagram: PropTypes.string,
  }),
};

TopBanner.defaultProps = {
  social: undefined,
};

export default TopBanner;

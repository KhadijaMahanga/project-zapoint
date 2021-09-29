import {
  Divider,
  Hidden,
  IconButton,
  Grid,
  List,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Fragment } from "react";

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
  },
  belowBanner: {
    borderTop: "1px solid #595959",
    padding: typography.pxToRem(12),
  },
  logoSocial: {
    padding: `${typography.pxToRem(45)} ${typography.pxToRem(15)}`,
    [breakpoints.up("lg")]: {
      padding: `${typography.pxToRem(65)} ${typography.pxToRem(15)}`,
    },
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
    },
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
  divider: {
    backgroundColor: "#5F5F5F",
    float: "left",
    height: typography.pxToRem(14),
    margin: `auto ${typography.pxToRem(20)}`,
  },
  list: {
    listStyle: "none",
    display: "block",
    padding: 0,
  },
  listItemLink: {
    float: "left",
    color: palette.highlight.main,
    fontSize: typography.pxToRem(14),
    fontWeight: 400,
    textTransform: "uppercase",
  },
  listItemText: {
    margin: 0,
  },
  flexDisplay: {
    height: typography.pxToRem(18),
  },
}));

function ListItemLink(props) {
  const classes = useStyles();
  return (
    <Link {...props} variant="subtitle2" className={classes.listItemLink} />
  );
}

function Footer({ social, footerItems }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Section>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
          className={classes.logoSocial}
        >
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
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          className={classes.belowBanner}
        >
          <Grid item>
            <Typography variant="caption">
              © Copyright 2021 JikoPoint by Nukta Africa
            </Typography>
          </Grid>
          <Hidden smDown implementation="css">
            <Grid item className={classes.flexDisplay}>
              <List component="nav" className={classes.list}>
                {footerItems.map(({ href, label }, index) => (
                  <Fragment key={href}>
                    <ListItemLink underline="none" href={href}>
                      <ListItemText
                        disableTypography
                        className={classes.listItemText}
                      >
                        {label}
                      </ListItemText>
                    </ListItemLink>
                    {index + 1 !== footerItems.length && (
                      <Divider
                        orientation="vertical"
                        flexItem
                        classes={{ root: classes.divider }}
                      />
                    )}
                  </Fragment>
                ))}
              </List>
            </Grid>
          </Hidden>
        </Grid>
      </Section>
    </div>
  );
}
Footer.propTypes = {
  footerItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
  social: PropTypes.shape({
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    linkedin: PropTypes.string,
    instagram: PropTypes.string,
    youtube: PropTypes.string,
  }),
};

Footer.defaultProps = {
  footerItems: undefined,
  social: undefined,
};

export default Footer;

import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import {
  TwitterShareButton,
  LinkedinShareButton,
  FacebookShareButton,
  EmailShareButton,
} from "react-share";

import ShareButton from "./ShareButton";
import useStyles from "./useStyles";

import { ReactComponent as FacebookIcon } from "@/jikopoint/assets/icons/icon-facebook-color.svg";
import { ReactComponent as LinkedInIcon } from "@/jikopoint/assets/icons/icon-linkedin-color.svg";
import { ReactComponent as EmailIcon } from "@/jikopoint/assets/icons/icon-mail-color.svg";
import { ReactComponent as TwitterIcon } from "@/jikopoint/assets/icons/icon-twitter-color.svg";
import { ReactComponent as WhatsAppIcon } from "@/jikopoint/assets/icons/whatsapp-svgrepo-com.svg";

const ShareBar = ({ socialLinks, title, children, ...props }) => {
  const classes = useStyles(props);
  if (!socialLinks?.length) {
    return null;
  }
  const url = typeof window !== "undefined" ? window.location : null;
  return (
    <div className={classes.root}>
      {children && (
        <Typography variant="body2" className={classes.children}>
          {children}
        </Typography>
      )}
      {socialLinks.map((social) => {
        switch (social.name) {
          case "facebook":
            return (
              <ShareButton
                component={FacebookShareButton}
                title={title}
                url={url}
                alt={social.alt}
                icon={FacebookIcon}
              />
            );
          case "twitter":
            return (
              <ShareButton
                component={TwitterShareButton}
                title={title}
                url={url}
                alt={social.alt}
                icon={TwitterIcon}
              />
            );
          case "linkedin":
            return (
              <ShareButton
                component={LinkedinShareButton}
                icon={LinkedInIcon}
                title={title}
                url={url}
                alt={social.alt}
              />
            );
          case "email":
            return (
              <ShareButton
                component={EmailShareButton}
                icon={EmailIcon}
                title={title}
                url={url}
                alt={social.alt}
                viewBox="0 0 24 24"
              />
            );
          case "whatsapp":
            return (
              <ShareButton
                component={EmailShareButton}
                icon={WhatsAppIcon}
                title={title}
                url={url}
                alt={social.alt}
                viewBox="0 0 24 24"
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

ShareBar.propTypes = {
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      alt: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  title: PropTypes.string,
  children: PropTypes.string,
};

ShareBar.defaultProps = {
  socialLinks: undefined,
  children: undefined,
  title: undefined,
};

export default ShareBar;

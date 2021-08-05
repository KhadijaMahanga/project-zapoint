import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

import useStyles from "./useStyles";

const ShareBar = ({ socialLinks, title, text, ...props }) => {
  const classes = useStyles(props);
  if (!socialLinks?.length) {
    return null;
  }
  const url = typeof window !== "undefined" ? window.location : null;

  console.log(text);
  return (
    <div className={classes.root}>
      {text && (
        <Typography variant="body2" className={classes.text}>
          {text}
        </Typography>
      )}
      {socialLinks.map((social) => {
        switch (social.name) {
          case "facebook":
            return (
              <FacebookShareButton
                key={social.name}
                title={title}
                url={url}
                hashtag="jikoni"
              >
                <FacebookIcon className={classes.icon} alt={social.alt} />
              </FacebookShareButton>
            );
          case "twitter":
            return (
              <TwitterShareButton
                key={social.name}
                title={title}
                url={url}
                hashtags={["#jikoni"]}
                alt={social.alt}
              >
                <TwitterIcon className={classes.icon} />
              </TwitterShareButton>
            );
          case "linkedin":
            return (
              <LinkedinShareButton key={social.name} title={title} url={url}>
                <LinkedinIcon className={classes.icon} />
              </LinkedinShareButton>
            );
          case "whatsApp":
            return (
              <WhatsappShareButton
                key={social.name}
                title={title}
                url={url}
                alt={social.alt}
              >
                <WhatsappIcon className={classes.icon} />
              </WhatsappShareButton>
            );
          case "telegram":
            return (
              <TelegramShareButton
                key={social.name}
                title={title}
                url={url}
                alt={social.alt}
              >
                <TelegramIcon className={classes.icon} />
              </TelegramShareButton>
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
    })
  ),
  title: PropTypes.string,
  text: PropTypes.string,
};

ShareBar.defaultProps = {
  socialLinks: undefined,
  text: undefined,
  title: undefined,
};

export default ShareBar;

import { SvgIcon, Tooltip } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

const ShareButton = ({
  component,
  icon,
  url,
  alt,
  title,
  viewBox,
  ...props
}) => {
  const classes = useStyles(props);

  if (!component) {
    return null;
  }
  const Component = component;
  const viewBoxValue = "0 0 20 20";

  return (
    <Tooltip
      disableFocusListener
      title={alt}
      classes={{ tooltip: classes.tooltip }}
    >
      <Component title={title} url={url}>
        <SvgIcon
          className={classes.icon}
          component={icon}
          alt={alt}
          viewBox={!viewBox ? viewBoxValue : viewBox}
        />
      </Component>
    </Tooltip>
  );
};

ShareButton.propTypes = {
  component: PropTypes.node,
  icon: PropTypes.node,
  url: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  viewBox: PropTypes.string,
};

ShareButton.defaultProps = {
  component: undefined,
  icon: undefined,
  url: undefined,
  alt: undefined,
  title: undefined,
  viewBox: undefined,
};

export default ShareButton;

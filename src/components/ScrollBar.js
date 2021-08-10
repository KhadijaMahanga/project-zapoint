import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import SimpleBarReact from "simplebar-react";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    width: "100%",
    "& .simplebar-wrapper": {
      height: (props) => props.height,
    },
    "& .simplebar-track": {
      width: "50%",
      backgroundColor: "#f1f1ed", // off-white
      height: typography.pxToRem(8),
    },
    "& .simplebar-track.simplebar-horizontal": {
      [breakpoints.up("md")]: {
        marginLeft: "25%",
      },
    },
    "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
      backgroundColor: palette.primary.light,
      height: typography.pxToRem(8),
      top: 0,
      "&::before": {
        backgroundColor: palette.primary.light,
      },
    },
  },
}));

function ScrollBar({
  autoHide,
  className,
  classes: classesProp,
  children,
  height,
  ...props
}) {
  const classes = useStyles({ classes: classesProp, height, ...props });

  if (!children) {
    return null;
  }
  return (
    <SimpleBarReact
      {...props}
      autoHide={autoHide}
      height={height}
      className={clsx(classes.root, className)}
    >
      {children}
    </SimpleBarReact>
  );
}

ScrollBar.propTypes = {
  autoHide: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.shape({
    root: PropTypes.string,
  }),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, // in px
};

ScrollBar.defaultProps = {
  autoHide: false,
  children: undefined,
  classes: undefined,
  className: undefined,
};

export default ScrollBar;

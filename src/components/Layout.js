/* eslint-disable react/jsx-props-no-spreading */
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const Layout = React.forwardRef(function Layout(
  { children, classes: classesProp, className, ...props },
  ref
) {
  const classes = useStyles({ classes: classesProp });

  return (
    <div {...props} className={clsx(classes.root, className)} ref={ref}>
      {children}
    </div>
  );
});

Layout.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  className: undefined,
};

export default Layout;

import { Link } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

/**
 * anchor element that has `target="_blank" rel: "noopener noreferrer"`
 * see: https://material-ui.com/components/links/#security
 */
function A({ children, href, ...props }) {
  return (
    <Link href={href} {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </Link>
  );
}
A.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

export default A;
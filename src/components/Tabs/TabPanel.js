import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

function TabPanel({ children, index, value, ...props }) {
  const classes = useStyles({ index, value, ...props });

  return (
    <div
      role="tabpanel"
      hidden={value !== index ? "hidden" : undefined}
      className={classes.tabPanel}
      {...props}
    >
      {children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

TabPanel.defaultProps = {
  children: undefined,
  index: undefined,
  value: undefined,
};

export default TabPanel;

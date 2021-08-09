import { Tabs as MuiTabs } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

import Tab from "./Tab";
import TabPanel from "./TabPanel";
import useStyles from "./useStyles";

function a11yProps(index, prefix) {
  return {
    tab: {
      "aria-controls": `${prefix}-tabpanel-${index}`,
      id: `${prefix}-tab-${index}`,
    },
    tabPanel: {
      id: `${prefix}-tabpanel-${index}`,
      "aria-labelledby": `${prefix}-tab-${index}`,
    },
  };
}

function a11yTabProps(index, prefix) {
  const { tab: props } = a11yProps(index, prefix);
  return props;
}

function a11yTabPanelProps(index, prefix) {
  const { tabPanel: props } = a11yProps(index, prefix);
  return props;
}

function Tabs({ name, items, ...props }) {
  const classes = useStyles(props);
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  if (!items?.length) {
    return null;
  }
  return (
    <div className={classes.root}>
      <MuiTabs
        value={value}
        onChange={handleChange}
        {...props}
        classes={{ root: classes.tabs, indicator: classes.tabsIndicator }}
      >
        {items.map((item, index) => (
          <Tab
            key={item.label}
            label={item.label}
            {...a11yTabProps(index, name)}
            classes={{ tab: classes.tab }}
          />
        ))}
      </MuiTabs>
      {items.map((item, index) => (
        <TabPanel
          key={item.label}
          {...a11yTabPanelProps(index, name)}
          value={value}
          index={index}
          classes={{ tabPanel: classes.tabPanel }}
        >
          {item.panel}
        </TabPanel>
      ))}
    </div>
  );
}

Tabs.propTypes = {
  name: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      panel: PropTypes.node,
    })
  ),
};

Tabs.defaultProps = {
  name: "tabs",
  items: undefined,
};

export default Tabs;

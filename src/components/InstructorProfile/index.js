import { Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import Section from "@/jikopoint/components/Section";
import Tabs from "@/jikopoint/components/Tabs";

function InstructorProfile({ title, items, ...props }) {
  const classes = useStyles(props);

  if (!items?.length) {
    return null;
  }
  const itemViews = items
    .filter((item) => item?.label?.length)
    .map(({ label, panel }) => {
      const itemView = { label };
      switch (label.toLowerCase()) {
        default: {
          itemView.panel = panel;
        }
      }
      return itemView;
    });
  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Typography variant="h4">{title}</Typography>
        <Tabs
          name="instructor profile"
          items={itemViews}
          classes={{ root: classes.tabs, tabPanel: classes.tabsTabPanel }}
        />
      </Section>
    </div>
  );
}

InstructorProfile.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      panel: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string]),
    })
  ),
};

InstructorProfile.defaultProps = {
  title: undefined,
  items: undefined,
};

export default InstructorProfile;

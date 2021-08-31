import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import Section from "@/jikopoint/components/Section";

const useStyles = makeStyles(({ palette, typography, breakpoints }) => ({
  root: {
    padding: `${typography.pxToRem(20)} 0`,
    [breakpoints.up("md")]: {
      padding: `${typography.pxToRem(30)} 0`,
    },
  },
  section: {},
  title: {
    fontWeight: 400,
    color: palette.secondary.main,
  },
}));

function CoursePage({ title, content, ...props }) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }} />
    </div>
  );
}

CoursePage.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

CoursePage.defaultProps = {
  title: undefined,
  content: undefined,
};

export default CoursePage;

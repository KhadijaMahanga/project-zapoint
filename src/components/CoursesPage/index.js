/* eslint-disable no-underscore-dangle */
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import CourseCard from "@/jikopoint/components/CourseCard";
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

function CoursePage({ courses, ...props }) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid container className={classes.grid}>
          {courses.map(({ _id, ...item }) => (
            <Grid
              xs={12}
              md={6}
              lg={4}
              className={classes.cardSection}
              key={_id}
              item
            >
              <CourseCard {...item} slug={_id} />
            </Grid>
          ))}
        </Grid>
      </Section>
    </div>
  );
}

CoursePage.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
    })
  ),
};

CoursePage.defaultProps = {
  courses: undefined,
};

export default CoursePage;

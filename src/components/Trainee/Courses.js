/* eslint-disable no-underscore-dangle */
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import CourseCard from "@/jikopoint/components/CourseCard";

const useStyles = makeStyles(({ typography, palette }) => ({
  root: {},
  tableRoot: {
    height: "100%",
    margin: `${typography.pxToRem(20)} 0`,
  },
  row: {
    border: "1px solid #f1f1f1",
  },
  status: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(13),
    marginBottom: typography.pxToRem(10),
  },
  editButton: {
    backgroundColor: palette.primary.main,
    fontSize: typography.pxToRem(13),
  },
  logOutButton: {
    fontSize: typography.pxToRem(13),
    backgroundColor: "#CC8585",
  },
  button: {
    color: palette.text.secondary,
    border: "1px solid #f1f1f1",
    padding: typography.pxToRem(10),
    width: "100%",
    borderTop: 0,
  },
  addButton: {
    color: palette.text.secondary,
    margin: `${typography.pxToRem(20)} 0`,
  },
  courseImage: {
    width: "100%",
    position: "relative",
    height: typography.pxToRem(180),
  },
}));

function Courses({ courses: coursesProp, user, categories, ...props }) {
  const classes = useStyles(props);
  const [courses, setCourses] = useState(coursesProp);

  useEffect(() => {
    setCourses(coursesProp);
  }, [coursesProp]);

  return (
    <div className={classes.root}>
      {courses?.length > 0 && (
        <Grid container className={classes.tableRoot}>
          {courses?.map((c) => (
            <Grid item xs={12} md={6} lg={4} key={c._id}>
              <CourseCard
                {...c}
                slug={c._id}
                trainee
                classes={{ image: classes.courseImage }}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

Courses.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
    })
  ),
  categories: PropTypes.arrayOf(PropTypes.shape({ slug: PropTypes.string })),
  user: PropTypes.shape({
    _id: PropTypes.string,
  }),
};

Courses.defaultProps = {
  courses: undefined,
  categories: undefined,
  user: undefined,
};

export default Courses;

/* eslint-disable no-underscore-dangle */
import { Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import useSWR from "swr";

import Link from "@/jikopoint/components/Link";
import fetcher from "@/jikopoint/utils/fetcher";

const useStyles = makeStyles(({ typography, palette }) => ({
  root: {},
  tableRoot: {
    border: `${typography.pxToRem(1)} solid #E2E2E3`,
    borderRadius: `${typography.pxToRem(4)}`,
    overflowX: "hidden",
    height: "100%",
    margin: `${typography.pxToRem(20)} 0`,
    "& div:nth-child(odd)": {
      backgroundColor: "#F9FAFB",
    },
  },
  row: {
    height: typography.pxToRem(46),
    borderBottom: `${typography.pxToRem(1)} solid #E2E2E3`,
    padding: `0 ${typography.pxToRem(28)} 0 ${typography.pxToRem(17)}`,
    "& :last-of-type": {
      borderBottom: 0,
    },
  },
  cell: {
    fontFamily: typography.fontFamily,
    fontSize: typography.pxToRem(16),
  },
  header: {
    fontWeight: "bold",
    fontFamily: typography.h1.fontFamily,
  },
  button: {
    color: palette.text.secondary,
  },
}));

function Courses({
  courses: coursesProp,
  categories: { data: categories },
  ...props
}) {
  const classes = useStyles(props);

  const { data: courses } = useSWR("/api/courses", fetcher, {
    initialData: coursesProp,
  });

  const handleEditCourse = (e) => {
    e?.preventDefault();
  };

  return (
    <div className={classes.root}>
      {courses?.data?.length > 0 && (
        <Grid container className={classes.tableRoot}>
          <Grid
            item
            container
            justifyContent="flex-start"
            alignItems="center"
            className={classes.row}
          >
            <Grid item xs={4}>
              <Typography className={clsx(classes.cell, classes.header)}>
                Name
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={clsx(classes.cell, classes.header)}>
                Category
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={clsx(classes.cell, classes.header)}>
                Status
              </Typography>
            </Grid>
            <Grid item xs={3} />
          </Grid>
          {courses?.data?.map((c) => (
            <Grid
              item
              container
              justifyContent="flex-start"
              alignItems="center"
              className={classes.row}
              key={c.name}
            >
              <Grid item xs={4}>
                <Typography className={classes.cell}>{c.name}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography className={classes.cell}>
                  {categories?.find((ac) => ac._id === c.category)?.name}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.cell}>{c.status}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  component={Link}
                  underline="none"
                  href={`/course/${c._id}`}
                >
                  Tembelea
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={c.status !== "pending approval"}
                  className={classes.button}
                  onClick={(e) => handleEditCourse(e, c)}
                >
                  Approve
                </Button>
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

Courses.propTypes = {
  courses: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        category: PropTypes.string,
        status: PropTypes.string,
      })
    ),
  }),
  categories: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({ slug: PropTypes.string })),
  }),
};

Courses.defaultProps = {
  courses: undefined,
  categories: undefined,
};

export default Courses;

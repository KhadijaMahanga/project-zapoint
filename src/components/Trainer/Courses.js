/* eslint-disable no-underscore-dangle */
import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import CourseCard from "@/jikopoint/components/CourseCard";
import Link from "@/jikopoint/components/Link";
import fetcher from "@/jikopoint/utils/fetcher";

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
}));

function Courses({ courses: coursesProp, categories, ...props }) {
  const classes = useStyles(props);
  const [courses, setCourses] = useState([]);
  const [refreshList, setRefreshList] = useState(false);

  useEffect(() => {
    if (coursesProp?.length) {
      setCourses(coursesProp);
    }
  }, [coursesProp]);

  const { data: res } = useSWR(refreshList ? "/api/courses" : null, fetcher);

  useEffect(() => {
    if (res?.success && res?.data) {
      setCourses(res?.data);
      setRefreshList(false);
    }
  }, [res]);

  const handleSubmitApproval = async (e, id) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("status", "pending approval");

    const options = {
      method: "PUT",
      body: formData,
    };

    const url = `/api/courses/${id}`;
    const result = await fetch(url, options);
    await result.json();
  };

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        href="/kozi/mpya"
        className={classes.addButton}
      >
        Ongeza Kozi
      </Button>
      {courses?.length > 0 && (
        <Grid container className={classes.tableRoot}>
          {courses?.map((c) => (
            <Grid item xs={12} md={6} lg={4} key={c._id}>
              <CourseCard {...c} slug={c._id} trainer />
              <Grid
                item
                xs={12}
                container
                className={classes.button}
                justifyContent="space-between"
              >
                <Grid item xs={12}>
                  <Typography
                    className={classes.status}
                  >{`Status: ${c.status}`}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Button
                    variant="contained"
                    underline="none"
                    component={Link}
                    href={`/kozi/${c._id}/edit`}
                    fullWidth
                    color="inherit"
                    className={classes.editButton}
                  >
                    Hariri
                  </Button>
                </Grid>
                <Grid item xs={5}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="inherit"
                    className={classes.editButton}
                    onClick={(e) => handleSubmitApproval(e, c._id)}
                  >
                    Wasilisha
                  </Button>
                </Grid>
              </Grid>
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
};

Courses.defaultProps = {
  courses: undefined,
  categories: undefined,
};

export default Courses;

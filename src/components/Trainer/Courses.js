/* eslint-disable no-underscore-dangle */
import {
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import { ReactComponent as RemoveIcon } from "@/jikopoint/assets/icons/icon-remove.svg";
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
    fontSize: typography.pxToRem(16),
    fontWeight: "bold",
    marginBottom: typography.pxToRem(10),
  },
  editButton: {
    backgroundColor: palette.primary.main,
    fontSize: typography.pxToRem(13),
    padding: typography.pxToRem(10),
    display: "flex",
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
    height: typography.pxToRem(220),
  },
  icon: {
    width: typography.pxToRem(25),
    height: typography.pxToRem(25),
  },
}));

function Courses({ courses: coursesProp, user, categories, ...props }) {
  const classes = useStyles(props);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (coursesProp?.length) {
      setCourses(coursesProp);
    }
  }, [coursesProp]);

  const { data: res, mutate } = useSWR(
    `/api/courses/instructor/${user?._id}`,
    fetcher
  );

  useEffect(() => {
    if (res?.success && res?.data) {
      setCourses(res?.data);
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
    await fetcher(url, options);
    mutate();
    const subject = "JikoPoint | Hakiki Kozi mpya";
    const content =
      "Mkufunzi amewasilisha kozi yake kwaajili ya uhakiki. Tembelea jikopoint kuhakiki";
    await fetch(`/api/send-email/admin/?subject=${subject}&content=${content}`);
  };

  const handleCourseDeletion = async (e, id) => {
    e.preventDefault();

    const options = {
      method: "DELETE",
    };
    const url = `/api/courses/${id}`;
    await fetcher(url, options);
    mutate();
  };

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        underline="none"
        href="/jiko-class/kozi/mpya"
        className={classes.addButton}
      >
        Ongeza Kozi
      </Button>
      {courses?.length > 0 && (
        <Grid container className={classes.tableRoot}>
          {courses?.map((c) => (
            <Grid item xs={12} md={6} key={c._id}>
              <CourseCard
                {...c}
                slug={c._id}
                trainer
                classes={{ image: classes.courseImage }}
              />
              <Grid
                item
                xs={12}
                container
                className={classes.button}
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={10}>
                  <Typography
                    className={classes.status}
                  >{`Status: ${c.status}`}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Tooltip title="Futa kozi">
                    <IconButton
                      edge="start"
                      onClick={(e) => handleCourseDeletion(e, c._id)}
                    >
                      <RemoveIcon className={classes.icon} />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid
                  item
                  container
                  direction="column"
                  justifyContent="space-between"
                >
                  <Button
                    variant="contained"
                    underline="none"
                    component={Link}
                    href={`/jiko-class/kozi/${c._id}/edit`}
                    fullWidth
                    color="inherit"
                    className={classes.editButton}
                  >
                    Hariri
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="inherit"
                    disabled={c?.status !== "not submitted for approval"}
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

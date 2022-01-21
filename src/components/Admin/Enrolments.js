/* eslint-disable no-underscore-dangle */
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { format } from "date-fns";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import fetcher from "@/jikopoint/utils/fetcher";

const useStyles = makeStyles(({ typography, palette }) => ({
  root: {},
  tableRoot: {
    border: `${typography.pxToRem(1)} solid #E2E2E3`,
    borderRadius: `${typography.pxToRem(4)}`,
    height: "100%",
    margin: `${typography.pxToRem(20)} 0`,
    "& div:nth-child(odd)": {
      backgroundColor: "#F9FAFB",
    },
  },
  row: {
    height: typography.pxToRem(50),
    borderBottom: `${typography.pxToRem(1)} solid #E2E2E3`,
    padding: `0 ${typography.pxToRem(15)}`,
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
    fontSize: typography.pxToRem(13),
    padding: `${typography.pxToRem(6)} ${typography.pxToRem(10)}`,
  },
}));

function Enrolments({ enrolments: enrolmentsProp, ...props }) {
  const classes = useStyles(props);
  const [enrolments, setEnrolments] = useState(enrolmentsProp);

  const { data: res } = useSWR("/api/enrolments/admin", fetcher);

  useEffect(() => {
    if (res?.success && res?.data) {
      setEnrolments(res?.data);
    }
  }, [res]);

  if (!enrolments?.length) {
    return (
      <div className={classes.root}>
        <Typography variant="caption"> Hakuna usajili uliofanyika</Typography>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {enrolments?.length > 0 && (
        <Grid container className={classes.tableRoot}>
          <Grid
            item
            container
            justifyContent="flex-start"
            alignItems="center"
            className={classes.row}
          >
            <Grid item xs={5}>
              <Typography className={clsx(classes.cell, classes.header)}>
                Course
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={clsx(classes.cell, classes.header)}>
                User
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={clsx(classes.cell, classes.header)}>
                Gender
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={clsx(classes.cell, classes.header)}>
                Date
              </Typography>
            </Grid>
          </Grid>
          {enrolments?.map((n) => (
            <Grid
              item
              container
              justifyContent="flex-start"
              alignItems="center"
              className={classes.row}
              key={n._id}
            >
              <Grid item xs={5}>
                <Typography className={classes.cell}>
                  {n.course.name}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.cell}>
                  {n.student?.name ?? n?.student?.email}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography className={classes.cell}>
                  {n.student?.gender ?? ""}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography className={classes.cell}>
                  {format(new Date(n.created_at), "dd-MM-yyyy")}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

Enrolments.propTypes = {
  enrolments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      created_at: PropTypes.string,
      student: PropTypes.shape({
        name: PropTypes.string,
      }),
      course: PropTypes.shape({
        name: PropTypes.string,
      }),
    })
  ),
};

Enrolments.defaultProps = {
  enrolments: undefined,
};

export default Enrolments;

import { Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(({ typography }) => ({
  root: {
    border: `${typography.pxToRem(1)} solid #E2E2E3`,
    borderRadius: `${typography.pxToRem(4)}`,
    overflowX: "hidden",
    height: "100%",
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
    fontSize: typography.pxToRem(12),
  },
  header: {
    fontWeight: "bold",
    fontFamily: typography.h1.fontFamily,
  },
  scrollbar: {
    height: "100%",
    "& .simplebar-track": {
      backgroundColor: "#F0EFEF",
      height: "100%",
    },
    "& .simplebar-track.simplebar-vertical": {
      width: typography.pxToRem(4),
    },
    "& .simplebar-track.simplebar-vertical .simplebar-scrollbar": {
      backgroundColor: "#A0A0A0",
      "&::before": {
        backgroundColor: "#A0A0A0",
      },
    },
  },
}));

function Roles({ roles, ...props }) {
  const classes = useStyles(props);

  return (
    <Grid container className={classes.root}>
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="center"
        className={classes.row}
      >
        <Grid item>
          <Typography className={clsx(classes.cell, classes.header)}>
            Name
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={clsx(classes.cell, classes.header)}>
            Action
          </Typography>
        </Grid>
      </Grid>
      {roles.map((role) => (
        <Grid
          item
          container
          justifyContent="space-between"
          alignItems="center"
          className={classes.row}
          key={role.name}
        >
          <Grid item>
            <Typography className={classes.cell}>{role.name}</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Hariri
            </Button>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

Roles.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
};

Roles.defaultProps = {
  roles: undefined,
};

export default Roles;

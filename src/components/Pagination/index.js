import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import PaginationButton from "@/jikopoint/components/PaginationButton";

const useStyles = makeStyles(({ typography }) => ({
  root: {
    background: "transparent",
    flexGrow: 1,
  },
  buttonGrid: {
    "&:first-of-type": {
      marginRight: typography.pxToRem(20),
    },
  },
}));

function Pagination({ next, previous, size, ...props }) {
  const classes = useStyles(props);

  let prevHref = previous;
  let prevOnClick;
  if (typeof previous === "function") {
    prevOnClick = previous;
    prevHref = undefined;
  }
  let nextHref = next;
  let nextOnClick;
  if (typeof next === "function") {
    nextOnClick = next;
    nextHref = undefined;
  }

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item className={classes.buttonGrid}>
          <PaginationButton
            {...props}
            direction="previous"
            size={size}
            href={prevHref}
            onClick={prevOnClick}
          />
        </Grid>
        <Grid item className={classes.buttonGrid}>
          <PaginationButton
            {...props}
            direction="next"
            size={size}
            href={nextHref}
            onClick={nextOnClick}
          />
        </Grid>
      </Grid>
    </div>
  );
}

Pagination.propTypes = {
  size: PropTypes.string,
  next: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  previous: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

Pagination.defaultProps = {
  next: undefined,
  previous: undefined,
  size: undefined,
};

export default Pagination;

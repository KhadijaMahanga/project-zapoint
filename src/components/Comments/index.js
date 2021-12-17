import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import CForm from "./CForm";

const useStyles = makeStyles(({ typography }) => ({
  root: {
    margin: `${typography.pxToRem(20)} 0`,
  },
}));

function Comments({ comments, ...props }) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      {!comments?.data?.length && (
        <Typography variant="caption">Kuwa wa kwanza kutoa maoni</Typography>
      )}
      <CForm {...props} variant="add" />
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

Comments.defaultProps = {
  comments: undefined,
};

export default Comments;

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import CForm from "./CForm";
import Item from "./Item";

import useAuth from "@/jikopoint/hooks/useAuth";
import fetcher from "@/jikopoint/utils/fetcher";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {
    margin: `${typography.pxToRem(30)} 0`,
    [breakpoints.up("lg")]: {
      margin: typography.pxToRem(30),
    },
  },
}));

function Comments({ comments: commentsProp, course, ...props }) {
  const classes = useStyles(props);
  const { session } = useAuth();
  const [comments, setComments] = useState(commentsProp);

  const { data: res, mutate } = useSWR(
    `/api/comments/course/${course}`,
    fetcher
  );

  useEffect(() => {
    if (res?.success && res?.data) {
      setComments(res.data);
    }
  }, [res]);

  if (!session?.user) {
    return (
      <div className={classes.root}>
        <Typography variant="caption">
          Ingia ili kushiriki kwenye maoni
        </Typography>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {!comments?.length && (
        <Typography variant="caption">Kuwa wa kwanza kutoa maoni</Typography>
      )}
      {comments?.map((c) => (
        <Item comment={c} user={session.user.email} onUpdate={() => mutate()} />
      ))}
      <CForm
        {...props}
        commentor={session?.user?.email}
        course={course}
        onUpdate={() => mutate()}
        variant="add"
      />
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({})),
  course: PropTypes.string,
};

Comments.defaultProps = {
  comments: undefined,
  course: undefined,
};

export default Comments;

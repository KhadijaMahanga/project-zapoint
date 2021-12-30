/* eslint-disable no-underscore-dangle */
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import Item from "./Item";

import CForm from "@/jikopoint/components/Comments/CForm";
import useAuth from "@/jikopoint/hooks/useAuth";
import fetcher from "@/jikopoint/utils/fetcher";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    margin: `${typography.pxToRem(30)} 0`,
    [breakpoints.up("lg")]: {
      margin: typography.pxToRem(30),
    },
  },
  commentText: {
    WebkitLineClamp: 10,
    fontSize: typography.pxToRem(16),
  },
  commentReplyButton: {
    display: "none",
  },
  commentTime: {
    display: "none",
  },
  header: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(14),
    fontWeight: "bold",
  },
}));

function Replies({ comment, replies: repliesProp, onUpdate, ...props }) {
  const classes = useStyles(props);
  const { session } = useAuth();
  const [replies, setReplies] = useState(repliesProp);

  const { data: res, mutate } = useSWR(
    `/api/comments/replies/${comment._id}`,
    fetcher
  );

  useEffect(() => {
    if (res?.success && res?.data) {
      setReplies(res.data);
    }
  }, [res]);

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate();
    }
    mutate();
  };

  return (
    <div className={classes.root}>
      <Item
        comment={comment}
        classes={{
          text: classes.commentText,
          time: classes.commentTime,
          replyButton: classes.commentReplyButton,
        }}
      />
      <Typography className={classes.header}>{`Majibu ${
        replies?.length ?? 0
      } `}</Typography>
      {replies?.map((r) => (
        <Item
          key={r?._id}
          comment={r}
          user={session.user.email}
          parent={comment}
          onUpdate={() => mutate()}
        />
      ))}

      <CForm
        {...props}
        commentor={session?.user?.email}
        parent={comment}
        onUpdate={handleUpdate}
        variant="add"
      />
    </div>
  );
}

Replies.propTypes = {
  replies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
    })
  ),
  comment: PropTypes.shape({
    _id: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};

Replies.defaultProps = {
  comment: undefined,
  replies: undefined,
  onUpdate: undefined,
};

export default Replies;

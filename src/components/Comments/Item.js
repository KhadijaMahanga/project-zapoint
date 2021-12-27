/* eslint-disable no-underscore-dangle */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { formatDistance } from "date-fns";
import Image from "next/image";
import PropTypes from "prop-types";
import React, { useState } from "react";

import CForm from "./CForm";

import DefaultProfilePic from "@/jikopoint/components/DefaultProfilePic";
import fetcher from "@/jikopoint/utils/fetcher";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {
    margin: `${typography.pxToRem(20)} 0`,
  },
  profileImage: {
    width: typography.pxToRem(40),
    height: typography.pxToRem(40),
    position: "relative",
    borderRadius: "100%",
    color: palette.background.light,
    fontSize: typography.pxToRem(16),
  },
  icon: {
    width: typography.pxToRem(25),
    height: typography.pxToRem(25),
  },
  text: {
    fontSize: typography.pxToRem(14),
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    margin: `${typography.pxToRem(10)} 0`,
  },
  time: {
    fontSize: typography.pxToRem(12),
  },
  actionButton: {
    color: palette.text.secondary,
    fontSize: typography.pxToRem(12),
    textTransform: "capitalize",
    fontFamily: typography.fontFamily,
  },
  replyButton: {
    padding: 0,
    fontSize: typography.pxToRem(12),
    textTransform: "capitalize",
    fontFamily: typography.fontFamily,
  },
  header: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(14),
    fontWeight: "bold",
  },
}));

function Item({ comment, onUpdate, user, ...props }) {
  const classes = useStyles(props);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openReply, setOpenReply] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickOpenReply = () => {
    setOpenReply(true);
  };

  const handleCloseReply = () => {
    setOpenReply(false);
  };

  const handleDelete = async () => {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
    };
    await fetcher(`/api/comments/${comment._id}`, options);
    if (onUpdate) {
      onUpdate();
    }
    setOpen(false);
  };

  const handleEditUpdate = () => {
    if (onUpdate) {
      onUpdate();
    }
    setOpenEdit(false);
  };

  const imageDomains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(", ");
  const xImg = imageDomains.find((d) => comment?.commentor?.image?.includes(d));

  const timeAgo = formatDistance(new Date(comment.updated_at), new Date(), {
    addSuffix: true,
  });

  return (
    <div className={classes.root}>
      <Grid item container alignItems="center">
        <Grid item xs={2} md={1}>
          <div className={classes.profileImage}>
            {comment?.commentor?.image && xImg ? (
              <Image
                src={comment?.commentor.image}
                layout="fill"
                className={classes.image}
              />
            ) : (
              <DefaultProfilePic
                letter={
                  comment?.commentor.name[0] || comment?.commentor.email[0]
                }
              />
            )}
          </div>
        </Grid>
        <Grid item container xs={10} md={11}>
          <Grid item xs={12}>
            <Typography className={classes.header}>
              {comment?.commentor?.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.text}>{comment.text}</Typography>
          </Grid>
          <Grid item container justifyContent="space-between">
            <Grid item>
              <Typography className={classes.time} variant="caption">
                {timeAgo}
              </Typography>
            </Grid>
            <Grid item>
              {user === comment.commentor.email && (
                <>
                  <Button
                    className={classes.replyButton}
                    onClick={handleClickOpen}
                    variant="text"
                  >
                    Futa
                  </Button>
                  <Button
                    className={classes.replyButton}
                    onClick={handleClickOpenEdit}
                    variant="text"
                  >
                    Hariri
                  </Button>
                </>
              )}
              <Button
                className={classes.replyButton}
                onClick={handleClickOpenReply}
                color="primary"
                variant="text"
              >
                Jibu
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="body2">
            Je, unauhakika unataka kufuta oni lako?{" "}
          </Typography>
          <DialogActions>
            <Button
              onClick={handleDelete}
              className={classes.actionButton}
              color="primary"
              variant="contained"
            >
              Ndio
            </Button>
            <Button
              onClick={handleClose}
              className={classes.actionButton}
              color="primary"
              variant="contained"
            >
              Hapana
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="md" fullWidth>
        <DialogContent>
          <Typography variant="body2">Hariri Oni </Typography>
          <CForm
            course={comment.course}
            comment={comment.text}
            id={comment._id}
            commentor={comment?.commentor?.email}
            onUpdate={handleEditUpdate}
            variant="edit"
          />
        </DialogContent>
      </Dialog>
      <Dialog
        open={openReply}
        onClose={handleCloseReply}
        maxWidth="md"
        fullWidth
      />
    </div>
  );
}

Item.propTypes = {
  comment: PropTypes.shape({
    commentor: PropTypes.shape({
      email: PropTypes.string,
      image: PropTypes.string,
      name: PropTypes.string,
    }),
    _id: PropTypes.string,
    text: PropTypes.string,
    course: PropTypes.string,
    updated_at: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
  user: PropTypes.string,
};

Item.defaultProps = {
  comment: undefined,
  onUpdate: undefined,
  user: undefined,
};

export default Item;

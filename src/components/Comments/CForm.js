/* eslint-disable no-underscore-dangle */
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";

import JikoSnackbar from "@/jikopoint/components/JikoSnackbar";
import fetcher from "@/jikopoint/utils/fetcher";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {
    backgroundColor: palette.background.default,
    margin: `${typography.pxToRem(20)} 0`,
  },
  button: {
    color: palette.text.secondary,
    display: "flex",
    margin: `${typography.pxToRem(10)} 0`,
  },
}));

function CForm({
  commentor,
  course,
  comment: commentProp,
  id,
  onUpdate,
  variant,
  parent,
  ...props
}) {
  const [comment, setComment] = useState(commentProp);
  const [open, setOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState();
  const [notice, setNotice] = useState();

  const classes = useStyles(props);

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (comment?.length && variant === "add") {
      let subject = "Jiko Point | Oni jipya";
      let content = `Mtumiaji ametoa oni kwenye kozi yako ${course?.name} `;
      let email = course?.instructor?.email;

      if (parent) {
        subject = "Jiko Point | Umejibiwa oni lako";
        content = `Mtumiaji amejibu oni lako kwenye kozi ${course?.name} `;
        email = parent?.commentor?.email;
      }

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          course: course?._id,
          text: comment,
          parent: parent?._id ?? null,
          commentor,
        }),
      };
      const res = await fetcher("/api/comments", options);
      if (res?.success) {
        if (onUpdate) {
          onUpdate();
        }
        setApiStatus("success");
        setNotice("Umefanikiwa kuhifadhi");
      } else {
        setApiStatus("error");
        setNotice(res?.message);
      }
      setOpen(true);
      await fetch(
        `/api/send-email?subject=${subject}&content=${content}&email=${email}`
      );
    }
    if (comment?.length && variant === "edit") {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ text: comment }),
      };
      const res = await fetcher(`/api/comments/${id}`, options);
      if (res?.success) {
        if (onUpdate) {
          onUpdate();
        }
        setApiStatus("success");
        setNotice("Umefanikiwa kuhifadhi");
      } else {
        setApiStatus("error");
        setNotice(res?.message);
      }
      setOpen(true);
    }
    setComment("");
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className={classes.root}>
        <TextField
          variant="outlined"
          multiline
          fullWidth
          minRows={1}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          color="primary"
          type="submit"
          variant="contained"
          className={classes.button}
        >
          Hifadhi
        </Button>
      </form>
      <JikoSnackbar
        open={open}
        onClose={handleCloseSnack}
        message={notice}
        status={apiStatus}
      />
    </>
  );
}

CForm.propTypes = {
  variant: PropTypes.oneOf(["add", "edit"]),
  commentor: PropTypes.string,
  comment: PropTypes.string,
  course: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    instructor: PropTypes.shape({
      email: PropTypes.string,
    }),
  }),
  id: PropTypes.string,
  onUpdate: PropTypes.func,
  parent: PropTypes.shape({
    _id: PropTypes.string,
    commentor: PropTypes.shape({
      email: PropTypes.string,
    }),
  }),
};

CForm.defaultProps = {
  variant: "add",
  id: undefined,
  course: undefined,
  commentor: undefined,
  comment: undefined,
  onUpdate: undefined,
  parent: null,
};

export default CForm;

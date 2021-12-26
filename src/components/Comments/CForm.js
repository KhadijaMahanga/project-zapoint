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
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ commentor, course, text: comment }),
      };
      const res = await fetcher("/api/comments", options);
      if (res?.success) {
        if (onUpdate) {
          onUpdate(res?.data);
        }
        setApiStatus("success");
        setNotice("Umefanikiwa kuhifadhi");
      } else {
        setApiStatus("error");
        setNotice(res?.message);
      }
      setOpen(true);
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
          onUpdate(res?.data);
        }
        setApiStatus("success");
        setNotice("Umefanikiwa kuhifadhi");
      } else {
        setApiStatus("error");
        setNotice(res?.message);
      }
      setOpen(true);
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className={classes.root}>
        <TextField
          variant="outlined"
          fullWidth
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
  course: PropTypes.string,
  id: PropTypes.string,
  onUpdate: PropTypes.func,
};

CForm.defaultProps = {
  variant: "add",
  id: undefined,
  course: undefined,
  commentor: undefined,
  comment: undefined,
  onUpdate: undefined,
};

export default CForm;

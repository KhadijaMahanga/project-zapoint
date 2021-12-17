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
  button: {},
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

  const onSubmit = async () => {
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
          setApiStatus("success");
          setNotice("Umefanikiwa kuhifadhi");
        }
      } else {
        setOpen(true);
        setApiStatus("error");
        setNotice(res?.message);
      }
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
          setApiStatus("success");
          setNotice("Umefanikiwa kuhifadhi");
        }
      } else {
        setOpen(true);
        setApiStatus("error");
        setNotice(res?.message);
      }
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} className={classes.root}>
        <TextField
          variant="outlined"
          fullWidth
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
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
  commentor: PropTypes.shape({}),
  comment: PropTypes.string,
  course: PropTypes.string,
  id: PropTypes.string,
  onUpdate: PropTypes.func,
};

CForm.defaultProps = {
  variant: undefined,
  id: undefined,
  course: undefined,
  commentor: undefined,
  comment: undefined,
  onUpdate: undefined,
};

export default CForm;

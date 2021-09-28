/* eslint-disable no-underscore-dangle */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneDialog } from "material-ui-dropzone";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {},
  label: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(16),
  },
  futaButton: {
    backgroundColor: "#CC8585",
    color: "white",
  },
  dialogActions: {
    padding: `${typography.pxToRem(8)} ${typography.pxToRem(24)}`,
  },
  caption: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(13),
  },
  button: {
    color: palette.text.secondary,
  },
  divider: {
    margin: `${typography.pxToRem(20)} auto`,
    display: "flex",
    alignItems: "center",
    color: palette.text.primary,
  },
  dividerBorder: {
    borderBottom: `1px solid ${palette.text.primary}`,
    width: "100%",
  },
  dividerSpan: {
    margin: `0 ${typography.pxToRem(5)}`,
  },
}));

function LectureDialog({
  handleCloseDialog,
  openDialog,
  courseId,
  variant,
  value,
  updateLecturesList,
  ...props
}) {
  const classes = useStyles(props);
  const [name, setName] = useState("");
  const [no, setNo] = useState("");
  const [video, setVideo] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [openVideoDialog, setOpenVideoDialog] = useState(false);

  useEffect(() => {
    if (value?.name) {
      setName(value.name);
      setNo(value?.no);
      setVideo(value?.video);
      setType(value?.type);
      setDuration(value?.duration);
    }
  }, [value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (name?.length && no) {
      const formData = new FormData();
      formData.append("videoFile", videoFile);
      formData.append("name", name);
      formData.append("video", video);
      formData.append("type", type);
      formData.append("no", no);
      formData.append("duration", duration);

      let options;
      let url;
      if (variant === "add") {
        formData.append("course", courseId);
        url = "/api/lectures";
        options = {
          method: "POST",
          body: formData,
        };
      } else {
        url = `/api/lectures/${value?._id}`;
        options = {
          method: "PUT",
          body: formData,
        };
      }
      const lecture = await fetch(url, options);
      console.log(lecture);
      updateLecturesList(lecture?.success && lecture?.data);
    }
    handleCloseDialog();
  };

  const handleDelete = async () => {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
    };
    const lecture = await fetch(`/api/lectures/${value?._id}`, options);
    updateLecturesList(lecture?.success && lecture?.data);
    handleCloseDialog();
  };

  const handeFileUpload = (files) => {
    if (files?.length) {
      setVideoFile(files[0]);
    }
    setOpenVideoDialog(false);
  };

  const title =
    variant === "add" ? "Ongeza somo/kipindi" : "Hariri somo/kipindi";
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-lecture"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
        <DialogContent>
          <Typography className={classes.caption}>
            Kielezo hupanga mtiririko wako wa vipindi (kama una zaidi ya moja).
            Jaza 1, 2, 3..nk
          </Typography>
          <TextField
            autoComplete="fno"
            name="no"
            variant="outlined"
            value={no}
            margin="normal"
            required
            fullWidth
            id="no"
            label="Kielezo"
            autoFocus
            InputLabelProps={{ classes: { root: classes.label } }}
            onChange={(e) => setNo(e.target.value)}
          />
          <TextField
            autoComplete="fname"
            name="name"
            variant="outlined"
            value={name}
            margin="normal"
            required
            fullWidth
            id="name"
            label="Jina"
            autoFocus
            InputLabelProps={{ classes: { root: classes.label } }}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoComplete="fduration"
            name="duration"
            variant="outlined"
            value={duration}
            required
            fullWidth
            margin="normal"
            id="duration"
            label="Muda wa video (dakika)"
            autoFocus
            InputLabelProps={{ classes: { root: classes.label } }}
            onChange={(e) => setDuration(e.target.value)}
          />
          <TextField
            autoComplete="ftype"
            name="type"
            variant="outlined"
            value={type}
            required
            fullWidth
            margin="normal"
            id="type"
            label="Aina ya video"
            autoFocus
            placeholder="mfano: video/youtube, video/mp4, nk"
            InputLabelProps={{ classes: { root: classes.label } }}
            onChange={(e) => setType(e.target.value)}
          />
          <Typography className={classes.caption}>
            Waweza kuweka link kutoka youtube au ukapakia video. Njia ya kwanza
            inapendekezwa zaidi
          </Typography>
          <TextField
            autoComplete="fvideo"
            name="video"
            variant="outlined"
            value={video}
            required
            margin="normal"
            fullWidth
            id="video"
            label="video"
            autoFocus
            InputLabelProps={{ classes: { root: classes.label } }}
            onChange={(e) => setVideo(e.target.value)}
          />
          <div className={classes.divider}>
            <div className={classes.dividerBorder} />
            <span className={classes.dividerSpan}>au</span>
            <div className={classes.dividerBorder} />
          </div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => setOpenVideoDialog(true)}
          >
            Pakia video
          </Button>
          <DropzoneDialog
            open={openVideoDialog}
            filesLimit={1}
            onSave={handeFileUpload}
            acceptedFiles={["image/*"]}
            maxFileSize={5000000}
            onClose={() => setOpenVideoDialog(false)}
          />
        </DialogContent>
        <DialogActions classes={{ root: classes.dialogActions }}>
          <Button onClick={handleCloseDialog} color="primary">
            Ghairi
          </Button>
          <Button type="submit" color="primary">
            Hifadhi
          </Button>
          {variant === "edit" && (
            <Button onClick={handleDelete} className={classes.futaButton}>
              Futa
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}

LectureDialog.propTypes = {
  courseId: PropTypes.string,
  handleCloseDialog: PropTypes.func,
  openDialog: PropTypes.bool,
  variant: PropTypes.oneOf(["add", "edit"]),
  updateLecturesList: PropTypes.func,
  value: PropTypes.shape({
    name: PropTypes.string,
    duration: PropTypes.string,
    no: PropTypes.string,
    video: PropTypes.string,
    type: PropTypes.string,
    _id: PropTypes.string,
  }),
};

LectureDialog.defaultProps = {
  handleCloseDialog: undefined,
  openDialog: undefined,
  updateLecturesList: undefined,
  variant: "add",
  value: undefined,
  courseId: undefined,
};

export default LectureDialog;

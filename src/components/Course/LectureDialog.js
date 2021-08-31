/* eslint-disable no-underscore-dangle */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
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
  divider: {
    marginTop: typography.pxToRem(20),
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
  const [openVideoDialog, setOpenVideoDialog] = useState(false);

  useEffect(() => {
    if (value?.name) {
      setName(value.name);
      setNo(value?.no);
      setVideo(value?.video);
      setType(value?.type);
    }
  }, [value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (name?.length && no && video?.length && type?.length) {
      const formData = new FormData();
      formData.append("videoFile", videoFile);
      formData.append("name", name);
      formData.append("video", video);
      formData.append("type", type);
      formData.append("no", no);

      let options;
      let url;
      if (variant === "add") {
        url = "/api/lecture";
        options = {
          method: "POST",
          body: formData,
        };
      } else {
        url = `/api/lectures/${value?._id}`;
        options = {
          method: "POST",
          body: formData,
        };
      }
      const lecture = await fetch(url, options);
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
    setVideoFile(files[0]);
    setOpenVideoDialog(false);
  };

  const title = variant === "add" ? "Ongeza Kundi la Kozi" : "Hariri Kundi";
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
          <TextField
            autoComplete="fno"
            name="no"
            variant="outlined"
            value={no}
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
            required
            fullWidth
            id="name"
            label="Jina"
            autoFocus
            InputLabelProps={{ classes: { root: classes.label } }}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoComplete="ftype"
            name="type"
            variant="outlined"
            value={type}
            required
            fullWidth
            id="type"
            label="Aina ya video"
            autoFocus
            placeholder="mfano: video/youtube, video/mp4, nk"
            InputLabelProps={{ classes: { root: classes.label } }}
            onChange={(e) => setType(e.target.value)}
          />
          <TextField className={classes.caption}>
            Waweza kuweka link kutoka youtube au ukapakia video. Njia ya kwanza
            inapendekezwa zaid
          </TextField>
          <TextField
            autoComplete="fvideo"
            name="video"
            variant="outlined"
            value={video}
            required
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
            Pakia picha ya jalada
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
  handleCloseDialog: PropTypes.func,
  openDialog: PropTypes.bool,
  variant: PropTypes.oneOf(["add", "edit"]),
  updateLecturesList: PropTypes.func,
  value: PropTypes.shape({
    name: PropTypes.string,
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
};

export default LectureDialog;

import {
  Grid,
  TextField,
  MenuItem,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneDialog } from "material-ui-dropzone";
import PropTypes from "prop-types";
import React, { useState } from "react";

import Section from "@/jikopoint/components/Section";

const useStyles = makeStyles(({ palette, typography }) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: typography.pxToRem(1),
    color: palette.text.primary,
  },
  submit: {
    margin: typography.pxToRem(3, 0, 2),
    color: palette.text.secondary,
  },
  label: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(16),
  },
}));

function CreateCourse({ categories, csrfToken }) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const [error, setError] = useState("");

  const handeFileUpload = (files) => {
    setImage(files[0]);
    console.log(files);
    setOpenDialog(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      !(name.length && description.length && image.length && categoryId.length)
    ) {
      setError("Jaza kila kitu");
    }
  };

  return (
    <div className={classes.root}>
      <Section>
        <Grid container justifyContent="space-around">
          <Grid item xs={12} md={8}>
            {error.length > 0 && (
              <Typography variant="overline"> {error}</Typography>
            )}
          </Grid>
          <Grid item xs={12} md={8}>
            <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <TextField
                margin="dense"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Jina"
                value={name}
                autoFocus
                InputLabelProps={{ classes: { root: classes.label } }}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                margin="dense"
                name="description"
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Ufafanuzi"
                autoFocus
                value={description}
                InputLabelProps={{ classes: { root: classes.label } }}
                onChange={(e) => setDescription(e.target.value)}
              />

              <TextField
                id="select"
                label="Category"
                name="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                select
              >
                <>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categories.map((cat) => (
                    <MenuItem value={cat.id}>{cat.name}</MenuItem>
                  ))}
                </>
              </TextField>
              <Grid item>
                <Button onClick={() => setOpenDialog(true)}>Add Image</Button>
                <DropzoneDialog
                  open={openDialog}
                  filesLimit={1}
                  onSave={handeFileUpload}
                  acceptedFiles={["image/*"]}
                  showPreviews
                  maxFileSize={5000000}
                  onClose={() => setOpenDialog(false)}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Unda
              </Button>
            </form>
          </Grid>
        </Grid>
      </Section>
    </div>
  );
}
CreateCourse.propTypes = {
  csrfToken: PropTypes.string,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    })
  ),
};

CreateCourse.defaultProps = {
  csrfToken: undefined,
  categories: undefined,
};
export default CreateCourse;

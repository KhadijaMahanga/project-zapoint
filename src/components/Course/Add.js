/* eslint-disable no-underscore-dangle */
import { TextField, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneDialog } from "material-ui-dropzone";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import Section from "@/jikopoint/components/Section";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {
    height: "100vh",
  },
  section: {
    paddingTop: typography.pxToRem(40),
  },
  label: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(16),
  },
  button: {
    color: palette.text.secondary,
  },
  title: {
    fontWeight: 500,
  },
  imageBtn: {
    color: palette.text.secondary,
  },
}));

function Add({ categories, variant, user, course, ...props }) {
  const classes = useStyles(props);
  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (course && variant === "edit") {
      setName(course?.name);
      setDescription(course?.description);
      setImage(course?.image);
      setCategory(course?.category);
    }
  }, [variant, course]);

  useEffect(() => {
    if (!category && categories?.length) {
      const [firstCat] = categories;
      setCategory(firstCat._id);
    }
  }, [categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isUpdating) return;
    setIsUpdating(true);

    if (
      !error?.length &&
      name.length &&
      description.length &&
      image &&
      category
    ) {
      const formData = new FormData();
      formData.append("coverPhoto", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("instructor", user?._id);
      formData.append("category", category);
      formData.append("enrolment", 1);
      formData.append("duration", 0);

      const options = {
        method: variant === "edit" ? "PUT" : "POST",
        body: formData,
      };

      const url =
        variant === "edit" ? `/api/courses/${course?._id}` : "/api/courses";
      const result = await fetch(url, options);
      const c = await result.json();
      // add notification of success
      if (c.success) {
        alert("Umefanikiwa kuhifadhi kozi");
      } else {
        alert(c.message);
      }
    } else {
      setError("Jaza kila kitu");
    }
  };

  const handeFileUpload = (files) => {
    setImage(files[0]);
    setOpenDialog(false);
  };

  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid container alignItems="center" justifyContent="center" spacing={4}>
          <Grid item xs={12} lg={8}>
            <Typography variant="h4">Ongeza Kozi Mpya</Typography>
          </Grid>
          {error.length > 0 && (
            <Grid item xs={12} lg={8}>
              <Typography variant="overline"> {error}</Typography>
            </Grid>
          )}
          <Grid item xs={12} lg={8}>
            <form
              className={classes.form}
              type="multipart/form-data"
              onSubmit={(e) => handleSubmit(e)}
            >
              <Grid container spacing={3} alignItems="stretch">
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    variant="outlined"
                    value={name}
                    required
                    fullWidth
                    id="name"
                    label="Jina la kozi"
                    autoFocus
                    InputLabelProps={{ classes: { root: classes.label } }}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    variant="outlined"
                    value={description}
                    required
                    multiline
                    rows={4}
                    fullWidth
                    id="description"
                    label="Maelezo ya Kozi"
                    autoFocus
                    InputLabelProps={{ classes: { root: classes.label } }}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} lg={8}>
                  <TextField
                    id="category"
                    select
                    label="Kundi"
                    placeholder="Chagua Kundi la kozi"
                    value={category}
                    fullWidth
                    onChange={(e) => setCategory(e.target.value)}
                    SelectProps={{
                      native: true,
                    }}
                    InputLabelProps={{ classes: { root: classes.label } }}
                    variant="outlined"
                  >
                    {categories?.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.name}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => setOpenDialog(true)}
                  >
                    Pakia picha ya jalada
                  </Button>
                  <DropzoneDialog
                    open={openDialog}
                    filesLimit={1}
                    onSave={handeFileUpload}
                    acceptedFiles={["image/*"]}
                    maxFileSize={5000000}
                    onClose={() => setOpenDialog(false)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Hifadhi
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Section>
    </div>
  );
}

Add.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  variant: PropTypes.string,
  course: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
  }),
  user: PropTypes.shape({
    _id: PropTypes.string,
  }),
};

Add.defaultProps = {
  categories: undefined,
  course: undefined,
  variant: "add",
  user: undefined,
};

export default Add;

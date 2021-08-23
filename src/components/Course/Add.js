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

function Add({ categories, ...props }) {
  const classes = useStyles(props);
  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (categories?.length) {
      const [firstCat] = categories;
      setCategory(firstCat.slug);
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
      const user = {
        accounts: [],
        sessions: [],
        role: "trainer",
        isDeleted: false,
        _id: "612214008083533d6d486cb8",
        name: "lisa doe",
        email: "khadija@codeforafrica.org",
        password:
          "$2a$08$5BefWm4gLtCx8liEhckHSuBqymvwCoRFXfWgVaZIztPRE9xaTdNU.",
        created_at: "2021-08-22T09:08:16.974Z",
        updated_at: "2021-08-22T09:08:16.974Z",
        __v: 0,
      };

      const courseCategory = categories?.find((c) => c.slug === category);
      const formData = new FormData();
      formData.append("coverPhoto", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("instructor", JSON.stringify(user));
      formData.append("category", JSON.stringify(courseCategory));
      formData.append("enrolment", 1);
      formData.append("duration", 0);

      const options = {
        method: "POST",
        body: formData,
      };

      const result = await fetch("/api/courses", options);
      await result.json();
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
                      <option key={option.slug} value={option.slug}>
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
};

Add.defaultProps = {
  categories: undefined,
};

export default Add;

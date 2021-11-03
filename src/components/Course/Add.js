/* eslint-disable no-underscore-dangle */
import { TextField, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneDialog } from "material-ui-dropzone";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import Link from "@/jikopoint/components/Link";
import Section from "@/jikopoint/components/Section";
import fetcher from "@/jikopoint/utils/fetcher";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    padding: `${typography.pxToRem(20)} 0`,
    [breakpoints.up("md")]: {
      padding: `${typography.pxToRem(40)} 0`,
    },
  },
  section: {},
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
  caption: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(13),
  },
}));

function Add({ categories, variant, user, course: courseProp, ...props }) {
  const classes = useStyles(props);
  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(null);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [course, setCourse] = useState(courseProp);

  const [notice, setNotice] = useState(null);

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
  }, [categories, category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isUpdating) return;
    setIsUpdating(true);
    setNotice("Tunashughulia");

    if (
      !error?.length &&
      name.length &&
      description.length &&
      (image || imageFile) &&
      category
    ) {
      const formData = new FormData();
      formData.append("coverPhoto", imageFile);
      formData.append("name", name);
      formData.append("image", image);
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
      const res = await fetcher(url, options);
      // add notification of success
      if (res.success) {
        setCourse(res?.data);
        setNotice("Umefanikiwa kuhifadhi");
      } else {
        setNotice("Tatizo la kiufundi, jaribu tena baadae.");
      }
      setTimeout(() => {
        setNotice("");
      }, 5000);
    } else {
      setError("Jaza kila kitu");
    }
  };

  const handeFileUpload = (files) => {
    if (files?.length) {
      setImageFile(files[0]);
    }
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
                {notice?.length > 0 && (
                  <Grid item xs={12}>
                    <Typography className={classes.caption}>
                      {notice}
                    </Typography>
                  </Grid>
                )}
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
                {course && variant !== "edit" && (
                  <Grid item xs={12}>
                    <Button
                      component={Link}
                      href={`/jiko-class/kozi/${course?._id}/edit`}
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      Endelea
                    </Button>
                  </Grid>
                )}
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

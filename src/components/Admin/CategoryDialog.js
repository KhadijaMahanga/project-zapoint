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
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import slugify from "@/jikopoint/utils/slugify";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {},
  label: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(16),
  },
  futaButton: {
    backgroundColor: "red",
    color: "white",
  },
  dialogActions: {
    padding: `${typography.pxToRem(8)} ${typography.pxToRem(24)}`,
  },
}));

function CategoryDialog({
  handleCloseDialog,
  openDialog,
  variant,
  value,
  updateCategoriesList,
  ...props
}) {
  const classes = useStyles(props);
  const [name, setName] = useState("");

  useEffect(() => {
    if (value?.name) {
      setName(value.name);
    }
  }, [value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const slug = slugify(name);
    if (name?.length && variant === "add") {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ name, slug }),
      };
      const category = await fetch("/api/categories", options);
      updateCategoriesList(category?.success && category?.data);
    }
    if (name?.length && variant === "edit") {
      const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ name, slug }),
      };
      const category = await fetch(`/api/categories/${value?._id}`, options);
      updateCategoriesList(category?.success && category?.data);
    }
    handleCloseDialog();
  };

  const handleDelete = async () => {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
    };
    const category = await fetch(`/api/categories/${value?._id}`, options);
    updateCategoriesList(category?.success && category?.data);
    handleCloseDialog();
  };

  const title = variant === "add" ? "Ongeza Kundi la Kozi" : "Hariri Kundi";
  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
      aria-labelledby="form-dialog-category"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
        <DialogContent>
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

CategoryDialog.propTypes = {
  handleCloseDialog: PropTypes.func,
  openDialog: PropTypes.bool,
  variant: PropTypes.oneOf(["add", "edit"]),
  updateCategoriesList: PropTypes.func,
  value: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
  }),
};

CategoryDialog.defaultProps = {
  handleCloseDialog: undefined,
  openDialog: undefined,
  updateCategoriesList: undefined,
  variant: "add",
  value: undefined,
};

export default CategoryDialog;

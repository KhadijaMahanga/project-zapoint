/* eslint-disable no-underscore-dangle */
import { Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import CategoryDialog from "@/jikopoint/components/Admin/CategoryDialog";
import fetcher from "@/jikopoint/utils/fetcher";

const useStyles = makeStyles(({ typography, palette }) => ({
  root: {},
  tableRoot: {
    border: `${typography.pxToRem(1)} solid #E2E2E3`,
    borderRadius: `${typography.pxToRem(4)}`,
    overflowX: "hidden",
    height: "100%",
    "& div:nth-child(odd)": {
      backgroundColor: "#F9FAFB",
    },
  },
  row: {
    height: typography.pxToRem(46),
    borderBottom: `${typography.pxToRem(1)} solid #E2E2E3`,
    padding: `0 ${typography.pxToRem(15)}`,
    "& :last-of-type": {
      borderBottom: 0,
    },
  },
  cell: {
    fontFamily: typography.fontFamily,
    fontSize: typography.pxToRem(16),
  },
  header: {
    fontWeight: "bold",
    fontFamily: typography.h1.fontFamily,
  },
  addButton: {
    color: palette.text.secondary,
    margin: `${typography.pxToRem(20)} 0`,
  },
  button: {
    color: palette.text.secondary,
    fontSize: typography.pxToRem(13),
  },
}));

function Categories({ categories: categoriesProp, ...props }) {
  const classes = useStyles(props);
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [variant, setVariant] = useState("add");
  const [row, setRow] = useState(null);

  useEffect(() => {
    if (categoriesProp?.length) {
      setCategories(categoriesProp);
    }
  }, [categoriesProp]);

  const { data: res, mutate } = useSWR("/api/categories", fetcher);

  useEffect(() => {
    if (res?.success && res?.data) {
      setCategories(res?.data);
    }
  }, [res]);

  const handleAddCategory = (e) => {
    e?.preventDefault();
    setVariant("add");
    setOpenDialog(true);
  };
  const handleEditCategory = (e, n) => {
    e?.preventDefault();
    setVariant("edit");
    setRow(n);
    setOpenDialog(true);
  };
  const handleCloseDialog = (e) => {
    e?.preventDefault();
    setOpenDialog(false);
  };

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        className={classes.addButton}
        onClick={handleAddCategory}
      >
        Ongeza Kundi la Kozi
      </Button>
      {categories?.length && (
        <Grid container className={classes.tableRoot}>
          <Grid
            item
            container
            justifyContent="flex-start"
            alignItems="center"
            className={classes.row}
          >
            <Grid item xs={4}>
              <Typography className={clsx(classes.cell, classes.header)}>
                Name
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={clsx(classes.cell, classes.header)}>
                Slug
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={clsx(classes.cell, classes.header)}>
                Action
              </Typography>
            </Grid>
          </Grid>
          {categories?.map((cat) => (
            <Grid
              item
              container
              justifyContent="flex-start"
              alignItems="center"
              className={classes.row}
              key={cat.slug}
            >
              <Grid item xs={4}>
                <Typography className={classes.cell}>{cat.name}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.cell}>{cat.slug}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={(e) => handleEditCategory(e, cat)}
                >
                  Hariri
                </Button>
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}
      <CategoryDialog
        variant={variant}
        handleCloseDialog={handleCloseDialog}
        openDialog={openDialog}
        updateCategoriesList={() => mutate()}
        value={row}
      />
    </div>
  );
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};

Categories.defaultProps = {
  categories: undefined,
};

export default Categories;

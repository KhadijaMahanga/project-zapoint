import { Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";
import useSWR from "swr";

import RoleDialog from "@/jikopoint/components/AdminPage/RoleDialog";
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
    padding: `0 ${typography.pxToRem(28)} 0 ${typography.pxToRem(17)}`,
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
}));

function Roles({ roles: rolesProp, ...props }) {
  const classes = useStyles(props);

  const [openDialog, setOpenDialog] = useState(false);
  const [variant, setVariant] = useState("add");

  const { data: roles } = useSWR("/api/roles", fetcher, {
    initialData: rolesProp,
  });

  const handleAddRole = (e) => {
    e?.preventDefault();
    setVariant("add");
    setOpenDialog(true);
  };
  const handleEditRole = (e) => {
    e?.preventDefault();
    setVariant("edit");
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
        onClick={handleAddRole}
      >
        Ongeza Jukumu
      </Button>
      {roles?.data?.length && (
        <Grid container className={classes.tableRoot}>
          <Grid
            item
            container
            justifyContent="space-between"
            alignItems="center"
            className={classes.row}
          >
            <Grid item>
              <Typography className={clsx(classes.cell, classes.header)}>
                Name
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={clsx(classes.cell, classes.header)}>
                Action
              </Typography>
            </Grid>
          </Grid>
          {roles?.data?.map((role) => (
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
              className={classes.row}
              key={role.name}
            >
              <Grid item>
                <Typography className={classes.cell}>{role.name}</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEditRole}
                >
                  Hariri
                </Button>
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}
      <RoleDialog
        variant={variant}
        handleCloseDialog={handleCloseDialog}
        openDialog={openDialog}
      />
    </div>
  );
}

Roles.propTypes = {
  roles: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
  }),
};

Roles.defaultProps = {
  roles: undefined,
};

export default Roles;

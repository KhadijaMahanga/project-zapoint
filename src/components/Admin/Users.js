/* eslint-disable no-underscore-dangle */
import { Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import fetcher from "@/jikopoint/utils/fetcher";

const useStyles = makeStyles(({ typography, palette }) => ({
  root: {},
  tableRoot: {
    border: `${typography.pxToRem(1)} solid #E2E2E3`,
    borderRadius: `${typography.pxToRem(4)}`,
    height: "100%",
    margin: `${typography.pxToRem(20)} 0`,
    "& div:nth-child(odd)": {
      backgroundColor: "#F9FAFB",
    },
  },
  row: {
    height: typography.pxToRem(50),
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
  cellName: {
    fontFamily: typography.fontFamily,
    fontSize: typography.pxToRem(16),
    textTransform: "capitalize",
  },
  header: {
    fontWeight: "bold",
    fontFamily: typography.h1.fontFamily,
  },
  button: {
    color: palette.text.secondary,
    backgroundColor: "#CC8585",
    fontSize: typography.pxToRem(13),
    padding: `${typography.pxToRem(6)} ${typography.pxToRem(10)}`,
  },
}));

function Users({ users: usersProp, ...props }) {
  const classes = useStyles(props);
  const [users, setUsers] = useState(usersProp);
  const [refreshList, setRefreshList] = useState(false);

  const { data: res } = useSWR(refreshList ? "/api/users" : null, fetcher);

  useEffect(() => {
    if (res?.success && res?.users) {
      setUsers(res?.users);
      setRefreshList(false);
    }
  }, [res]);

  const handleDeleteUser = async (e, id) => {
    e?.preventDefault();
    const options = {
      method: "DELETE",
      credentials: "same-origin",
    };
    const result = await fetcher(`/api/users/${id}`, options);
    if (!result.success) {
      // alert("Kumetokea tatizo la kiufundi, jaribu tena baadae");
    }
    setRefreshList(true);
  };

  return (
    <div className={classes.root}>
      {users?.length > 0 && (
        <Grid container className={classes.tableRoot}>
          <Grid
            item
            container
            justifyContent="flex-start"
            alignItems="center"
            className={classes.row}
          >
            <Grid item xs={3}>
              <Typography className={clsx(classes.cell, classes.header)}>
                Name
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={clsx(classes.cell, classes.header)}>
                Email
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={clsx(classes.cell, classes.header)}>
                Role
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={clsx(classes.cell, classes.header)}>
                Status
              </Typography>
            </Grid>
            <Grid item xs={1} />
          </Grid>
          {users?.map((c) => {
            let status = "InActive";
            if (c?.isDeleted) {
              status = "Deleted";
            }
            if (c?.emailVerified) {
              status = "Active";
            }
            return (
              <Grid
                item
                container
                justifyContent="flex-start"
                alignItems="center"
                className={classes.row}
                key={c.name}
              >
                <Grid item xs={3}>
                  <Typography className={classes.cellName}>{c.name}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className={classes.cell}>{c.email}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography className={classes.cell}>{c.role}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography className={classes.cell}>{status}</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={(e) => handleDeleteUser(e, c._id)}
                  >
                    Futa
                  </Button>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
}

Users.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string,
      name: PropTypes.string,
      isDeleted: PropTypes.bool,
      emailVerified: PropTypes.string,
      role: PropTypes.string,
    })
  ),
};

Users.defaultProps = {
  users: undefined,
};

export default Users;

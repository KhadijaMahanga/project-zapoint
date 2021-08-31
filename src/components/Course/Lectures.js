/* eslint-disable no-underscore-dangle */
import { Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import LectureDialog from "@/jikopoint/components/Course/LectureDialog";
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

function Lectures({ lectures: lecturesProp, ...props }) {
  const classes = useStyles(props);
  const [lectures, setLectures] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [variant, setVariant] = useState("add");
  const [row, setRow] = useState(null);
  const [refreshList, setRefreshList] = useState(false);

  useEffect(() => {
    if (lecturesProp?.length) {
      setLectures(lecturesProp);
    }
  }, [lecturesProp]);

  const { data: res } = useSWR(refreshList ? "/api/lectures" : null, fetcher);

  useEffect(() => {
    if (res?.success && res?.data) {
      setLectures(res?.data);
      setRefreshList(false);
    }
  }, [res]);

  const handleAddLecture = (e) => {
    e?.preventDefault();
    setVariant("add");
    setOpenDialog(true);
  };
  const handleEditLecture = (e, n) => {
    e?.preventDefault();
    setVariant("edit");
    setRow(n);
    setOpenDialog(true);
  };
  const handleCloseDialog = (e) => {
    e?.preventDefault();
    setOpenDialog(false);
  };

  const updateLecturesList = () => {
    setRefreshList(true);
  };

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        className={classes.addButton}
        onClick={handleAddLecture}
      >
        Ongeza Kundi la Kozi
      </Button>
      {lectures?.length && (
        <Grid container className={classes.tableRoot}>
          <Grid
            item
            container
            justifyContent="flex-start"
            alignItems="center"
            className={classes.row}
          >
            <Grid item xs={1}>
              <Typography className={clsx(classes.cell, classes.header)}>
                Index
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography className={clsx(classes.cell, classes.header)}>
                Name
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={clsx(classes.cell, classes.header)}>
                Video
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={clsx(classes.cell, classes.header)}>
                Video Type
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className={clsx(classes.cell, classes.header)}>
                Action
              </Typography>
            </Grid>
          </Grid>
          {lectures?.map((lec) => (
            <Grid
              item
              container
              justifyContent="flex-start"
              alignItems="center"
              className={classes.row}
              key={lec.no}
            >
              <Grid item xs={1}>
                <Typography className={classes.cell}>{lec.no}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.cell}>{lec.name}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.cell}>{lec.video}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography className={classes.cell}>{lec.type}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={(e) => handleEditLecture(e, lec)}
                >
                  Hariri
                </Button>
              </Grid>
            </Grid>
          ))}
        </Grid>
      )}
      <LectureDialog
        variant={variant}
        handleCloseDialog={handleCloseDialog}
        openDialog={openDialog}
        updateLecturesList={updateLecturesList}
        value={row}
      />
    </div>
  );
}

Lectures.propTypes = {
  lectures: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};

Lectures.defaultProps = {
  lectures: undefined,
};

export default Lectures;

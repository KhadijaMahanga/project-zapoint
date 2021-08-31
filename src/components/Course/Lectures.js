/* eslint-disable no-underscore-dangle */
import { Typography, Button, Grid, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import LectureDialog from "@/jikopoint/components/Course/LectureDialog";
import Section from "@/jikopoint/components/Section";
import fetcher from "@/jikopoint/utils/fetcher";

const useStyles = makeStyles(({ typography, palette }) => ({
  root: {
    paddingBottom: typography.pxToRem(40),
  },
  section: {},
  tableRoot: {
    border: `${typography.pxToRem(1)} solid #E2E2E3`,
    borderRadius: `${typography.pxToRem(4)}`,
    height: "100%",
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
    padding: `${typography.pxToRem(6)} ${typography.pxToRem(10)}`,
  },
}));

function Lectures({ lectures: lecturesProp, courseId, ...props }) {
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

  const { data: res } = useSWR(
    refreshList ? `/api/lectures/course/${courseId}` : null,
    fetcher
  );
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
      <Section classes={{ root: classes.section }}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Button
              variant="contained"
              color="primary"
              className={classes.addButton}
              onClick={handleAddLecture}
            >
              Ongeza Kundi la Kozi
            </Button>
            {lectures?.length ? (
              <Grid container className={classes.tableRoot}>
                <Grid
                  item
                  container
                  justifyContent="flex-start"
                  alignItems="center"
                  className={classes.row}
                >
                  <Hidden smDown>
                    <Grid item md={1}>
                      <Typography
                        className={clsx(classes.cell, classes.header)}
                      >
                        Index
                      </Typography>
                    </Grid>
                  </Hidden>
                  <Grid item xs={8} md={4}>
                    <Typography className={clsx(classes.cell, classes.header)}>
                      Name
                    </Typography>
                  </Grid>
                  <Hidden smDown>
                    <Grid item md={5}>
                      <Typography
                        className={clsx(classes.cell, classes.header)}
                      >
                        Video
                      </Typography>
                    </Grid>
                  </Hidden>
                  <Grid item xs={4} md={2}>
                    <Typography className={clsx(classes.cell, classes.header)}>
                      Action
                    </Typography>
                  </Grid>
                </Grid>
                {lectures
                  ?.sort((a, b) =>
                    a.no.toString().localeCompare(b.no.toString())
                  )
                  ?.map((lec) => (
                    <Grid
                      item
                      container
                      justifyContent="flex-start"
                      alignItems="center"
                      className={classes.row}
                      key={lec.no}
                    >
                      <Hidden smDown>
                        <Grid item md={1}>
                          <Typography className={classes.cell}>
                            {lec.no}
                          </Typography>
                        </Grid>
                      </Hidden>
                      <Grid item xs={8} md={4}>
                        <Typography className={classes.cell}>
                          {lec.name}
                        </Typography>
                      </Grid>
                      <Hidden smDown>
                        <Grid item md={5}>
                          <Typography className={classes.cell}>
                            {lec.video}
                          </Typography>
                        </Grid>
                      </Hidden>
                      <Grid item xs={4} md={2}>
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
            ) : (
              <Typography>
                Hauna somo. Bonyeza hapo juu kutengeneza somo kwenye kozi yako
              </Typography>
            )}
          </Grid>
        </Grid>
        <LectureDialog
          variant={variant}
          courseId={courseId}
          handleCloseDialog={handleCloseDialog}
          openDialog={openDialog}
          updateLecturesList={updateLecturesList}
          value={row}
        />
      </Section>
    </div>
  );
}

Lectures.propTypes = {
  courseId: PropTypes.string,
  lectures: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};

Lectures.defaultProps = {
  courseId: undefined,
  lectures: undefined,
};

export default Lectures;

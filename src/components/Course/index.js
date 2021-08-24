import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import Player from "./Player";

import Section from "@/jikopoint/components/Section";

const useStyles = makeStyles(({ palette, typography, breakpoints }) => ({
  root: {
    height: "100vh",
  },
  video: {
    position: "relative",
    height: typography.pxToRem(250),
    "& .video-js": {
      width: "100%",
      height: "100%",
    },
    "& .vjs-poster": {
      backgroundSize: "cover",
    },
    [breakpoints.up("md")]: {
      height: typography.pxToRem(320),
    },
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(400),
    },
  },
  section: {
    paddingTop: typography.pxToRem(40),
    paddingBottom: typography.pxToRem(10),
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

function Index({ course, owner, category, ...props }) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Section className={classes.section}>
        <Grid container>
          <Grid item xs={12} container>
            <Grid item xs={12} lg={8}>
              <div className={classes.video}>
                <Player
                  videoSrc="https://www.youtube.com/watch?v=yGG01tj9wi4"
                  videoType="video/youtube"
                  videoImg={course?.image}
                />
              </div>
            </Grid>
            <Grid item xs={12} lg={4} />
          </Grid>
          <Grid item xs={12} md={8} container>
            <Grid item xs={12} className={classes.section}>
              <Typography variant="h3" className={classes.title}>
                {course?.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.title}>{owner?.name}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.title}>
                {category?.name}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Section>
    </div>
  );
}

Index.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
  }),
  owner: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
  }),
  category: PropTypes.shape({
    name: PropTypes.string,
  }),
};

Index.defaultProps = {
  course: undefined,
  owner: undefined,
  category: undefined,
};

export default Index;

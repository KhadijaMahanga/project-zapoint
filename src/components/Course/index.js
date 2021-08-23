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
    height: typography.pxToRem(227),
    width: "100%",
    "& .video-js": {
      width: "100%",
      height: "100%",
    },
    "& .vjs-poster": {
      backgroundColor: "#ffffffE6",
      backgroundSize: "120%",
    },
    "& .video-js .vjs-big-play-button": {
      display: "none",
    },
    [breakpoints.up("md")]: {
      height: typography.pxToRem(194),
      width: typography.pxToRem(299),
      "& .vjs-poster": {
        backgroundSize: "auto",
      },
    },
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(244),
      width: typography.pxToRem(376),
    },
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

function Index({ course, ...props }) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <div className={classes.video}>
        <Player
          videoSrc="https://www.youtube.com/watch?v=yGG01tj9wi4"
          videoType="video/youtube"
          videoImg={course?.image}
        />
      </div>
      <Section classes={{ root: classes.section }} />
    </div>
  );
}

Index.propTypes = {
  course: PropTypes.shape({
    image: PropTypes.string,
  }),
};

Index.defaultProps = {
  course: undefined,
};

export default Index;

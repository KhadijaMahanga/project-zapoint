/* eslint-disable jsx-a11y/media-has-caption */
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { signIn } from "next-auth/react";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";
import "videojs-playlist";
import "videojs-contrib-quality-levels";
import "videojs-extra-buttons";
import "videojs-extra-buttons/dist/videojs-extra-buttons.css";
import "videojs-playlist-ui";
import "videojs-playlist-ui/dist/videojs-playlist-ui.vertical.css";

import LoginDialog from "@/jikopoint/components/Course/LoginDialog";

const useStyles = makeStyles(({ palette, typography, breakpoints }) => ({
  root: {
    "& .vjs-playlist": {
      background: palette.background.default,
    },
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
  lectureItem: {
    border: 0,
    background: "unset",
    marginTop: typography.pxToRem(10),
    color: palette.text.primary,
    fontSize: typography.pxToRem(16),
  },
  lectures: {
    paddingTop: typography.pxToRem(20),
    [breakpoints.up("lg")]: {
      padding: `0 ${typography.pxToRem(20)}`,
    },
  },
}));

function Player({ lectures, session, videoImg, ...props }) {
  const classes = useStyles();
  const [videoEl, setVideoEl] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);

  const videoList = lectures
    ?.sort((a, b) => a.no.toString().localeCompare(b.no.toString()))
    .map((l) => {
      const sources = [
        {
          src: l.video,
          type: l.type,
        },
      ];
      return {
        ...l,
        sources,
      };
    });

  const handleCloseDialog = () => {
    setOpenLogin(false);
  };

  const onVideo = useCallback((el) => {
    setVideoEl(el);
  }, []);

  const handleOnPlay = (player) => {
    if (!session?.user) {
      player.pause();
      player.currentTime(0);
      setOpenLogin(true);
    }
  };

  useEffect(() => {
    if (videoEl == null) return null;
    const player = videojs(videoEl);
    player.extraButtons({
      quickBackward: { seconds: 3 },
      quickForward: { seconds: 3 },
      qualitySelect: [
        { bandwidth: 524288, name: "Low" },
        { bandwidth: 1048576, name: "Mid" },
        { bandwidth: 2097152, name: "Hight" },
        { bandwidth: 4194304, name: "Hight+" },
      ],
    });
    player.playlist(videoList);
    player.playlist.autoadvance(0);
    player.playlistUi();
    player.on("play", () => handleOnPlay(player));

    return () => {
      player.dispose();
    };
  }, [videoEl]);

  return (
    <Grid
      item
      xs={12}
      container
      justifyContent="space-between"
      className={classes.root}
    >
      <Grid item xs={12} lg={8}>
        <div className={classes.video}>
          <div data-vjs-player>
            <video
              ref={onVideo}
              className="video-js vjs-default-skin hide"
              playsInline
              controls
              preload="auto"
              poster={videoImg}
              data-setup={{}}
            >
              <p className="vjs-no-js">
                To view this video please enable JavaScript, and consider
                upgrading to a web browser that{" "}
                <a href="http://videojs.com/html5-video-support/">
                  supports HTML5 video
                </a>
              </p>
            </video>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} lg={4} className={classes.lectures}>
        <Typography variant="h4" color="primary">
          Somo/Vipindi
        </Typography>
        <div className="vjs-playlist" />
      </Grid>
      <LoginDialog
        {...props}
        openDialog={openLogin}
        handleCloseDialog={handleCloseDialog}
        signIn={signIn}
      />
    </Grid>
  );
}

Player.propTypes = {
  videoImg: PropTypes.string,
  session: PropTypes.shape({
    user: PropTypes.shape({}),
  }),
  lectures: PropTypes.arrayOf(
    PropTypes.shape({
      video: PropTypes.string,
      type: PropTypes.string,
      no: PropTypes.number,
      name: PropTypes.string,
    })
  ),
};

Player.defaultProps = {
  videoImg: undefined,
  session: undefined,
  lectures: undefined,
};

export default Player;

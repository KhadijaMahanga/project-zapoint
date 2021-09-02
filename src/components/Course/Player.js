/* eslint-disable jsx-a11y/media-has-caption */
import { signIn } from "next-auth/client";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";

import LoginDialog from "@/jikopoint/components/Course/LoginDialog";

function Player({ videoSrc, videoType, session, videoImg, ...props }) {
  const [videoEl, setVideoEl] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);

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
    player.on("play", () => handleOnPlay(player));
    return () => {
      player.dispose();
    };
  }, [videoEl]);

  return (
    <>
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
          <source src={videoSrc} type={videoType} />
        </video>
      </div>
      <LoginDialog
        {...props}
        openDialog={openLogin}
        handleCloseDialog={handleCloseDialog}
        signIn={signIn}
      />
    </>
  );
}

Player.propTypes = {
  videoSrc: PropTypes.string,
  videoType: PropTypes.string,
  videoImg: PropTypes.string,
  session: PropTypes.shape({
    user: PropTypes.shape({}),
  }),
};

Player.defaultProps = {
  videoSrc: undefined,
  videoType: undefined,
  videoImg: undefined,
  session: undefined,
};

export default Player;

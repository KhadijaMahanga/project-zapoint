/* eslint-disable jsx-a11y/media-has-caption */
import { getProviders, getCsrfToken } from "next-auth/client";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";

import LoginDialog from "@/jikopoint/components/Course/LoginDialog";
import useAuth from "@/jikopoint/hooks/useAuth";

function Player({ videoSrc, videoType, videoImg }) {
  const { session, isAuthenticated, signIn } = useAuth();
  const [videoEl, setVideoEl] = useState(null);
  const [openLogin, setOpenLogin] = useState(false);

  const handleCloseDialog = () => {
    setOpenLogin(false);
  };

  const [providers, setProviders] = useState(null);
  const [csrfToken, setCsrfToken] = useState(null);
  useEffect(() => {
    async function getValues() {
      const p = await getProviders();
      setProviders(p);

      const c = await getCsrfToken();
      setCsrfToken(c);
    }
    getValues();
  }, []);

  const onVideo = useCallback((el) => {
    setVideoEl(el);
  }, []);

  const handleOnPlay = (player) => {
    if (!isAuthenticated && !session?.user) {
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
        openDialog={openLogin}
        handleCloseDialog={handleCloseDialog}
        providers={providers}
        csrfToken={csrfToken}
        signIn={signIn}
      />
    </>
  );
}

Player.propTypes = {
  videoSrc: PropTypes.string,
  videoType: PropTypes.string,
  videoImg: PropTypes.string,
};

Player.defaultProps = {
  videoSrc: undefined,
  videoType: undefined,
  videoImg: undefined,
};

export default Player;

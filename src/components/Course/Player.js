/* eslint-disable jsx-a11y/media-has-caption */
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import videojs from "video.js";
import "videojs-youtube";
import "video.js/dist/video-js.css";

function Player({ videoSrc, videoType, videoImg }) {
  const [videoEl, setVideoEl] = useState(null);
  const onVideo = useCallback((el) => {
    setVideoEl(el);
  }, []);

  useEffect(() => {
    if (videoEl == null) return null;
    const player = videojs(videoEl);
    return () => {
      player.dispose();
    };
  }, [videoEl]);

  return (
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

import PropTypes from "prop-types";
import React from "react";

function DefaultProfilePic({ letter }) {
  return (
    <svg width="100%" height="100%">
      <circle cx="50%" cy="50%" r="50%" fill="currentColor" />
      <text
        x="50%"
        y="50%"
        alignmentBaseline="central"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontSize="inherit"
        fill="#fff"
      >
        {letter.toUpperCase()}
      </text>
    </svg>
  );
}

DefaultProfilePic.propTypes = {
  letter: PropTypes.string.isRequired,
};

export default DefaultProfilePic;

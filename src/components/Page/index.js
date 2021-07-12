import PropTypes from "prop-types";
import React from "react";

import Base from "./Base";


function Page({ errorCode, ...props }) {
  return <Base {...props} />;
}

Page.propTypes = {
  errorCode: PropTypes.number,
};

Page.defaultProps = {
  errorCode: undefined,
};

export default Page;
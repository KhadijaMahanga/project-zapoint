import PropTypes from "prop-types";
import React from "react";

import Courses from "./Courses";

import Tabs from "@/jikopoint/components/Tabs";

function Trainee({ ...props }) {
  return (
    <Tabs
      name="trainee-page"
      items={[
        {
          label: "Kozi Zangu",
          panel: <Courses {...props} />,
        },
      ]}
    />
  );
}

Trainee.propTypes = {
  errorCode: PropTypes.number,
};

Trainee.defaultProps = {
  errorCode: undefined,
};

export default Trainee;

import PropTypes from "prop-types";
import React from "react";

import Courses from "./Courses";

import Tabs from "@/jikopoint/components/Tabs";

function Trainer({ ...props }) {
  return (
    <Tabs
      name="trainer-page"
      items={[
        {
          label: "Kozi Zangu",
          panel: <Courses {...props} />,
        },
        {
          label: "Taarifa",
          panel: <div />,
        },
      ]}
    />
  );
}

Trainer.propTypes = {
  errorCode: PropTypes.number,
};

Trainer.defaultProps = {
  errorCode: undefined,
};

export default Trainer;

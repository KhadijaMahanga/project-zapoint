import PropTypes from "prop-types";
import React from "react";

import Categories from "./Categories";
import Courses from "./Courses";
import Users from "./Users";

import Tabs from "@/jikopoint/components/Tabs";

function Admin({ ...props }) {
  return (
    <Tabs
      name="admin-page"
      items={[
        {
          label: "Muhtasari",
          panel: <div />,
        },
        {
          label: "Aina ya Kozi",
          panel: <Categories {...props} />,
        },
        {
          label: "Kozi",
          panel: <Courses {...props} />,
        },
        {
          label: "Watumiaji",
          panel: <Users {...props} />,
        },
        {
          label: "Usajili",
          panel: <div />,
        },
      ]}
    />
  );
}

Admin.propTypes = {
  errorCode: PropTypes.number,
};

Admin.defaultProps = {
  errorCode: undefined,
};

export default Admin;

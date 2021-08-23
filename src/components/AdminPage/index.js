import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import Categories from "./Categories";
import Courses from "./Courses";

import Section from "@/jikopoint/components/Section";
import Tabs from "@/jikopoint/components/Tabs";

const useStyles = makeStyles(({ palette, typography, breakpoints }) => ({
  root: {
    backgroundColor: palette.background.default,
    padding: `${typography.pxToRem(20)} 0`,
    [breakpoints.up("lg")]: {
      padding: `${typography.pxToRem(40)} 0 ${typography.pxToRem(80)}`,
    },
    height: "100vh",
  },
  section: {},
}));

function AdminPage({ ...props }) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.Section }}>
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
              panel: <div />,
            },
            {
              label: "Usajili",
              panel: <div />,
            },
          ]}
        />
      </Section>
    </div>
  );
}

AdminPage.propTypes = {
  errorCode: PropTypes.number,
};

AdminPage.defaultProps = {
  errorCode: undefined,
};

export default AdminPage;

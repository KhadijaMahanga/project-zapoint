import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import Roles from "./Roles";

import Section from "@/jikopoint/components/Section";
import Tabs from "@/jikopoint/components/Tabs";

const useStyles = makeStyles(({ palette, typography, breakpoints }) => ({
  root: {
    backgroundColor: palette.background.default,
    padding: `${typography.pxToRem(20)} 0`,
    [breakpoints.up("lg")]: {
      padding: `${typography.pxToRem(40)} 0 ${typography.pxToRem(80)}`,
    },
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
              label: "Jukumu",
              panel: <Roles {...props} />,
            },
            {
              label: "Aina ya Kozi",
              panel: <div />,
            },
            {
              label: "Kozi",
              panel: <div />,
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

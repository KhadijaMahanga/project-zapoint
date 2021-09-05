import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import Account from "./Account";
import Basic from "./Basic";
import ProfileImage from "./ProfileImage";

import Section from "@/jikopoint/components/Section";
import Tabs from "@/jikopoint/components/Tabs";

const useStyles = makeStyles(({ typography, breakpoints }) => ({
  root: {
    margin: `${typography.pxToRem(20)} 0`,
    [breakpoints.up("md")]: {
      margin: `${typography.pxToRem(40)} 0 `,
    },
  },
  section: {},
  tabs: {
    margin: `${typography.pxToRem(20)} 0`,
  },
  divider: {
    display: "none",
  },
}));

function Profile({ ...props }) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid container justifyContent="space-between">
          <Grid item xs={12} lg={8}>
            <Typography variant="h3" color="primary">
              Hariri wasifu wako{" "}
            </Typography>
            <Tabs
              classes={{ tabs: classes.tabs, divider: classes.divider }}
              name="profile-page"
              items={[
                {
                  label: "Habari za Msingi",
                  panel: <Basic {...props} />,
                },
                {
                  label: "Picha ya Utambulisho",
                  panel: <ProfileImage {...props} />,
                },
                {
                  label: "Akaunti",
                  panel: <Account {...props} />,
                },
              ]}
            />
          </Grid>
        </Grid>
      </Section>
    </div>
  );
}

export default Profile;

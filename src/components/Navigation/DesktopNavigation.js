
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import Section from "@/jikopoint/components/Section";


const useStyles = makeStyles(({ palette }) => ({
  root: {
    backgroundColor: palette.background.default,
  },
  section: {},
}));
function DesktopNavigation({ menuItems , ...props}) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid container alignItems="center">
          
        </Grid>
      </Section>
    </div>
  );
}

DesktopNavigation.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      path: PropTypes.string,
      children: PropTypes.arrayOf(PropTypes.shape({})),
    })
  ),
};

DesktopNavigation.defaultProps = {
  menuItems: undefined,
};

export default DesktopNavigation;
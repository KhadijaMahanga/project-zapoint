import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import RichTypography from "@/jikopoint/components/RichTypography";
import Section from "@/jikopoint/components/Section";

const useStyles = makeStyles(({ palette, typography, breakpoints }) => ({
  root: {
    padding: `${typography.pxToRem(20)} 0`,
    [breakpoints.up("md")]: {
      padding: `${typography.pxToRem(30)} 0`,
    },
  },
  section: {},
  title: {
    fontWeight: 400,
    color: palette.secondary.main,
  },
}));

function RichContent({ title, content, ...props }) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid container>
          <Grid item xs={12} lg={8}>
            <Typography className={classes.title} variant="h3">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={8}>
            <RichTypography>{content}</RichTypography>
          </Grid>
        </Grid>
      </Section>
    </div>
  );
}

RichContent.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

RichContent.defaultProps = {
  title: undefined,
  content: undefined,
};

export default RichContent;

import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import Register from "@/jikopoint/components/Auth/Register";
import Metrics from "@/jikopoint/components/Metrics";
import Page from "@/jikopoint/components/Page";
import Section from "@/jikopoint/components/Section";
import formatBlocksForSections from "@/jikopoint/functions/formatBlocksForSections";
import getPostTypeStaticProps from "@/jikopoint/functions/postTypes/getPostTypeStaticProps";

const useStyles = makeStyles(({ typography, breakpoints }) => ({
  root: {
    padding: `${typography.pxToRem(20)} 0`,
    [breakpoints.up("md")]: {
      padding: `${typography.pxToRem(30)} 0`,
    },
  },
  section: {},
}));

export default function Mkufunzi({ blocks, ...props }) {
  const classes = useStyles();
  return (
    <Page {...props}>
      <div className={classes.root}>
        <Section classes={{ root: classes.section }}>
          <Grid container justifyContent="space-between">
            <Grid item xs={12} lg={7}>
              <Metrics {...blocks?.kuwaMkufunzi} />
            </Grid>
            <Grid item lg={1} />
            <Grid item xs={12} lg={4}>
              <Typography variant="h4">Jiunge hapa</Typography>
              <Register userrole="trainer" />
            </Grid>
          </Grid>
        </Section>
      </div>
    </Page>
  );
}

Mkufunzi.propTypes = {
  blocks: PropTypes.shape({
    kuwaMkufunzi: PropTypes.shape({}),
  }),
};

Mkufunzi.defaultProps = {
  blocks: undefined,
};

export async function getStaticProps({ preview, previewData }) {
  const postType = "page";
  const { props, notFound } = await getPostTypeStaticProps(
    { slug: "kuwa-mkufunzi" },
    postType,
    preview,
    previewData
  );

  if (notFound) {
    return {
      notFound,
    };
  }
  const blocks = formatBlocksForSections(props?.post?.blocks ?? []);

  return {
    props: {
      ...props,
      blocks,
    },
    revalidate: 60 * 5,
  };
}

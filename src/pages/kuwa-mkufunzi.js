import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import launchCourse from "@/jikopoint/assets/images/launch-your-course-v3.jpg";
import planCurriculum from "@/jikopoint/assets/images/plan-your-curriculum-v3.jpg";
import recordVideo from "@/jikopoint/assets/images/record-your-video-v3.jpg";
import Register from "@/jikopoint/components/Auth/Register";
import Metrics from "@/jikopoint/components/Metrics";
import Page from "@/jikopoint/components/Page";
import Section from "@/jikopoint/components/Section";
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

export default function Mkufunzi(props) {
  const classes = useStyles();
  return (
    <Page {...props}>
      <div className={classes.root}>
        <Section classes={{ root: classes.section }}>
          <Grid container justifyContent="space-between">
            <Grid item xs={12} lg={7}>
              <Metrics
                title="Jinsi ya kuanza"
                items={[
                  {
                    title: "Andaa somo",
                    image: planCurriculum,
                    description:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas magna at porttitor vehicula. Nullam augue augue, dignissim id bibendum id, consequat et leo. Curabitur viverra tincidunt nulla nec tempor nullam augue augue.",
                  },
                  {
                    title: "Rekodi somo",
                    image: recordVideo,
                    description:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas magna at porttitor vehicula. Nullam augue augue, dignissim id bibendum id, consequat et leo. Curabitur viverra tincidunt nulla nec tempor nullam augue augue.",
                  },
                  {
                    title: "Zindua somo lako",
                    image: launchCourse,
                    description:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean egestas magna at porttitor vehicula. Nullam augue augue, dignissim id bibendum id, consequat et leo. Curabitur viverra tincidunt nulla nec tempor nullam augue augue.",
                  },
                ]}
              />
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

export async function getStaticProps({ preview, previewData }) {
  const postType = "page";
  const { props, revalidate, notFound } = await getPostTypeStaticProps(
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

  return {
    props: {
      ...props,
    },
    revalidate,
  };
}

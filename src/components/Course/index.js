/* eslint-disable no-underscore-dangle */
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import dynamic from "next/dynamic";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import { ReactComponent as IconCategory } from "@/jikopoint/assets/icons/icon-category-grey.svg";
import DefaultProfilePic from "@/jikopoint/components/DefaultProfilePic";
import RichTypography from "@/jikopoint/components/RichTypography";
import Section from "@/jikopoint/components/Section";
import ShareBar from "@/jikopoint/components/ShareBar";
import Tabs from "@/jikopoint/components/Tabs";

const Player = dynamic(() => import("./Player"), { ssr: false });

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {},
  section: {
    paddingTop: typography.pxToRem(40),
    paddingBottom: typography.pxToRem(10),
  },
  label: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(16),
  },
  button: {
    color: palette.text.secondary,
  },
  title: {
    fontWeight: 500,
    marginBottom: typography.pxToRem(20),
  },
  imageBtn: {
    color: palette.text.secondary,
  },
  profileImage: {
    width: typography.pxToRem(40),
    height: typography.pxToRem(40),
    position: "relative",
    borderRadius: "100%",
    color: palette.background.light,
    fontSize: typography.pxToRem(16),
  },
  icon: {
    width: typography.pxToRem(25),
    height: typography.pxToRem(25),
  },
  name: {
    fontSize: typography.pxToRem(16),
    textTransform: "capitalize",
  },
  header: {
    textTransform: "uppercase",
    color: palette.text.primary,
    fontSize: typography.pxToRem(12),
    fontWeight: "bold",
  },
  tabsRoot: {
    margin: `${typography.pxToRem(30)} 0`,
  },
  tab: {
    textTransform: "Capitalize",
    fontWeight: "normal",
  },
  panel: {
    margin: `${typography.pxToRem(20)} 0`,
  },
  subtitle: {
    fontSize: typography.pxToRem(17),
    fontWeight: "bold",
    marginBottom: typography.pxToRem(20),
  },
  description: {
    fontSize: typography.pxToRem(16),
    lineHeight: 1.8,
    marginBottom: typography.pxToRem(30),
  },
  shareIcon: {
    marginRight: typography.pxToRem(15),
  },
  image: {
    borderRadius: "100%",
  },
}));

const socialLinks = [
  { name: "facebook", alt: "facebook" },
  { name: "twitter", alt: "twitter" },
  { name: "linkedin", alt: "linkedin" },
  { name: "whatsApp", alt: "whatsApp" },
  { name: "telegram", alt: "telegram" },
];

function Index({ course, category, ...props }) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Section className={classes.section}>
        <Grid container>
          <Player {...props} videoImg={course?.image} />
          <Grid item xs={12} md={8} container alignItems="center">
            <Grid item xs={12} className={classes.section}>
              <Typography variant="h3" className={classes.title}>
                {course?.name}
              </Typography>
            </Grid>
            <Grid item container xs={5} alignItems="center">
              <Grid item xs={4} md={2}>
                <div className={classes.profileImage}>
                  {course?.instructor?.image ? (
                    <Image
                      src={course?.instructor.image}
                      layout="fill"
                      className={classes.image}
                    />
                  ) : (
                    <DefaultProfilePic
                      letter={
                        course?.instructor.name[0] ||
                        course?.instructor.email[0]
                      }
                    />
                  )}
                </div>
              </Grid>
              <Grid item container xs={8} md={10}>
                <Grid item xs={12}>
                  <Typography className={classes.header}>Mkufunzi</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.name}>
                    {course?.instructor?.name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={4} alignItems="center">
              <Grid item xs={4} md={2}>
                <IconCategory className={classes.icon} />
              </Grid>
              <Grid item container xs={8} md={10}>
                <Grid item xs={12}>
                  <Typography className={classes.header}>
                    Kundi la kozi
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.name}>
                    {category?.name}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={12}>
              <Tabs
                classes={{ root: classes.tabsRoot, tab: classes.tab }}
                name="course-page"
                items={[
                  {
                    label: "Maelezo",
                    panel: (
                      <div className={classes.panel}>
                        <Typography className={classes.subtitle}>
                          Maelezo ya Kozi
                        </Typography>
                        <RichTypography className={classes.description}>
                          {course?.description}
                        </RichTypography>
                        <ShareBar
                          socialLinks={socialLinks}
                          title={course?.name}
                          classes={{ icon: classes.shareIcon }}
                        />
                      </div>
                    ),
                  },
                  {
                    label: "Mkufunzi",
                    panel: (
                      <div className={classes.panel}>
                        <Typography className={classes.subtitle}>
                          Wasifu wa Mkufunzi
                        </Typography>{" "}
                      </div>
                    ),
                  },
                  {
                    label: "Maoni",
                    panel: <div />,
                  },
                ]}
              />
            </Grid>
          </Grid>
        </Grid>
      </Section>
    </div>
  );
}

Index.propTypes = {
  course: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    instructor: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
  category: PropTypes.shape({
    name: PropTypes.string,
  }),
};

Index.defaultProps = {
  course: undefined,
  category: undefined,
};

export default Index;

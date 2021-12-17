/* eslint-disable no-underscore-dangle */
import { Typography, Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import dynamic from "next/dynamic";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";
import {
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";

import { ReactComponent as IconCategory } from "@/jikopoint/assets/icons/icon-category-grey.svg";
import Comments from "@/jikopoint/components/Comments";
import DefaultProfilePic from "@/jikopoint/components/DefaultProfilePic";
import Link from "@/jikopoint/components/Link";
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
  profileIconButton: {
    padding: 0,
    marginLeft: typography.pxToRem(8),
  },
  profileIcon: {
    borderRadius: "50%",
    height: typography.pxToRem(30),
    width: typography.pxToRem(30),
    marginRight: typography.pxToRem(3),
    cursor: "pointer",
  },
  profileSocial: {
    display: "inline-flex",
  },
  profileSocialTitle: {
    fontSize: typography.pxToRem(12),
  },
}));

const socialLinks = [
  { name: "facebook", alt: "facebook" },
  { name: "twitter", alt: "twitter" },
  { name: "linkedin", alt: "linkedin" },
  { name: "whatsApp", alt: "whatsApp" },
  { name: "telegram", alt: "telegram" },
];

function Index({ course, category, profile, ...props }) {
  const classes = useStyles(props);

  const imageDomains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(", ");
  const xImg = imageDomains.find((d) => course?.instructor?.image?.includes(d));

  return (
    <div className={classes.root}>
      <Section className={classes.section}>
        <Grid container>
          <Player {...props} videoImg={course?.image} />
          <Grid item xs={12} lg={8} container alignItems="center">
            <Grid item xs={12} className={classes.section}>
              <Typography variant="h3" className={classes.title}>
                {course?.name}
              </Typography>
            </Grid>
            <Grid item container xs={5} alignItems="center">
              <Grid item xs={4} md={2}>
                <div className={classes.profileImage}>
                  {course?.instructor?.image && xImg ? (
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
                        <RichTypography className={classes.description}>
                          {profile?.bio}
                        </RichTypography>
                        <div className={classes.profileSocial}>
                          <Typography
                            variant="caption"
                            className={classes.profileSocialTItle}
                          >
                            Akaunti za social media:
                          </Typography>
                          {profile?.social &&
                            Object.keys(profile?.social).map((s) => {
                              switch (s) {
                                case "facebook":
                                  return (
                                    <IconButton
                                      key={s}
                                      component={Link}
                                      className={classes.profileIconButton}
                                      href={`https://facebook.com/${profile?.social[s]}`}
                                    >
                                      <FacebookIcon
                                        className={classes.profileIcon}
                                      />
                                    </IconButton>
                                  );
                                case "twitter":
                                  return (
                                    <IconButton
                                      key={s}
                                      component={Link}
                                      className={classes.profileIconButton}
                                      href={`https://twitter.com/${profile?.social[s]}`}
                                    >
                                      <TwitterIcon
                                        className={classes.profileIcon}
                                      />
                                    </IconButton>
                                  );
                                case "linkedin":
                                  return (
                                    <IconButton
                                      key={s}
                                      className={classes.profileIconButton}
                                      href={`https://linkedin.com/in/${profile?.social[s]}`}
                                      component={Link}
                                    >
                                      <LinkedinIcon
                                        className={classes.profileIcon}
                                      />
                                    </IconButton>
                                  );
                                case "whatsApp":
                                  return (
                                    <IconButton
                                      key={s}
                                      component={Link}
                                      className={classes.profileIconButton}
                                      href={`https://api.whatsapp.com/send?phone=${profile?.social[s]}&text=From%20JikoPoint.`}
                                    >
                                      <WhatsappIcon
                                        className={classes.profileIcon}
                                      />
                                    </IconButton>
                                  );
                                case "telegram":
                                  return (
                                    <IconButton
                                      key={s}
                                      component={Link}
                                      className={classes.profileIconButton}
                                      href={`https://telegram.me/${profile?.social[s]}`}
                                    >
                                      <TelegramIcon
                                        className={classes.profileIcon}
                                      />
                                    </IconButton>
                                  );
                                default:
                                  return null;
                              }
                            })}
                        </div>
                      </div>
                    ),
                  },
                  {
                    label: "Maoni",
                    panel: <Comments course={course?._id} {...props} />,
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
    _id: PropTypes.string,
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
  profile: PropTypes.shape({
    social: PropTypes.shape({
      twitter: PropTypes.string,
      facebook: PropTypes.string,
    }),
    bio: PropTypes.string,
  }),
};

Index.defaultProps = {
  course: undefined,
  category: undefined,
  profile: undefined,
};

export default Index;

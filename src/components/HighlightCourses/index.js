/* eslint-disable no-underscore-dangle */
import { Typography, Grid, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import CourseCard from "@/jikopoint/components/CourseCard";
import Link from "@/jikopoint/components/Link";
import Section from "@/jikopoint/components/Section";
import fetcher from "@/jikopoint/utils/fetcher";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    margin: `${typography.pxToRem(20)} 0`,
    [breakpoints.up("md")]: {
      margin: `${typography.pxToRem(40)} 0`,
    },
  },
  section: {},
  title: {
    marginBottom: typography.pxToRem(10),
  },
  subtitle: {
    marginBottom: typography.pxToRem(30),
    display: "block",
    color: palette.text.primary,
    "&:hover": {
      color: palette.primary.main,
    },
  },
  grid: {
    [breakpoints.up("md")]: {
      flexWrap: "nowrap",
    },
  },
  cardSection: {
    [breakpoints.only("md")]: {
      "&:nth-child(1)": {
        marginRight: typography.pxToRem(20),
      },
    },
    [breakpoints.up("lg")]: {
      "&:nth-child(2)": {
        margin: `0 ${typography.pxToRem(20)}`,
      },
    },
  },
}));

function HighlightCourses({ title, subtitle, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const [items, setItems] = useState([]);
  const { data } = useSWR("/api/courses", fetcher);

  useEffect(() => {
    if (data?.success) {
      setItems(data.data);
    }
  }, [data]);

  if (!items?.length) {
    return null;
  }
  const numberOfItemsToShow = isDesktop ? 6 : 4;
  const itemsProp = items.slice(0, numberOfItemsToShow);
  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Typography variant="h3" className={classes.title}>
          {title}
        </Typography>
        <Typography
          underline="none"
          variant="h6"
          component={Link}
          href="/habari"
          className={classes.subtitle}
        >
          {subtitle}
        </Typography>
        <Grid container className={classes.grid}>
          {itemsProp.map(({ _id, ...item }) => (
            <Grid
              xs={12}
              md={6}
              lg={4}
              className={classes.cardSection}
              key={_id}
              item
            >
              <CourseCard {...item} slug={_id} />
            </Grid>
          ))}
        </Grid>
      </Section>
    </div>
  );
}

HighlightCourses.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

HighlightCourses.defaultProps = {
  title: undefined,
  subtitle: undefined,
};

export default HighlightCourses;

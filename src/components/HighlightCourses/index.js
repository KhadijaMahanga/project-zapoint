import { Typography, Grid, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import Link from "@/jikopoint/components/Link";
import NewsCard from "@/jikopoint/components/NewsCard";
import Section from "@/jikopoint/components/Section";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    margin: typography.pxToRem(50, 0),
    [breakpoints.up("md")]: {
      margin: typography.pxToRem(50, 0),
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

function HighlightCourses({ items: itemsProp, title, subtitle, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.only("md"));

  if (!itemsProp?.length) {
    return null;
  }
  const numberOfItemsToShow = isTablet ? 2 : 3;
  const items = itemsProp.slice(0, numberOfItemsToShow);
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
          {items.map((item) => (
            <Grid
              xs={12}
              md={6}
              lg={4}
              className={classes.cardSection}
              key={item.slug}
              item
            >
              <NewsCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Section>
    </div>
  );
}

HighlightCourses.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ slug: PropTypes.string })),
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

HighlightCourses.defaultProps = {
  items: undefined,
  title: undefined,
  subtitle: undefined,
};

export default HighlightCourses;

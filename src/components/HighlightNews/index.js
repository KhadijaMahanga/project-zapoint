import { Typography, Grid, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import Link from "@/jikopoint/components/Link";
import NewsCard from "@/jikopoint/components/NewsCard";
import Section from "@/jikopoint/components/Section";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    marginBottom: typography.pxToRem(44),
    marginTop: typography.pxToRem(44),
    [breakpoints.up("md")]: {
      marginBottom: typography.pxToRem(58),
      marginTop: typography.pxToRem(58),
    },
  },
  section: {},
  title: {
    marginBottom: typography.pxToRem(32),
    display: "block",
  },
  button: {
    paddingLeft: 0,
    color: palette.info.main,
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
  cta: {
    borderTop: ".01rem solid #eeeeee99",
    marginTop: typography.pxToRem(40),
    paddingTop: typography.pxToRem(20),
    width: "100%",
    [breakpoints.up("md")]: {
      marginTop: typography.pxToRem(16),
    },
  },
}));

function HighlightNews({ items: itemsProp, title, subtitle, ...props }) {
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
        <Typography variant="subtitle1" className={classes.title}>
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          component={Link}
          href="/habari"
          className={classes.title}
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

HighlightNews.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ slug: PropTypes.string })),
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

HighlightNews.defaultProps = {
  items: undefined,
  title: undefined,
  subtitle: undefined,
};

export default HighlightNews;

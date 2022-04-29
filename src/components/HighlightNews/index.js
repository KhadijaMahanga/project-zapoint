import { Typography, Grid, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import Link from "@/jikopoint/components/Link";
import NewsCard from "@/jikopoint/components/NewsCard";
import Section from "@/jikopoint/components/Section";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    margin: `${typography.pxToRem(20)} 0`,
    [breakpoints.up("md")]: {
      margin: `${typography.pxToRem(60)} 0 ${typography.pxToRem(40)}`,
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
      "&:first-child": {
        marginRight: typography.pxToRem(20),
      },
    },
    [breakpoints.up("lg")]: {
      marginRight: typography.pxToRem(20),
      "&:last-child": {
        marginRight: 0,
      },
    },
  },
  cardTitle: {
    height: typography.pxToRem(60),
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(60),
    },
  },
  cardRoot: {
    height: typography.pxToRem(310),
    [breakpoints.up("lg")]: {
      width: "100%",
    },
  },
  cardImage: {
    height: typography.pxToRem(170),
  },
}));

function HighlightNews({
  items: itemsProp,
  title,
  subtitle,
  isRelatedNews,
  ...props
}) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.only("md"));

  if (!itemsProp?.length) {
    return <div className={classes.root} />;
  }
  let numberOfItemsToShow = 3;
  if (isRelatedNews) {
    numberOfItemsToShow = 4;
  }
  if (isTablet) {
    numberOfItemsToShow = 2;
  }
  const items = itemsProp.slice(0, numberOfItemsToShow);
  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Typography variant="h3" className={classes.title}>
          {title}
        </Typography>
        {subtitle && (
          <Typography
            underline="none"
            variant="h6"
            component={Link}
            href="/jiko-news"
            className={classes.subtitle}
          >
            {subtitle}
          </Typography>
        )}
        <Grid container className={classes.grid}>
          {items.map(
            ({ featuredImage, excerpt, categories, slug, ...item }) => (
              <Grid
                xs={12}
                md={6}
                lg={isRelatedNews ? 3 : 4}
                className={classes.cardSection}
                key={slug}
                item
              >
                <NewsCard
                  {...item}
                  category={categories?.edges[0]?.node}
                  description={excerpt?.replace(/<[^>]+>/g, "") ?? ""}
                  slug={slug}
                  image={featuredImage?.node?.sourceUrl}
                  classes={{
                    title: clsx({ [classes.cardTitle]: isRelatedNews }),
                    root: clsx({ [classes.cardRoot]: isRelatedNews }),
                    image: clsx({ [classes.cardImage]: isRelatedNews }),
                  }}
                />
              </Grid>
            )
          )}
        </Grid>
      </Section>
    </div>
  );
}

HighlightNews.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      excerpt: PropTypes.string,
      featuredImage: PropTypes.shape({
        node: PropTypes.shape({
          sourceUrl: PropTypes.string,
        }),
      }),
      slug: PropTypes.string,
    })
  ),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  isRelatedNews: PropTypes.bool,
};

HighlightNews.defaultProps = {
  items: undefined,
  title: undefined,
  subtitle: undefined,
  isRelatedNews: false,
};

export default HighlightNews;

import {
  Button,
  Divider,
  Hidden,
  List,
  ListItemText,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Fragment } from "react";

import Link from "@/jikopoint/components/Link";
import Section from "@/jikopoint/components/Section";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    marginTop: typography.pxToRem(10),
    [breakpoints.up("md")]: {
      marginTop: typography.pxToRem(20),
    },
  },
  section: {},
  divider: {
    backgroundColor: "#f1f1f1",
    float: "left",
    height: typography.pxToRem(18),
    margin: `auto ${typography.pxToRem(20)} 0`,
  },
  icon: {
    width: typography.pxToRem(25),
    height: typography.pxToRem(25),
  },
  menuButton: {
    color: palette.text.primary,
    padding: 0,
    marginLeft: typography.pxToRem(30),
    "&:hover": {
      background: "none",
    },
  },
  list: {
    listStyle: "none",
    display: "block",
  },
  listItemLink: {
    float: "left",
    color: palette.text.primary,
    fontSize: typography.pxToRem(16),
    fontWeight: 400,
    textTransform: "uppercase",
  },
  active: {
    borderBottom: `1px solid ${palette.secondary.main}`,
  },
  flexDisplay: {
    display: "flex",
    padding: `0 ${typography.pxToRem(10)}`,
  },
  news: {
    color: palette.text.secondary,
    backgroundColor: palette.secondary.main,
    padding: typography.pxToRem(8),
    fontSize: typography.pxToRem(20),
    fontFamily: typography.h2.fontFamily,
    fontWeight: "normal",
    "&:hover": {
      color: palette.text.secondary,
      backgroundColor: "#a0a0a0",
    },
  },
}));

function ListItemLink(props) {
  const classes = useStyles();
  return (
    <Link {...props} variant="subtitle2" className={classes.listItemLink} />
  );
}

function NewsNavigation({ categories, active, ...props }) {
  const classes = useStyles(props);

  if (!categories?.length) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Button
              underline="none"
              component={Link}
              href="/jiko-news"
              className={classes.news}
            >
              Jiko News
            </Button>
          </Grid>
          <Hidden mdDown implementation="css">
            <Grid item className={classes.flexDisplay}>
              <List component="nav" className={classes.list}>
                {categories.map(({ slug, name }, index) => (
                  <Fragment key={slug}>
                    <ListItemLink underline="none" href={`/jiko-news/${slug}`}>
                      <ListItemText
                        disableTypography
                        className={clsx(classes.listItemText, {
                          [classes.active]: slug === active,
                        })}
                      >
                        {name}
                      </ListItemText>
                    </ListItemLink>
                    {index + 1 !== categories.length && (
                      <Divider
                        orientation="vertical"
                        flexItem
                        classes={{ root: classes.divider }}
                      />
                    )}
                  </Fragment>
                ))}
              </List>
            </Grid>
          </Hidden>
        </Grid>
      </Section>
    </div>
  );
}

NewsNavigation.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
  active: PropTypes.string,
  social: PropTypes.shape({}),
};

NewsNavigation.defaultProps = {
  active: undefined,
  categories: undefined,
  social: undefined,
};

export default NewsNavigation;

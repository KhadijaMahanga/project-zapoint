import { Divider, List, ListItemText, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Fragment } from "react";

import Link from "@/jikopoint/components/Link";
import LogoButton from "@/jikopoint/components/LogoButton";
import SearchDialog from "@/jikopoint/components/Navigation/SearchDialog";
import Section from "@/jikopoint/components/Section";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {
    backgroundColor: palette.background.default,
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
    color: palette.background.dark,
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
    fontWeight: 500,
    textTransform: "uppercase",
    "&:hover": {
      opacity: 0.6,
    },
  },
  flexDisplay: {
    display: "flex",
  },
}));

function ListItemLink(props) {
  const classes = useStyles();
  return (
    <Link {...props} variant="subtitle2" className={classes.listItemLink} />
  );
}

function DesktopNavigation({ ...props }) {
  const classes = useStyles(props);
  const { menuItems } = props;

  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <LogoButton />
          </Grid>
          <Grid item className={classes.flexDisplay}>
            <List component="nav" className={classes.list}>
              {menuItems.map(({ href, label }, index) => (
                <Fragment key={href}>
                  <ListItemLink underline="none" href={href}>
                    <ListItemText
                      disableTypography
                      className={classes.listItemText}
                    >
                      {label}
                    </ListItemText>
                  </ListItemLink>
                  {index + 1 !== menuItems.length && (
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
        </Grid>
      </Section>
      <SearchDialog {...props} />
    </div>
  );
}

DesktopNavigation.propTypes = {
  handleOpenSearch: PropTypes.func,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
  social: PropTypes.shape({}),
};

DesktopNavigation.defaultProps = {
  handleOpenSearch: undefined,
  menuItems: undefined,
  social: undefined,
};

export default DesktopNavigation;

import {
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItemText,
  Toolbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { Fragment } from "react";

import { ReactComponent as CloseIcon } from "@/jikopoint/assets/icons/icon-close-grey.svg";
import { ReactComponent as MenuIcon } from "@/jikopoint/assets/icons/icon-menu-grey.svg";
import Link from "@/jikopoint/components/Link";
import LogoButton from "@/jikopoint/components/LogoButton";
import TopBanner from "@/jikopoint/components/Navigation/TopBanner";
import Search from "@/jikopoint/components/Search";
import Section from "@/jikopoint/components/Section";

const useStyles = makeStyles(({ palette, typography }) => ({
  icon: {
    width: typography.pxToRem(25),
    height: typography.pxToRem(25),
  },
  dialog: {
    padding: 0,
  },
  dialogActions: {
    padding: 0,
    display: "block",
    backgroundColor: palette.background.default,
  },
  dialogContent: {
    position: "relative",
  },
  dialogPaper: {
    backgroundColor: "inherit",
  },
  social: {
    justifyContent: "center",
    display: "flex",
  },
  search: {
    position: "absolute",
    top: "50%",
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
    fontFamily: typography.h1.fontFamily,
    fontSize: typography.pxToRem(16),
    fontWeight: 400,
    textTransform: "uppercase",
  },
  divider: {
    backgroundColor: "#f1f1f1",
    float: "left",
    height: typography.pxToRem(18),
    margin: `auto ${typography.pxToRem(20)} 0`,
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

function SearchDialog({
  openSearch,
  setOpenSearch,
  handleOpenSearch,
  handleCloseSearch,
  handleOpenMenu,
  menuItems,
  social,
  ...props
}) {
  const classes = useStyles(props);

  return (
    <Dialog
      fullScreen
      open={openSearch}
      onClose={handleCloseSearch}
      classes={{ root: classes.dialog, paper: classes.dialogPaper }}
    >
      <DialogActions disableSpacing className={classes.dialogActions}>
        <TopBanner social={social} />
        <Toolbar disableGutters className={classes.toolbar}>
          <Section classes={{ root: classes.section }}>
            <Hidden lgUp implementation="css">
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <LogoButton />
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="Open drawer"
                    edge="start"
                    onClick={handleOpenMenu}
                    className={classes.menuButton}
                  >
                    <MenuIcon className={classes.icon} />
                  </IconButton>
                  <IconButton
                    aria-label="Open drawer"
                    edge="start"
                    onClick={handleCloseSearch}
                    className={classes.menuButton}
                  >
                    <CloseIcon className={classes.icon} />
                  </IconButton>
                </Grid>
              </Grid>
            </Hidden>
            <Hidden mdDown implementation="css">
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
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
                  <IconButton
                    aria-label="Open drawer"
                    edge="start"
                    onClick={handleCloseSearch}
                    className={classes.menuButton}
                  >
                    <CloseIcon className={classes.icon} />
                  </IconButton>
                </Grid>
              </Grid>
            </Hidden>
          </Section>
        </Toolbar>
      </DialogActions>
      <DialogContent className={classes.dialogContent}>
        <Search classes={{ root: classes.search }} />
      </DialogContent>
    </Dialog>
  );
}

SearchDialog.propTypes = {
  openSearch: PropTypes.bool,
  setOpenSearch: PropTypes.func,
  handleOpenSearch: PropTypes.func,
  handleCloseSearch: PropTypes.func,
  handleOpenMenu: PropTypes.func,
  social: PropTypes.shape({
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    linkedin: PropTypes.string,
    instagram: PropTypes.string,
  }),
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

SearchDialog.defaultProps = {
  menuItems: undefined,
  social: undefined,
  openSearch: undefined,
  setOpenSearch: undefined,
  handleOpenSearch: undefined,
  handleCloseSearch: undefined,
  handleOpenMenu: undefined,
};

export default SearchDialog;

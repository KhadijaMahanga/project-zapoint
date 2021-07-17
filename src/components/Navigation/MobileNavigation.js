
import {  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  List,
  ListItemText,
  Slide,
  Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";

import Link from "@/jikopoint/components/Link";
import LogoButton from "@/jikopoint/components/LogoButton";
import Search from "@/jikopoint/components/Search";
import Section from "@/jikopoint/components/Section";
import TopBanner from "./TopBanner";

import { ReactComponent as CloseIcon } from "@/jikopoint/assets/icons/icon-close-grey.svg";
import { ReactComponent as MenuIcon } from "@/jikopoint/assets/icons/icon-menu-grey.svg";
import { ReactComponent as SearchIcon } from "@/jikopoint/assets/icons/icon-search-grey.svg";
import { ReactComponent as SearchMenuIcon } from "@/jikopoint/assets/icons/icon-close-white.svg";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {
    backgroundColor: palette.background.default,
  },
  section: {},
  menuDialog: {
    padding: 0,
    width: typography.pxToRem(300),
    right: 0,
    margin: "auto 0 auto auto",
  },
  searchDialog: {
    padding: 0,
  },
  dialogActions: {
    padding: `${typography.pxToRem(20)} ${typography.pxToRem(20)} 0`,
    transform: "matrix(-1, 0, 0, -1, 0, 0, )",
  },
  searchDialogActions: {
    padding: 0,
    display: "block",
    backgroundColor: palette.background.default,
  },
  dialogContent: {},
  dialogMenu: {
    padding: `${typography.pxToRem(10.35)} 0`,
  },
  dialogPaper: {
    backgroundColor: palette.secondary.main,
  },
  searchDialogPaper: {
    backgroundColor: "inherit",
  },
  icon: {
    width: typography.pxToRem(25),
    height: typography.pxToRem(25),
  },
  menuButton: {
    color: palette.background.dark,
    padding: 0,
    marginLeft: typography.pxToRem(20),
    "&:hover": {
      background: "none",
    },
  },
  menuItems: {
    padding: `${typography.pxToRem(20)} 0 ${typography.pxToRem(71)}`,
  },
  link: {
    color: "white",
  },
  listItemText: {
    position: "relative", // https://stackoverflow.com/questions/4089379/align-block-elements-on-top-when-using-line-height
    top: "-1rem",
    color: palette.text.secondary,
    fontWeight: 700,
    lineHeight: 2.5,
    marginTop: 0,
  },
  toolbar: {
    display: "block",
  },
}));

function ListItemLink(props) {
  const classes = useStyles();
  return (
    <Link {...props} variant="subtitle2" className={classes.listItemLink} />
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" timeout={1000} ref={ref} {...props} />;
});

function MobileNavigation({ menuItems, social, ...props}) {
  const classes = useStyles(props);

  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const handleOpenMenu = (e) => {
    e?.preventDefault();
    setOpenSearch(false);
    setOpenMenu(true);
  };
  const handleCloseMenu = (e) => {
    e?.preventDefault();
    setOpenMenu(false);
  };

  const handleOpenSearch = (e) => {
    e?.preventDefault();
    setOpenMenu(false);
    setOpenSearch(true);
  };
  const handleCloseSearch = (e) => {
    e?.preventDefault();
    setOpenSearch(false);
  };

  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid container alignItems="center" justify="space-between">
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
              onClick={handleOpenSearch}
              className={classes.menuButton}
            >
              <SearchIcon className={classes.icon}/>
            </IconButton>
          </Grid>
        </Grid>
        <Dialog
          fullScreen
          open={openMenu}
          onClose={handleCloseMenu}
          BackdropProps={{
            classes: {
              root: classes.backdrop,
            },
          }}
          TransitionComponent={Transition}
          classes={{ root: classes.menuDialog, paper: classes.dialogPaper }}
        >
          <DialogActions className={classes.dialogActions}>
            <Grid container alignItems="center" justify="flex-end">
              <Grid item>
                <IconButton
                  aria-label="close drawer"
                  edge="start"
                  onClick={handleCloseMenu}
                  className={classes.menuButton}
                >
                  <SearchMenuIcon className={classes.icon} />
                </IconButton>
              </Grid>
            </Grid>
          </DialogActions>
          <DialogContent className={classes.dialogContent}>
            <Grid container justify="center" alignItems="center">
              <List component="nav" className={classes.list}>
                {menuItems.map(({ href, label }) => (
                  <ListItemLink
                    key={href}
                    underline="none"
                    href={href}
                  >
                    <ListItemText disableTypography className={classes.listItemText}>
                      {label}
                    </ListItemText>
                  </ListItemLink>
                ))}
              </List>
            </Grid>
          </DialogContent>
        </Dialog>
        <Dialog
          fullScreen
          open={openSearch}
          onClose={handleCloseSearch}
          classes={{ root: classes.searchDialog, paper: classes.searchDialogPaper }}
        >
          <DialogActions disableSpacing className={classes.searchDialogActions}>
              <TopBanner social={social} />
              <Toolbar disableGutters className={classes.toolbar}>
              <Section classes={{ root: classes.section }}>
                <Grid container alignItems="center" justify="space-between">
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
              </Section>
              </Toolbar>
          </DialogActions>
          <DialogContent className={classes.dialogContent}>
            <Grid container justify="center" alignItems="center">
              <Search />
            </Grid>
          </DialogContent>
        </Dialog>
      </Section>
    </div>
  );
}

MobileNavigation.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
  social: PropTypes.shape({}),
};

MobileNavigation.defaultProps = {
  menuItems: undefined,
  social: undefined,
};

export default MobileNavigation;
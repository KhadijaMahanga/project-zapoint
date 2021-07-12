import { AppBar, Hidden, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import TopBanner from "./TopBanner";

const useStyles = makeStyles(({ typography, breakpoints, palette }) => ({
  root: {
    backgroundColor: palette.background.default,
    boxShadow: "0px 2px 6px #0000001A",
  },
  toolbar: {
    display: "block",
  },
}));

const menuItems = [
    {   label: "Courses",
        href: "/courses"
    },
    {   label: "Teachers",
        href: "/teachers"
    },
    {   label: "News",
        href: "/news"
    },
    {   label: "About Us",
        href: "/about"
    },
    {   label: "Contact Us",
        href: "/contact"
    }
    
]

function Navigation({ ...props }) {
  const classes = useStyles(props);

  return (
    <AppBar color="primary" position="sticky" className={classes.root}>
      <TopBanner />
      <Toolbar disableGutters className={classes.toolbar}>
        <Hidden mdDown implementation="css">
          <DesktopNavigation
            menuItems={menuItems}
            classes={{ section: classes.section }}
          />
        </Hidden>
        <Hidden lgUp implementation="css">
          <MobileNavigation menuItems={menuItems} classes={{ section: classes.section }} />
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;

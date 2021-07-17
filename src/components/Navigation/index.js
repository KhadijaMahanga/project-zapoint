import { AppBar, Hidden, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

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
    {   label: "Darasa",
        href: "/darasa"
    },
    {   label: "Habari",
        href: "/habari"
    },
    {   label: "Kuhusu Sisi",
        href: "/kuhusu-sisi"
    },
];

const social = {
  facebook: "facebook.com",
  instagram: "instagram.com",
  linkedin: "linkedin.com",
  twitter: "twitter.com",
};

function Navigation({ ...props }) {
  const classes = useStyles(props);

  const [openSearch, setOpenSearch] = useState(false);

  const handleOpenSearch = (e) => {
    e?.preventDefault();
    setOpenSearch(true);
  };
  const handleCloseSearch = (e) => {
    e?.preventDefault();
    setOpenSearch(false);
  };


  return (
    <AppBar color="primary" position="sticky" className={classes.root}>
      <TopBanner social={social} />
      <Toolbar disableGutters className={classes.toolbar}>
        <Hidden mdDown implementation="css">
          <DesktopNavigation
            menuItems={menuItems}
            social={social}
            openSearch={openSearch}
            setOpenSearch={setOpenSearch}
            handleOpenSearch={handleOpenSearch}
            handleCloseSearch={handleCloseSearch}
            classes={{ section: classes.section }}
          />
        </Hidden>
        <Hidden lgUp implementation="css">
          <MobileNavigation 
            menuItems={menuItems}
            social={social}
            openSearch={openSearch}
            setOpenSearch={setOpenSearch}
            handleOpenSearch={handleOpenSearch}
            handleCloseSearch={handleCloseSearch}
            classes={{ section: classes.section }} />
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;

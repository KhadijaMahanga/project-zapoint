import { AppBar, Hidden, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

import DesktopNavigation from "@/jikopoint/components/Navigation/DesktopNavigation";
import MobileNavigation from "@/jikopoint/components/Navigation/MobileNavigation";
import TopBanner from "@/jikopoint/components/Navigation/TopBanner";

const useStyles = makeStyles(({ palette }) => ({
  root: {
    backgroundColor: palette.background.default,
    boxShadow: "0px 2px 6px #0000001A",
  },
  toolbar: {
    display: "block",
    minHeight: "unset",
  },
}));

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
      <TopBanner {...props} />
      <Toolbar disableGutters className={classes.toolbar}>
        <Hidden mdDown implementation="css">
          <DesktopNavigation
            {...props}
            openSearch={openSearch}
            setOpenSearch={setOpenSearch}
            handleOpenSearch={handleOpenSearch}
            handleCloseSearch={handleCloseSearch}
            classes={{ section: classes.section }}
          />
        </Hidden>
        <Hidden lgUp implementation="css">
          <MobileNavigation
            {...props}
            openSearch={openSearch}
            setOpenSearch={setOpenSearch}
            handleOpenSearch={handleOpenSearch}
            handleCloseSearch={handleCloseSearch}
            classes={{ section: classes.section }}
          />
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;

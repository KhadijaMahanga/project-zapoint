import { Tab as MuiTab } from "@material-ui/core";
import React from "react";

import useStyles from "./useStyles";

function Tab(props) {
  const classes = useStyles(props);

  return (
    <MuiTab
      {...props}
      classes={{ root: classes.tab, selected: classes.tabSelected }}
    />
  );
}

export default Tab;

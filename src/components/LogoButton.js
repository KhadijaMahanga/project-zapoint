import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import Link from "@/jikopoint/components/Link";
import { ReactComponent as Logo } from "@/jikopoint/assets/logos/logo-foodlab-grey.svg";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    justifyContent: "flex-start",
    borderRadius: 0,
    backgroundSize: "200% 100%",
    backgroundPosition: "bottom right",
    transition: "background-position .3s ease-out",
    paddingLeft: 0,
    "&:hover": {
      borderRadius: 0,
      backgroundPosition: "bottom left",
      color: palette.primary.main,
    },
  },
  image: {
    width: typography.pxToRem(150),
    [breakpoints.up("sm")]: {
      width: typography.pxToRem(170),
    },
    height: "auto",
  },
}));

function LogoButton() {
  const classes = useStyles();
  return (
    <IconButton
      component={Link}
      href={"/"}
      underline="none"
      className={classes.root}
    >
      <Logo className={classes.image} viewBox="156 0 180 100" />
    </IconButton>
  );
}

export default LogoButton;

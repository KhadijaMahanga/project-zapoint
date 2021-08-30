import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import React from "react";

import logo from "@/jikopoint/assets/logos/jikopoint.png";
import Link from "@/jikopoint/components/Link";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    justifyContent: "flex-start",
    borderRadius: 0,
    backgroundSize: "200% 100%",
    backgroundPosition: "bottom right",
    transition: "background-position .3s ease-out",
    margin: `${typography.pxToRem(10)} 0`,

    "&:hover": {
      borderRadius: 0,
      backgroundPosition: "bottom left",
      color: palette.primary.main,
    },
    width: typography.pxToRem(85),
    height: typography.pxToRem(70),
    [breakpoints.up("lg")]: {
      width: typography.pxToRem(100),
      height: typography.pxToRem(90),
    },
  },
  image: {},
}));

function LogoButton() {
  const classes = useStyles();
  return (
    <IconButton
      component={Link}
      href="/"
      underline="none"
      className={classes.root}
    >
      <Image src={logo} className={classes.image} layout="fill" />
    </IconButton>
  );
}

export default LogoButton;

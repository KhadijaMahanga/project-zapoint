import { Button, Grid, Toolbar, Typography} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import { ReactComponent as IconUser } from "@/jikopoint/assets/icons/icon-user-white.svg";
import { ReactComponent as IconLogin } from "@/jikopoint/assets/icons/icon-login-white.svg";
import Section from "@/jikopoint/components/Section";


const useStyles = makeStyles(({ palette, typography }) => ({
  root: {
    backgroundColor: palette.background.light,
    minHeight: typography.pxToRem(40),
  },
  button: {
    textTransform: "uppercase",
    color: palette.text.secondary,
    fontSize: typography.pxToRem(13),
    fontFamily: typography.fontFamily,
    fontWeight: 400,
    "& :hover": {
      color: palette.text.secondary,
    }
  },
  icon: {
    width: typography.pxToRem(15),
    height: typography.pxToRem(15),
  }
}));

function TopBanner({ menuItems, searchProps, logoProps, ...props }) {
  const classes = useStyles(props);

  return (
    <Toolbar className={classes.root}>
      <Section>
      <Grid container>
        <Grid item md={6}></Grid>
        <Grid item md={6}>
          <Button
            startIcon={<IconUser className={classes.icon} />}
            classes={{ text : classes.button}}
          >
            Login
          </Button>
          <Button
            startIcon={<IconLogin className={classes.icon} />}
            classes={{ text : classes.button}}
          >
            Register
          </Button>
        </Grid>
      </Grid>
      </Section>
    </Toolbar>
  );
}


export default TopBanner;
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    backgroundColor: palette.background.light,
    padding: `${typography.pxToRem(20)} 0`,
    [breakpoints.up("lg")]: {
      padding: `${typography.pxToRem(67)} 0 ${typography.pxToRem(80)}`,
    },
  },
  tabs: {
    marginTop: typography.pxToRem(20),
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(23),
    },
  },
  tabsTabPanel: {
    marginTop: typography.pxToRem(20),
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(23),
    },
  },
}));

export default useStyles;

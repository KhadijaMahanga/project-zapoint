import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette, typography, breakpoints }) => ({
  root: {
    padding: `${typography.pxToRem(40)} 0`,
    [breakpoints.up("md")]: {
      padding: `${typography.pxToRem(80)} 0`,
    },
  },
  metrics: {
    padding: `${typography.pxToRem(10)} 0`,
    [breakpoints.up("md")]: {
      padding: `${typography.pxToRem(30)} 0`,
    },
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(320),
    },
  },
  cardMedia: {
    position: "relative",
    height: typography.pxToRem(215),
    width: typography.pxToRem(350),
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(280),
    },
  },
  title: {
    fontWeight: 400,
    color: palette.secondary.main,
  },
  image: {},
  description: {
    paddingTop: typography.pxToRem(20),
    [breakpoints.up("md")]: {
      width: "auto",
    },
  },
}));

export default useStyles;

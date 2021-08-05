import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette, typography, breakpoints }) => ({
  root: {},
  section: {
    marginTop: typography.pxToRem(20),
    marginBottom: typography.pxToRem(40),
    [breakpoints.up("md")]: {
      marginTop: typography.pxToRem(41),
      marginBottom: typography.pxToRem(40),
    },
  },
  date: {
    marginTop: typography.pxToRem(20),
    marginBottom: typography.pxToRem(20),
  },
  image: {
    position: "relative",
    height: typography.pxToRem(222),
    width: "100%",
    marginBottom: typography.pxToRem(20),
    [breakpoints.up("md")]: {
      height: typography.pxToRem(320),
    },
    [breakpoints.up("lg")]: {
      width: typography.pxToRem(792),
      height: typography.pxToRem(526),
    },
  },
  content: {
    marginTop: typography.pxToRem(20),
  },
  title: {
    fontWeight: 400,
    color: palette.secondary.main,
  },
}));

export default useStyles;

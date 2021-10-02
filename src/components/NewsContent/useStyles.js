import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette, typography, breakpoints }) => ({
  root: {
    "& figure": {
      margin: 0,
    },
  },
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
    fontSize: typography.pxToRem(15),
    fontFamily: typography.h2.fontFamily,
    textTransform: "capitalize",
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
      height: typography.pxToRem(526),
    },
  },
  content: {
    marginTop: typography.pxToRem(20),
    lineHeight: 1.8,
    "& > iframe": {
      width: "100%",
    },
    "& img": {
      width: "100%",
      maxHeight: typography.pxToRem(222),
      [breakpoints.up("md")]: {
        maxHeight: typography.pxToRem(320),
      },
      [breakpoints.up("lg")]: {
        maxHeight: typography.pxToRem(526),
      },
    },
    "& figure": {
      margin: `${typography.pxToRem(12)} 0`,
    },
  },
  description: {
    marginBottom: typography.pxToRem(40),
    paddingBottom: typography.pxToRem(10),
    borderBottom: "1px solid #f1f1f1",
  },
  title: {
    fontWeight: 400,
    color: palette.secondary.main,
  },
}));

export default useStyles;

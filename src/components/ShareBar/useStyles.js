import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  children: {
    display: "inline-flex",
    alignItems: "center",
    marginRight: typography.pxToRem(20),
    fontSize: typography.pxToRem(16),
  },
  tooltip: {
    marginTop: 0,
    backgroundColor: palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    fontSize: 11,
  },
  icon: {
    borderRadius: "50%",
    height: typography.pxToRem(40),
    width: typography.pxToRem(40),
    marginRight: typography.pxToRem(3),
    cursor: "pointer",
    [breakpoints.up("md")]: {
      height: typography.pxToRem(45),
      width: typography.pxToRem(45),
    },
  },
}));

export default useStyles;

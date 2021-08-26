import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {},
  section: {
    color: palette.text.secondary,
    backgroundColor: palette.background.dark,
    borderRadius: typography.pxToRem(5),
    padding: `${typography.pxToRem(56)} 0`,
    paddingLeft: typography.pxToRem(20),
    [breakpoints.up("lg")]: {
      paddingBottom: typography.pxToRem(20),
      paddingTop: typography.pxToRem(25),
      paddingLeft: typography.pxToRem(40),
    },
  },
  title: {
    color: palette.background.default,
    textAlign: "left",
    fontWeight: "bold",
  },
  description: {
    color: palette.background.default,
    padding: `${typography.pxToRem(8)} 0`,
  },
  form: {
    marginTop: "2.5rem",
    [breakpoints.up("lg")]: {
      marginTop: 0,
    },
  },
  inputLabel: {
    fontSize: `${typography.pxToRem(12)} !important`,
  },
  button: {
    minWidth: "max-content",
  },
}));

export default useStyles;

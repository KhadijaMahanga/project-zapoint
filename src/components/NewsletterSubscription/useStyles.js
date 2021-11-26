import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {},
  section: {
    color: palette.text.secondary,
    backgroundColor: palette.background.dark,
    borderRadius: typography.pxToRem(5),
    paddingBottom: typography.pxToRem(56),
    paddingTop: typography.pxToRem(56),
    [breakpoints.up("md")]: {
      padding: typography.pxToRem(40),
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
  formControl: {
    display: "flex",
  },
  inputBase: {
    padding: typography.pxToRem(2),
    borderRadius: typography.pxToRem(4),
    color: palette.text.primary,
    border: "1px solid #dededf",
    height: typography.pxToRem(42),
    backgroundColor: palette.background.default,
    [breakpoints.up("md")]: {
      width: typography.pxToRem(389),
    },
  },
  label: {
    color: palette.text.primary,
    textAlign: "left",
    fontSize: typography.pxToRem(12),
    position: "relative",
    marginBottom: typography.pxToRem(5),
    fontFamily: typography.fontFamily,
    fontWeight: "bold",
    transform: `translate(0, ${typography.pxToRem(0)}) scale(1)`,
    "&$focused": {
      color: palette.background.default,
    },
  },
  focused: {
    color: palette.background.default,
  },
  inputBaseInput: {
    textAlign: "left",
    paddingLeft: typography.pxToRem(16),
    fontSize: typography.pxToRem(12),
    width: "100%",
    "label[data-shrink=false] + .MuiInputBase-formControl &::placeholder": {
      opacity: "0.5!important",
    },
  },
  form: {
    display: "flex",
    alignItems: "flex-end",
  },
  button: {
    minWidth: "max-content",
    height: typography.pxToRem(41),
    color: palette.text.secondary,
    marginLeft: typography.pxToRem(10),
    display: "flex",
  },
  helperText: {
    height: typography.pxToRem(17),
    margin: 0,
  },
}));

export default useStyles;

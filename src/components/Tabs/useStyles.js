import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette, typography, transitions }) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "inherit",
  },
  tabs: {
    backgroundColor: "inherit",
    minHeight: typography.pxToRem(62),
  },
  tabsIndicator: {
    display: "none",
  },
  tab: {
    color: palette.text.primary,
    fontFamily: typography.body1.fontFamily,
    border: 0,
    borderRadius: 0,
    backgroundColor: palette.background.default,
    opacity: 1.0,
    minHeight: typography.pxToRem(40),
    padding: `${typography.pxToRem(10)} ${typography.pxToRem(12)}`,
    transition: transitions.create(["background-color", "border"], {
      duration: transitions.duration.standard,
      easing: transitions.easing.easeOut,
    }),
    "&:hover": {
      color: "#A0A0A0",
    },
    "&:focus": {
      color: "#A0A0A0",
    },
  },
  tabSelected: {
    color: "#A0A0A0",
    borderBottom: `2px solid ${palette.primary.main}`,
  },
  tabPanel: (props) => ({
    opacity: props.index === props.value ? 1 : 0,
    transition: transitions.create(["opacity"], {
      duration: transitions.duration.standard,
      easing: transitions.easing.easeOut,
    }),
  }),
  divider: {
    marginTop: typography.pxToRem(-14),
    height: typography.pxToRem(2),
    backgroundColor: "rgb(241, 241, 241)",
  },
}));

export default useStyles;

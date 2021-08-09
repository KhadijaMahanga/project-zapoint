import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette, typography, transitions }) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "inherit",
  },
  tabs: {
    backgroundColor: "inherit",
    borderBottom: "1px solid #044E3D80",
    minHeight: typography.pxToRem(62),
  },
  tabsIndicator: {
    display: "none",
  },
  tab: {
    backgroundColor: palette.primary.main,
    color: palette.text.secondary,
    border: `1px solid ${palette.primary.main}`,
    borderRadius: 4,
    marginRight: typography.pxToRem(20),
    opacity: 1.0,
    minHeight: typography.pxToRem(40),
    padding: `${typography.pxToRem(10)} ${typography.pxToRem(24)}`,
    transition: transitions.create(["background-color", "border"], {
      duration: transitions.duration.standard,
      easing: transitions.easing.easeOut,
    }),
    "&:hover": {
      color: "#A0A0A0",
      border: "1px solid #A0A0A0",
      backgroundColor: palette.divider,
    },
    "&:focus": {
      color: "#A0A0A0",
      border: "1px solid #A0A0A0",
      backgroundColor: palette.divider,
    },
  },
  tabSelected: {
    color: "#A0A0A0",
    border: "1px solid #A0A0A0",
    backgroundColor: palette.divider,
  },
  tabPanel: (props) => ({
    opacity: props.index === props.value ? 1 : 0,
    transition: transitions.create(["opacity"], {
      duration: transitions.duration.standard,
      easing: transitions.easing.easeOut,
    }),
  }),
}));

export default useStyles;

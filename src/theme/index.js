import { createMuiTheme } from "@material-ui/core/styles";
import { deepmerge } from "@material-ui/utils";

const FONT_FAMILY_HEADING = "'Montserrat', sans-serif";
const FONT_FAMILY_TEXT = "'Varela Round', sans-serif";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#0050FF" },
    secondary: { main: "#68B78C" },
    highlight: { main: "#a3a3a3" },
    text: { primary: "#727475", secondary: "#fff", highlight: "#a3a3a3" },
    background: {
      default: "#fff",
      light: "#ceb28d",
      dark: "#444444",
    },
    divider: "#b59974",
    info: {
      main: "#f6fbfa", // ice-blue
      other: "#9b9b9b",
    },
    data: {
      main: "#4a4a4a",
      light: "#F5F5F5", // #4a4a4a opacity 0.05
    },
  },
  typography: {
    fontFamily: FONT_FAMILY_TEXT,
    h1: {
      fontFamily: FONT_FAMILY_HEADING,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: 0,
    },
    h2: {
      fontFamily: FONT_FAMILY_HEADING,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: 0,
    },
    h3: {
      fontFamily: FONT_FAMILY_HEADING,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: 0,
    },
    h4: {
      fontFamily: FONT_FAMILY_HEADING,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: 0,
      textTransform: "uppercase",
    },
    h5: {
      fontFamily: FONT_FAMILY_TEXT,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: 0,
    },
    h6: {
      fontFamily: FONT_FAMILY_TEXT,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: 400,
      letterSpacing: 0,
    },
    subtitle1: {
      fontFamily: FONT_FAMILY_TEXT,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: 400,
      letterSpacing: 0,
    },
    subtitle2: {
      fontFamily: FONT_FAMILY_TEXT,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: 0,
    },
    body1: {
      fontFamily: FONT_FAMILY_TEXT,
      fontStretch: "normal",
      fontStyle: "normal",
      letterSpacing: 0,
      fontWeight: 400,
    },
    body2: {
      fontFamily: FONT_FAMILY_TEXT,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: 400,
      letterSpacing: 0,
    },
    button: {
      fontFamily: FONT_FAMILY_HEADING,
      fontStretch: "normal",
      fontStyle: "normal",
      fontWeight: 700,
      letterSpacing: 0,
    },
    caption: {
      fontFamily: FONT_FAMILY_TEXT,
      fontStretch: "normal",
      color: "#a3a3a3",
      fontStyle: "normal",
      letterSpacing: 0,
    },
    overline: {
      fontFamily: FONT_FAMILY_TEXT,
      fontStretch: "normal",
      fontStyle: "normal",
      letterSpacing: 0,
      textTransform: "none",
    },
  },
  widths: {
    values: {
      md: 912, // 0, 24, 0, 24 margins
      lg: 1200, // 0, 40, 0, 40 margins
    },
  },
});

// ## RESPONSIVE FONTS
const { breakpoints, typography } = theme;
const { pxToRem } = typography;
deepmerge(
  typography,
  {
    h1: {
      fontSize: pxToRem(40),
      lineHeight: 40 / 40,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(70),
        lineHeight: 70 / 70,
      },
    },
    h2: {
      fontSize: pxToRem(35),
      lineHeight: 40 / 35,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(40),
        lineHeight: 45 / 40,
      },
    },
    h3: {
      fontSize: pxToRem(30),
      lineHeight: 40 / 30,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(40),
        lineHeight: 40 / 40,
      },
      [breakpoints.up("xl")]: {
        fontSize: pxToRem(50),
        lineHeight: 60 / 50,
      },
    },
    h4: {
      fontSize: pxToRem(20),
      lineHeight: 29 / 20,
      letterSpacing: pxToRem(2),
      [breakpoints.up("xl")]: {
        fontSize: pxToRem(30),
        lineHeight: 38 / 30,
        letterSpacing: pxToRem(3),
      },
    },
    h5: {
      fontSize: pxToRem(18),
      lineHeight: 20 / 18,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(16),
        lineHeight: 20 / 16,
      },
      [breakpoints.up("xl")]: {
        fontSize: pxToRem(20),
        lineHeight: 30 / 20,
      },
    },
    h6: {
      fontSize: pxToRem(12),
      lineHeight: 20 / 12,
      [breakpoints.up("xl")]: {
        fontSize: pxToRem(16),
        lineHeight: 24 / 16,
      },
    },
    subtitle1: {
      fontSize: pxToRem(20),
      lineHeight: 30 / 20,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(20),
        lineHeight: 30 / 20,
      },
      [breakpoints.up("xl")]: {
        fontSize: pxToRem(30),
        lineHeight: 40 / 30,
      },
    },
    subtitle2: {
      fontSize: pxToRem(16),
      lineHeight: 23 / 16,
      [breakpoints.up("md")]: {
        fontSize: pxToRem(14),
        lineHeight: 20 / 14,
      },
      [breakpoints.up("xl")]: {
        fontSize: pxToRem(24),
        lineHeight: 30 / 24,
      },
    },
    body1: {
      fontSize: pxToRem(20),
      lineHeight: 30 / 20,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(20),
        lineHeight: 30 / 20,
      },
    },
    body2: {
      fontSize: pxToRem(18),
      lineHeight: 24 / 18,
      [breakpoints.up("md")]: {
        fontSize: pxToRem(14),
        lineHeight: 20 / 14,
      },
      [breakpoints.up("xl")]: {
        fontSize: pxToRem(24),
        lineHeight: 30 / 24,
      },
    },
    button: {
      fontSize: pxToRem(16),
      lineHeight: 27 / 16,
      letterSpacing: pxToRem(1.6),
      [breakpoints.up("xl")]: {
        fontSize: pxToRem(24),
        lineHeight: 40 / 24,
        letterSpacing: pxToRem(3),
      },
    },
    caption: {
      fontSize: pxToRem(14),
      lineHeight: 20 / 14,
    },
  },
  { clone: false }
);

export default theme;

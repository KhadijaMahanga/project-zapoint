import { createTheme } from "@material-ui/core/styles";
import { deepmerge } from "@material-ui/utils";

const FONT_FAMILY_HEADING = "'Montserrat', sans-serif";
const FONT_FAMILY_TEXT = "'Varela Round', sans-serif";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 390, // mobile
      md: 768, // tablet
      lg: 1280, // desktop
    },
  },
  palette: {
    primary: { main: "#41aa54" },
    secondary: { main: "#41aa54" },
    highlight: { main: "#a3a3a3" },
    text: { primary: "#414142", secondary: "#fff", highlight: "#a3a3a3" },
    background: {
      default: "#fff",
      light: "#ceb28d",
      dark: "#414142",
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
      fontWeight: 400,
      letterSpacing: 0,
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
      color: "red",
      letterSpacing: 0,
      textTransform: "none",
    },
  },
  widths: {
    values: {
      md: 608, // 0, 24, 0, 24 margins
      lg: 1200, // 0, 40, 0, 40 margins
    },
  },
  props: {
    MuiButtonBase: {
      // Disable ripple effect globally
      disableRipple: true,
      disableTouchRipple: true,
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
        fontSize: pxToRem(50),
        lineHeight: 50 / 50,
      },
    },
    h3: {
      fontSize: pxToRem(35),
      lineHeight: 40 / 35,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(40),
        lineHeight: 45 / 40,
      },
    },
    h4: {
      fontSize: pxToRem(25),
      lineHeight: 35 / 25,
    },
    h5: {
      fontSize: pxToRem(15),
      lineHeight: 15 / 15,
    },
    h6: {
      fontSize: pxToRem(16),
      lineHeight: 20 / 16,
      [breakpoints.up("lg")]: {
        fontSize: pxToRem(20),
        lineHeight: 30 / 20,
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

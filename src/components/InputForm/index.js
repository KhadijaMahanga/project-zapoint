import {
  InputBase,
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles(({ palette, typography, breakpoints }) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 0,
    [breakpoints.up("md")]: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  },
  formControl: {
    paddingTop: typography.pxToRem(40),
    paddingBottom: typography.pxToRem(16),
    [breakpoints.up("md")]: {
      padding: `${typography.pxToRem(40)} 0`,
    },
  },
  inputBase: {
    padding: typography.pxToRem(2),
    borderRadius: typography.pxToRem(4),
    color: palette.text.primary,
    border: "1px solid #dededf",
    height: typography.pxToRem(42),
    width: typography.pxToRem(300),
    backgroundColor: palette.background.default,
    [breakpoints.up("md")]: {
      width: typography.pxToRem(389),
    },
  },
  label: (props) => ({
    color: props?.color || palette.text.primary,
    textAlign: "left",
    fontSize: typography.pxToRem(18),
    position: "relative",
    marginBottom: typography.pxToRem(10),
    fontFamily: typography.fontFamily,
    fontWeight: "bold",
    transform: `translate(0, ${typography.pxToRem(0)}) scale(1)`,
    "&$focused": {
      color: props?.color || palette.background.default,
    },
  }),
  // TODO nyokabi Reference => https://github.com/mui-org/material-ui/issues/11244
  focused: (props) => ({
    color: props?.color || palette.background.default,
  }),
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
    flexDirection: "column",
    justifyContent: "flex-end",
    height: 0,
    paddingTop: typography.pxToRem(80),
    [breakpoints.up("md")]: {
      paddingTop: typography.pxToRem(130),
    },
  },
  button: {
    height: typography.pxToRem(41),
    color: palette.text.secondary,
    marginLeft: 0,
    [breakpoints.up("md")]: {
      padding: `${typography.pxToRem(12)} ${typography.pxToRem(24)}`,
      margin: `${typography.pxToRem(56)} ${typography.pxToRem(
        16
      )} ${typography.pxToRem(48)} ${typography.pxToRem(16)}`,
    },
  },
  helperText: {
    position: "absolute",
    bottom: "-2.1rem",
    right: 0,
    [breakpoints.up("md")]: {
      bottom: 0,
      right: "unset",
    },
  },
}));

function InputForm({
  inputLabelId,
  label,
  buttonLabel,
  placeholder,
  query,
  size,
  href,
  onClick,
  helperText,
  ...props
}) {
  const classes = useStyles(props);
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleClick = (event) => {
    event.preventDefault();
    if (onClick) {
      onClick(value);
    }
  };
  useEffect(() => {
    setValue(query);
  }, [query]);

  return (
    <div className={classes.root}>
      <form
        onSubmit={handleClick}
        className={classes.form}
        noValidate
        autoComplete="off"
      >
        <FormControl classes={{ root: classes.formControl }}>
          <InputLabel
            shrink={false}
            htmlFor={inputLabelId}
            classes={{
              root: classes.label,
              focused: classes.focused,
            }}
          >
            {label}
          </InputLabel>
          <InputBase
            id={inputLabelId}
            inputProps={{ "aria-label": inputLabelId }}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            {...props}
            classes={{
              root: classes.inputBase,
              input: classes.inputBaseInput,
            }}
          />

          {helperText && (
            <FormHelperText
              className={classes.helperText}
              {...helperText}
              id="helper-text"
            />
          )}
        </FormControl>
      </form>
      <Button
        className={classes.button}
        variant="contained"
        size={size}
        color="secondary"
        href={href}
        onClick={handleClick}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}

InputForm.propTypes = {
  label: PropTypes.string,
  inputLabelId: PropTypes.string,
  buttonLabel: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  helperText: PropTypes.string,
  color: PropTypes.string,
  query: PropTypes.string,
};

InputForm.defaultProps = {
  label: undefined,
  inputLabelId: undefined,
  buttonLabel: undefined,
  placeholder: undefined,
  size: undefined,
  href: undefined,
  onClick: undefined,
  helperText: undefined,
  color: undefined,
  query: undefined,
};

export default InputForm;

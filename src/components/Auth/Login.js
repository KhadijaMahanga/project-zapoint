import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useState } from "react";

import Link from "@/jikopoint/components/Link";

const useStyles = makeStyles(({ palette, typography }) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: typography.pxToRem(1),
    color: palette.text.primary,
  },
  submit: {
    margin: typography.pxToRem(3, 0, 2),
    color: palette.text.secondary,
  },
  checkbox: {
    color: palette.text.primary,
  },
  label: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(16),
  },
  icon: {
    width: typography.pxToRem(25),
    height: typography.pxToRem(25),
  },
}));

function Login({ signIn, csrfToken }) {
  const classes = useStyles();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loginError, setLoginError] = useState("");

  const validate = (value, fieldName) => {
    setEmailError("");
    setPasswordError("");
    if (!value.length && fieldName === "email") {
      setEmailError("Barua pepe inahitajika");
    }
    if (!value.length && fieldName === "password") {
      setPasswordError("Nywila inahitajika");
    }
    if (fieldName === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      setEmailError("Barua pepe ni batili");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!emailError.length && !passwordError.length && email && password) {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setLoginError(res.error);
      }
      if (res.url) {
        router.push(res.url);
      }
    }
  };

  return (
    <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
      {loginError.length > 0 && (
        <Typography variant="overline"> {loginError}</Typography>
      )}
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Barua pepe"
        name="email"
        autoComplete="email"
        InputLabelProps={{ classes: { root: classes.label } }}
        autoFocus
        error={emailError.length > 0}
        helperText={emailError.length > 0 ? emailError : null}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => validate(email, "email")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Nywila"
        type="password"
        id="password"
        autoComplete="current-password"
        InputLabelProps={{ classes: { root: classes.label } }}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={() => validate(password, "password")}
      />
      <FormControlLabel
        control={
          <Checkbox
            value="remember"
            color="primary"
            classes={{ root: classes.checkbox }}
          />
        }
        classes={{ root: classes.label }}
        label="Remember me"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Link href="/auth/sahau-nywila" variant="body2">
            Je, umesahau nywila?
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <Link href="/auth/jiunge" variant="body2">
            Huna akaunti? Jiunge
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}

Login.propTypes = {
  signIn: PropTypes.func,
  csrfToken: PropTypes.string,
};

Login.defaultProps = {
  signIn: undefined,
  csrfToken: undefined,
};

export default Login;

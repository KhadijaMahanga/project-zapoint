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

function Register() {
  const classes = useStyles();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [registerError, setRegisterError] = useState("");

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
      const credentials = {
        email,
        password,
        firstName,
        lastName,
      };
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users/`, {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify(credentials),
      });

      if (res?.error) {
        setRegisterError(res.error);
      }
      if (res.url) {
        router.push(res.url);
      }
    }
  };

  return (
    <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
      {registerError.length > 0 && (
        <Typography variant="overline"> {registerError}</Typography>
      )}
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="fname"
            name="firstName"
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label="Jina la kwanza"
            autoFocus
            InputLabelProps={{ classes: { root: classes.label } }}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="lastName"
            label="Jina la mwisho"
            name="lastName"
            autoComplete="lname"
            InputLabelProps={{ classes: { root: classes.label } }}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Jiunge
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/auth/ingia" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}

export default Register;

import {
  Grid,
  Typography,
  InputBase,
  FormControl,
  InputLabel,
  FormHelperText,
  Button,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

import useStyles from "./useStyles";

import Section from "@/jikopoint/components/Section";

function CustomForm({ status, onValidated, ...props }) {
  const classes = useStyles(props);
  const [email, setEmail] = useState("");
  const [helperText, setHelperText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setHelperText("Barua pepe ni batili");
    } else {
      onValidated({
        MERGE0: email,
      });
    }
  };
  useEffect(() => {
    if (status === "success") {
      setHelperText("Ahsante, usajili umekamilika ");
    } else if (status === "sending") {
      setHelperText("Ahsante, tunashughulikia usajili wako... ");
    } else if (status === "error") {
      setHelperText("Tafadhali jaribu tena baadae");
    }
  }, [status]);

  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={12} lg={4}>
            <Typography variant="h4" className={classes.title}>
              Jiunge kwa jarida
            </Typography>
            <Typography variant="subtitle2" className={classes.description}>
              Jiunge nasi upate jarida mbalimbali kuhusu mapishi na nishati safi
              za kupikia
            </Typography>
          </Grid>
          <Grid item xs={12} lg={8} container justifyContent="flex-end">
            <form
              onSubmit={(e) => handleSubmit(e)}
              noValidate
              autoComplete="off"
              className={classes.form}
            >
              <FormControl classes={{ root: classes.formControl }}>
                <InputLabel
                  shrink={false}
                  htmlFor="subscription-form"
                  classes={{
                    root: classes.label,
                    focused: classes.focused,
                  }}
                >
                  Barua pepe
                </InputLabel>
                <InputBase
                  inputProps={{ "aria-label": "subscription" }}
                  placeholder="Barua pepe"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setHelperText("");
                  }}
                  {...props}
                  classes={{
                    root: classes.inputBase,
                    input: classes.inputBaseInput,
                  }}
                />
                <FormHelperText id="helper-text" className={classes.helperText}>
                  {helperText}
                </FormHelperText>
              </FormControl>
              <Button
                className={classes.button}
                variant="contained"
                size="medium"
                color="secondary"
                type="submit"
                onClick={handleSubmit}
              >
                Jiunge
              </Button>
            </form>
          </Grid>
        </Grid>
      </Section>
    </div>
  );
}

CustomForm.propTypes = {
  status: PropTypes.string,
  onValidated: PropTypes.func,
};

CustomForm.defaultProps = {
  status: undefined,
  onValidated: undefined,
};

export default CustomForm;

import {
  Grid,
  Typography,
  InputBase,
  FormControl,
  InputLabel,
  Button,
  LinearProgress,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";

import useStyles from "./useStyles";

import JikoSnackbar from "@/jikopoint/components/JikoSnackbar";
import Section from "@/jikopoint/components/Section";

function CustomForm({ status, onValidated, message, ...props }) {
  const classes = useStyles(props);
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onValidated({
      MERGE0: email,
    });
  };

  useEffect(() => {
    if (status && status !== "sending") {
      setOpen(true);
    }
  }, [status]);

  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={12} lg={4}>
            <Typography variant="h4" className={classes.title}>
              Jiunge kwa jarida
            </Typography>
            <Typography variant="subtitle2" className={classes.description}>
              Jiunge nasi upate jarida mbalimbali kuhusu mapishi na nishati safi
              za kupikia
            </Typography>
          </Grid>
          <Grid item>
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
                  }}
                  {...props}
                  classes={{
                    root: classes.inputBase,
                    input: classes.inputBaseInput,
                  }}
                />
                {status === "sending" ? <LinearProgress /> : null}
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
      {status !== "sending" && (
        <JikoSnackbar
          open={open}
          onClose={handleCloseSnack}
          status={status}
          message={message}
        />
      )}
    </div>
  );
}

CustomForm.propTypes = {
  message: PropTypes.string,
  status: PropTypes.string,
  onValidated: PropTypes.func,
};

CustomForm.defaultProps = {
  message: undefined,
  status: undefined,
  onValidated: undefined,
};

export default CustomForm;

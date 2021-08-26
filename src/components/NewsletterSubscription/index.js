import { Grid, Hidden, Typography } from "@material-ui/core";
import React from "react";

import useStyles from "./useStyles";

import InputForm from "@/jikopoint/components/InputForm";
import Section from "@/jikopoint/components/Section";

function NewsletterSubscription(props) {
  const classes = useStyles(props);

  const handleClick = () => {};

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
          <Hidden mdDown>
            <Grid item lg={2} />
          </Hidden>
          <Grid item xs={12} md={12} lg={5}>
            <InputForm
              classes={{
                root: classes.form,
                button: classes.button,
                label: classes.inputLabel,
              }}
              label="Barua Pepe"
              buttonLabel="JIUNGE"
              placeholder="Barua Pepe"
              variant="contained"
              size="medium"
              onClick={handleClick}
              {...props}
            />
          </Grid>
        </Grid>
      </Section>
    </div>
  );
}

export default NewsletterSubscription;

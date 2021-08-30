import { Grid, Box } from "@material-ui/core";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import RichTypography from "@/jikopoint/components/RichTypography";

function Metrics({ items, title, ...props }) {
  const classes = useStyles(props);
  if (!items?.length) {
    return null;
  }
  return (
    <>
      <RichTypography variant="h2" className={classes.title}>
        {title}
      </RichTypography>
      {items?.map((item, index) => (
        <Grid
          key={item.title}
          container
          direction={index % 2 === 0 ? "row" : "row-reverse"}
          justifyContent="space-between"
          alignItems="flex-start"
          className={classes.metrics}
        >
          <Grid item xs={12} md={5} lg={3}>
            <Box container display="flex" alignItems="center">
              <RichTypography variant="h4">{item.title}</RichTypography>
            </Box>
            <RichTypography variant="body2" className={classes.description}>
              {item.description}
            </RichTypography>
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
            lg={8}
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <div className={classes.cardMedia}>
              <Image src={item.image} layout="fill" alt="mkufunzi" />
            </div>
          </Grid>
        </Grid>
      ))}
    </>
  );
}

Metrics.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
    })
  ),
};

Metrics.defaultProps = {
  title: undefined,
  items: undefined,
};

export default Metrics;

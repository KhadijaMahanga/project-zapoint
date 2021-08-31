/* eslint-disable no-underscore-dangle */
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import { ReactComponent as IconClock } from "@/jikopoint/assets/icons/icon-clock.svg";
import Link from "@/jikopoint/components/Link";

moment.locale("sw");
const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    borderRadius: 0,
    boxShadow: "none",
    width: "100%",
    border: "1px solid #f1f1f1",
    height: typography.pxToRem(470),
    marginBottom: typography.pxToRem(20),
    [breakpoints.up("lg")]: {
      maxWidth: typography.pxToRem(388),
      marginBottom: 0,
    },
  },
  title: {
    color: palette.text.primary,
    height: typography.pxToRem(70),
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
  },
  image: {
    width: "100%",
    position: "relative",
    height: typography.pxToRem(222),
  },
  cardContentRoot: {
    padding: typography.pxToRem(20),
  },
  cardActionAreaFocusHighlight: {
    backgroundColor: "inherit",
  },
  footer: {},
  name: {},
  duration: {},
}));

function CourseCard({ owner, duration, image, name, _id: slug, ...props }) {
  const classes = useStyles(props);
  const Component = slug?.length ? Link : undefined;

  if (!(name || image || slug)) {
    return null;
  }
  return (
    <Card className={classes.root}>
      <CardActionArea
        component={Component}
        href={`/kozi/${slug}`}
        classes={{ focusHighlight: classes.cardActionAreaFocusHighlight }}
        underline="none"
      >
        <div className={classes.image}>
          {image && <Image src={image} alt={name} layout="fill" />}
        </div>
        <CardContent classes={{ root: classes.cardContentRoot }}>
          <Typography variant="h4" className={classes.title}>
            {name}
          </Typography>
        </CardContent>
        <div className={classes.footer}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography className={classes.name}>{owner?.name}</Typography>
            </Grid>
            <Grid item container>
              <Grid item xs={3}>
                <IconClock className={classes.icon} />
              </Grid>
              <Grid item xs={9}>
                <Typography className={classes.duration}>{`dakika ${
                  moment.duration(duration).asMinutes
                }`}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </CardActionArea>
    </Card>
  );
}

CourseCard.propTypes = {
  _id: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  duration: PropTypes.number,
  owner: PropTypes.shape({
    name: PropTypes.string,
  }),
};

CourseCard.defaultProps = {
  _id: undefined,
  image: undefined,
  owner: undefined,
  name: undefined,
  duration: undefined,
};

export default CourseCard;

import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as moment from "moment";
import "moment/locale/sw";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import { ReactComponent as IconClock } from "@/jikopoint/assets/icons/icon-clock-grey.svg";
import Link from "@/jikopoint/components/Link";

moment.locale("sw");

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    borderRadius: 0,
    boxShadow: "none",
    width: "100%",
    border: "1px solid #f1f1f1",
    marginBottom: typography.pxToRem(20),
    [breakpoints.up("lg")]: {
      maxWidth: typography.pxToRem(388),
      marginBottom: 0,
    },
  },
  title: {
    color: palette.text.primary,
    height: typography.pxToRem(60),
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
  },
  image: {
    width: "100%",
    position: "relative",
    height: typography.pxToRem(220),
  },
  cardContentRoot: {
    padding: typography.pxToRem(10),
  },
  cardActionAreaFocusHighlight: {
    backgroundColor: "inherit",
  },
  icon: {
    width: typography.pxToRem(15),
    height: typography.pxToRem(15),
  },
  footer: {
    padding: typography.pxToRem(10),
    background: "#f9f9f9",
    color: palette.text.primary,
  },
  name: {
    textTransform: "Capitalize",
    fontSize: typography.pxToRem(14),
  },
  duration: {
    fontSize: typography.pxToRem(14),
    marginLeft: typography.pxToRem(10),
  },
}));

function CourseCard({
  instructor,
  duration,
  image,
  name,
  slug,
  trainer,
  ...props
}) {
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
          {image && image !== "null" && (
            <Image src={image} alt={name} layout="fill" />
          )}
        </div>
        <CardContent classes={{ root: classes.cardContentRoot }}>
          <Typography className={classes.title}>{name}</Typography>
        </CardContent>
        {!trainer && (
          <div className={classes.footer}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={6}>
                <Typography
                  className={classes.name}
                >{`Na ${instructor?.name}`}</Typography>
              </Grid>
              <Grid
                item
                xs={6}
                container
                alignItems="center"
                justifyContent="flex-end"
              >
                <Grid item>
                  <IconClock className={classes.icon} />
                </Grid>
                <Grid item>
                  <Typography className={classes.duration}>
                    dakika {Math.ceil(moment.duration(duration).asMinutes())}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </div>
        )}
      </CardActionArea>
    </Card>
  );
}

CourseCard.propTypes = {
  slug: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  duration: PropTypes.number,
  trainer: PropTypes.bool,
  instructor: PropTypes.shape({
    name: PropTypes.string,
  }),
};

CourseCard.defaultProps = {
  slug: undefined,
  image: undefined,
  instructor: undefined,
  name: undefined,
  duration: undefined,
  trainer: false,
};

export default CourseCard;

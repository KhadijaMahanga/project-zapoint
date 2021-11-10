import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import { ReactComponent as RegisterIcon } from "@/jikopoint/assets/icons/icon-register.svg";
import Link from "@/jikopoint/components/Link";

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
    width: typography.pxToRem(25),
    height: typography.pxToRem(25),
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
  trainee,
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
        href={`/jiko-class/kozi/${slug}`}
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
              {!trainee && (
                <Grid
                  item
                  xs={6}
                  container
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Grid item>
                    <Tooltip title="Jiandikishe">
                      <IconButton
                        aria-label="Open drawer"
                        edge="start"
                        // onClick={handleOpenMenu}
                        className={classes.menuButton}
                      >
                        <RegisterIcon className={classes.icon} />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </Grid>
              )}
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
  trainee: PropTypes.bool,
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
  trainee: false,
};

export default CourseCard;

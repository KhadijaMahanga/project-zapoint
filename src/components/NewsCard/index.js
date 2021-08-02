import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import Link from "@/jikopoint/components/Link";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    borderRadius: 0,
    boxShadow: "none",
    width: "100%",
    [breakpoints.up("md")]: {
      maxWidth: typography.pxToRem(320),
    },
    [breakpoints.up("lg")]: {
      maxWidth: typography.pxToRem(388),
    },
  },
  date: {
    color: palette.primary.main,
    marginTop: typography.pxToRem(20),
  },
  title: {
    textDecoration: "underline",
    color: palette.text.primary,
    fontSize: typography.pxToRem(18),
    height: typography.pxToRem(61),
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
  },
  image: {
    width: "100%",
    position: "relative",
    height: typography.pxToRem(231),
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(280),
    },
  },
  cardContentRoot: {
    padding: 0,
    marginTop: typography.pxToRem(20),
  },
  cardActionAreaFocusHighlight: {
    backgroundColor: "inherit",
  },
}));

function NewsCard({
  date,
  image,
  title,
  category,
  slug,
  description,
  ...props
}) {
  const classes = useStyles(props);
  const Component = slug?.length ? Link : undefined;

  if (!(title || image || slug)) {
    return null;
  }
  return (
    <Card className={classes.root}>
      <CardActionArea
        component={Component}
        href={`/habari/${category}/${slug}`}
        classes={{ focusHighlight: classes.cardActionAreaFocusHighlight }}
      >
        <div className={classes.image}>
          <Image src={image} alt={title} layout="fill" />
          <Typography>{category}</Typography>
        </div>
        <CardContent classes={{ root: classes.cardContentRoot }}>
          {date && (
            <Typography variant="body2" className={classes.date}>
              {date}
            </Typography>
          )}
          <Typography className={classes.title}>{title}</Typography>
          <Typography className={classes.title}>{description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

NewsCard.propTypes = {
  date: PropTypes.string,
  description: PropTypes.string,
  slug: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
};

NewsCard.defaultProps = {
  date: undefined,
  description: undefined,
  slug: undefined,
  image: undefined,
  title: undefined,
  category: undefined,
};

export default NewsCard;

import {
  Button,
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
    border: "1px solid #f1f1f1",
    height: typography.pxToRem(470),
    marginBottom: typography.pxToRem(20),
    [breakpoints.up("lg")]: {
      maxWidth: typography.pxToRem(388),
      marginBottom: 0,
    },
  },
  date: {
    color: palette.text.higlight,
    margin: `${typography.pxToRem(10)} 0`,
    fontSize: typography.pxToRem(15),
    lineHeight: 15 / 15,
  },
  title: {
    color: palette.text.primary,
    height: typography.pxToRem(70),
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
  },
  description: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(18),
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    marginTop: typography.pxToRem(20),
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
  category: {
    color: palette.text.secondary,
    backgroundColor: palette.secondary.main,
    position: "absolute",
    top: typography.pxToRem(20),
    right: typography.pxToRem(20),
    padding: typography.pxToRem(8),
    fontSize: typography.pxToRem(13),
    fontWeight: "normal",
    "&:hover": {
      color: palette.text.secondary,
      backgroundColor: "#a0a0a0",
    },
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

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  if (!(title || image || slug)) {
    return null;
  }
  return (
    <Card className={classes.root}>
      <CardActionArea
        component={Component}
        href={`/habari/${category?.slug}/${slug}`}
        classes={{ focusHighlight: classes.cardActionAreaFocusHighlight }}
        underline="none"
      >
        <div className={classes.image}>
          <Image src={image?.url} alt={title} layout="fill" />
          <Button
            underline="none"
            component={Link}
            href={`/habari/${category?.slug}`}
            className={classes.category}
          >
            {category?.name}
          </Button>
        </div>
        <CardContent classes={{ root: classes.cardContentRoot }}>
          {date && (
            <Typography variant="body2" className={classes.date}>
              {new Date(date).toLocaleString("default", options)}
            </Typography>
          )}
          <Typography variant="h4" className={classes.title}>
            {title}
          </Typography>
          <Typography className={classes.description}>{description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

NewsCard.propTypes = {
  date: PropTypes.string,
  description: PropTypes.string,
  slug: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string,
  }),
  title: PropTypes.string,
  category: PropTypes.shape({
    slug: PropTypes.string,
    name: PropTypes.string,
  }),
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

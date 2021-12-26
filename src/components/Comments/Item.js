import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import DefaultProfilePic from "@/jikopoint/components/DefaultProfilePic";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {
    margin: `${typography.pxToRem(20)} 0`,
  },
  profileImage: {
    width: typography.pxToRem(40),
    height: typography.pxToRem(40),
    position: "relative",
    borderRadius: "100%",
    color: palette.background.light,
    fontSize: typography.pxToRem(16),
  },
  icon: {
    width: typography.pxToRem(25),
    height: typography.pxToRem(25),
  },
  text: {
    fontSize: typography.pxToRem(14),
    margin: `${typography.pxToRem(10)} 0`,
  },
  header: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(14),
    fontWeight: "bold",
  },
}));

function Item({ comment, ...props }) {
  const classes = useStyles(props);

  const imageDomains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS.split(", ");
  const xImg = imageDomains.find((d) => comment?.commentor?.image?.includes(d));

  return (
    <div className={classes.root}>
      <Grid item container alignItems="center">
        <Grid item xs={1}>
          <div className={classes.profileImage}>
            {comment?.commentor?.image && xImg ? (
              <Image
                src={comment?.commentor.image}
                layout="fill"
                className={classes.image}
              />
            ) : (
              <DefaultProfilePic
                letter={
                  comment?.commentor.name[0] || comment?.commentor.email[0]
                }
              />
            )}
          </div>
        </Grid>
        <Grid item container xs={9}>
          <Grid item xs={12}>
            <Typography className={classes.header}>
              {comment?.commentor?.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.text}>{comment.text}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

Item.propTypes = {
  comment: PropTypes.shape({
    commentor: PropTypes.shape({
      email: PropTypes.string,
      image: PropTypes.string,
      name: PropTypes.string,
    }),
    text: PropTypes.string,
  }),
  user: PropTypes.string,
};

Item.defaultProps = {
  comment: undefined,
  user: undefined,
};

export default Item;

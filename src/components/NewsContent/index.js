import { Typography, Grid } from "@material-ui/core";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import RichTypography from "@/jikopoint/components/RichTypography";
import Section from "@/jikopoint/components/Section";
import ShareBar from "@/jikopoint/components/ShareBar";

function NewsContent({ date, content, children, image, title, ...props }) {
  const classes = useStyles(props);

  if (!content?.length && !image) {
    return null;
  }
  const socialLinks = [
    { name: "facebook", alt: "facebook" },
    { name: "twitter", alt: "twitter" },
    { name: "linkedin", alt: "linkedin" },
    { name: "whatsApp", alt: "whatsApp" },
    { name: "telegram", alt: "telegram" },
  ];

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <Section classes={{ root: classes.section }}>
      {title && (
        <Typography color="primary" variant="h3" className={classes.title}>
          {title}
        </Typography>
      )}
      <Grid container direction="column" className={classes.root}>
        {date && (
          <Typography className={classes.date} variant="h6">
            {new Date(date).toLocaleString("en-GB", options)}
          </Typography>
        )}
        <Grid item md={8}>
          {image?.url && (
            <div className={classes.image}>
              <Image
                alt="article"
                src={image?.url}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
        </Grid>
        <ShareBar socialLinks={socialLinks} text="Shirikisha" title={title} />
        {content && (
          <Grid item md={8}>
            <RichTypography className={classes.content} variant="body1">
              {content}
            </RichTypography>
          </Grid>
        )}
      </Grid>
    </Section>
  );
}

NewsContent.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  content: PropTypes.string,
  children: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string,
  }),
};

NewsContent.defaultProps = {
  title: undefined,
  date: undefined,
  content: undefined,
  children: undefined,
  image: undefined,
};

export default NewsContent;

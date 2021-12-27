import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import PropTypes from "prop-types";
import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import heroImg from "@/jikopoint/assets/images/megan-thomas-xMh_ww8HN_Q-unsplash.jpg";
import Link from "@/jikopoint/components/Link";
import Section from "@/jikopoint/components/Section";

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1280,
    },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1279, min: 768 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1,
  },
};

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    position: "relative",
    height: typography.pxToRem(450),
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(650),
    },
  },
  background: {
    position: "absolute",
    width: "100%",
    overflow: "hidden",
    zIndex: -1,
    height: typography.pxToRem(450),
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(680),
    },
  },
  colorBg: {
    background:
      "linear-gradient( to right, hsla(0, 0%, 0%, 0.964) 7.4%, hsla(0, 0%, 0%, 0.918) 15.3%, hsla(0, 0%, 0%, 0.862) 23.4%, hsla(0, 0%, 0%, 0.799) 31.6%, hsla(0, 0%, 0%, 0.73) 39.9%, hsla(0, 0%, 0%, 0.655) 48.2%, hsla(0, 0%, 0%, 0.577) 56.2%, hsla(0, 0%, 0%, 0.497) 64%, hsla(0, 0%, 0%, 0.417) 71.3%, hsla(0, 0%, 0%, 0.337) 78.1%, hsla(0, 0%, 0%, 0.259) 84.2%, hsla(0, 0%, 0%, 0.186) 89.6%,hsla(0, 0%, 0%, 0.117) 94.1%, hsla(0, 0%, 0%, 0.054) 97.6%, hsla(0, 0%, 0%, 0) 100%)",
  },
  section: {
    display: "flex",
    color: palette.text.secondary,
    height: typography.pxToRem(450),
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(680),
    },
  },
  starter: {
    color: palette.text.secondary,
    marginRight: typography.pxToRem(5),
    height: typography.pxToRem(60),
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
    [breakpoints.up("lg")]: {
      WebkitLineClamp: 2,
      height: typography.pxToRem(60),
    },
  },
  text: {
    color: palette.text.secondary,
    margin: `${typography.pxToRem(20)} 0`,
    height: typography.pxToRem(60),
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
  },
  title: {
    marginBottom: typography.pxToRem(20),
    [breakpoints.up("lg")]: {
      marginBottom: typography.pxToRem(30),
    },
  },
  outlined: {
    padding: `${typography.pxToRem(10)} ${typography.pxToRem(20)}`,
    margin: typography.pxToRem(2),
  },
}));

function Hero({ heading, items, buttonText, ...props }) {
  const classes = useStyles(props);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleAfterChange = (slide) => {
    setCurrentSlide(slide);
  };
  return (
    <div className={classes.root}>
      <div className={classes.background}>
        <Image
          src={heroImg}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className={classes.colorBg}>
        <Section classes={{ root: classes.section }}>
          <Grid container alignItems="center" justifyContent="flex-start">
            <Grid item xs={10} lg={8}>
              <Typography variant="h1" className={classes.title}>
                {heading}
              </Typography>
              <Carousel
                infinite
                ssr
                swipeable
                autoPlay
                autoPlaySpeed={4000}
                customTransition="transform 600ms ease-in-out"
                transitionDuration={500}
                arrows={false}
                beforeChange={handleAfterChange}
                responsive={responsive}
              >
                {items?.map(({ title, description }) => (
                  <div key={title}>
                    <Typography variant="h3" className={classes.starter}>
                      {title}
                    </Typography>
                    <Typography variant="body1" className={classes.text}>
                      {description}
                    </Typography>
                  </div>
                ))}
              </Carousel>
              {buttonText && (
                <Button
                  classes={{ outlined: classes.outlined }}
                  color="inherit"
                  component={Link}
                  href={items[currentSlide]?.link?.replace(
                    "https://jikopoint.co.tz",
                    ""
                  )}
                  underline="none"
                  variant="outlined"
                >
                  {buttonText}
                </Button>
              )}
            </Grid>
          </Grid>
        </Section>
      </div>
    </div>
  );
}

Hero.propTypes = {
  buttonText: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      link: PropTypes.string,
    })
  ),
  heading: PropTypes.string,
};

Hero.defaultProps = {
  buttonText: "Soma zaidi",
  items: [
    {
      title: "Ujue mtambo wa biogesi bana matumizi Tanzania",
      description:
        "Ukiununua mtambo huo kazi yako ni kuulisha taka zinazooza hadi kilo 15 ambazo zitakuwezesha kupika hadi Saa 4.",
      link: "https://jikopoint.co.tz/jiko-news/biashara/jikopoint-co-tz",
    },
    {
      title: "Jifunze kupika mchuzi wa papa wa nazi",
      description:
        "Ndani ya dakika 10 utajifunza kuandaa na kupika papa kwa njia rahisi",
      link: "https://jikopoint.co.tz/jiko-class/kozi/6152c8a01dc09116c39ba80f",
    },
  ],
  heading: "Mapya",
};
export default Hero;

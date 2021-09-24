import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { alpha } from "@material-ui/core/styles/colorManipulator";
import Image from "next/image";
import React from "react";

import endevLogo from "@/jikopoint/assets/logos/endev.jpg";
import energiaLogo from "@/jikopoint/assets/logos/Energia.png";
import hivosLogo from "@/jikopoint/assets/logos/hivos.jpg";
import mecsLogo from "@/jikopoint/assets/logos/mecs.png";
import NuktaLogo from "@/jikopoint/assets/logos/nukta.jpeg";
import Link from "@/jikopoint/components/Link";
import Section from "@/jikopoint/components/Section";

const partners = [
  {
    alt: "Nuta Africa",
    logo: NuktaLogo,
    link: "https://nuktaafrica.co.tz/",
  },
  {
    alt: "Hivos",
    logo: hivosLogo,
    link: "https://hivos.org/",
  },
  {
    alt: "Energia",
    logo: energiaLogo,
    link: "https://www.energia.ie/",
  },
  {
    alt: "endev",
    logo: endevLogo,
    link: "https://endev.info/",
  },
  {
    alt: "mecs",
    logo: mecsLogo,
    link: "https://mecs.org.uk/",
  },
];

const useStyles = makeStyles(
  ({ breakpoints, transitions, typography, palette }) => ({
    root: {
      margin: `${typography.pxToRem(20)} 0`,
      [breakpoints.up("md")]: {
        margin: `${typography.pxToRem(60)} 0`,
      },
    },
    section: {},
    title: {
      marginBottom: typography.pxToRem(10),
      [breakpoints.up("lg")]: {
        marginBottom: typography.pxToRem(30),
      },
    },
    partner: {
      justifyContent: "center",
      transition: transitions.create("box-shadow", {
        easing: transitions.easing.easeOut,
      }),
      "&:hover": {
        boxShadow: `0px 3px 6px ${alpha(palette.common.black, 0.16)}`, // #00000029
      },
      "& img": {
        filter: "grayscale(1)",
        transition: transitions.create("filter", {
          easing: transitions.easing.easeOut,
        }),
        "&:hover": {
          filter: "unset",
        },
      },
    },
  })
);

function Partners({ ...props }) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Typography variant="h3" className={classes.title}>
          Wadau Wetu
        </Typography>
        <Grid container justifyContent="space-around" alignItems="center">
          {partners.map(({ alt, link, logo }) => (
            <Grid item xs={6} md={4} lg={2} key={alt}>
              <Link href={link} className={classes.partner}>
                <Image
                  objectFit="contain"
                  width={180}
                  height={120}
                  src={logo}
                  alt={alt}
                  className={classes.logo}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Section>
    </div>
  );
}

export default Partners;

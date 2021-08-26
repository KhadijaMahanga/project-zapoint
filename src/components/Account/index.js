import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import { ReactComponent as IconRole } from "@/jikopoint/assets/icons/icon-award-grey.svg";
import { ReactComponent as IconEmail } from "@/jikopoint/assets/icons/icon-email-grey.svg";
import { ReactComponent as IconUser } from "@/jikopoint/assets/icons/icon-user-grey.svg";
import Admin from "@/jikopoint/components/Admin";
import DefaultProfilePic from "@/jikopoint/components/DefaultProfilePic";
import Link from "@/jikopoint/components/Link";
import Section from "@/jikopoint/components/Section";
import useAuth from "@/jikopoint/hooks/useAuth";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    padding: `${typography.pxToRem(40)} 0`,
  },
  section: {},
  profilepic: {
    color: palette.background.dark,
    fontSize: 50,
    backgroundColor: palette.background.dark,
    width: "100%",
    [breakpoints.up("md")]: {
      height: typography.pxToRem(200),
    },
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(300),
    },
  },
  cardRoot: {
    borderRadius: 0,
    boxShadow: "none",
    width: "100%",
    border: "1px solid #f1f1f1",
    height: "auto",
    marginBottom: typography.pxToRem(20),
    [breakpoints.up("md")]: {
      width: typography.pxToRem(250),
    },
    [breakpoints.up("lg")]: {
      width: typography.pxToRem(330),
    },
  },
  header: {
    textTransform: "uppercase",
    color: palette.text.primary,
    fontSize: typography.pxToRem(13),
    fontWeight: "bold",
  },
  name: {
    textTransform: "capitalize",
    color: palette.text.primary,
    fontSize: typography.pxToRem(16),
  },
  text: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(16),
  },
  cardContentRoot: {
    padding: typography.pxToRem(20),
  },
  cardActionAreaFocusHighlight: {
    backgroundColor: "inherit",
  },
  icon: {
    width: typography.pxToRem(25),
    height: typography.pxToRem(25),
  },
  roleIcon: {
    width: typography.pxToRem(35),
    height: typography.pxToRem(35),
    marginLeft: typography.pxToRem(-5),
  },
  editButton: {
    backgroundColor: palette.primary.main,
    fontSize: typography.pxToRem(13),
  },
  logOutButton: {
    fontSize: typography.pxToRem(13),
    backgroundColor: "#CC8585",
  },
  button: {
    color: palette.text.secondary,
    width: "100%",
    [breakpoints.up("md")]: {
      maxWidth: typography.pxToRem(250),
    },
    [breakpoints.up("lg")]: {
      maxWidth: typography.pxToRem(330),
    },
  },
}));

function Account({ user, ...props }) {
  const classes = useStyles(props);
  const { signOut } = useAuth();

  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid container alignItems="flex-start" justifyContent="center">
          <Grid item container xs={12} md={4}>
            <Grid item xs={12}>
              <Card className={classes.cardRoot}>
                <CardActionArea
                  component={Link}
                  href="/profile/settings"
                  classes={{
                    focusHighlight: classes.cardActionAreaFocusHighlight,
                  }}
                  underline="none"
                >
                  <div className={classes.profilepic}>
                    {user?.image ? (
                      <Image src={user?.image} layout="fill" />
                    ) : (
                      <DefaultProfilePic
                        letter={user?.name[0] || user?.email[0]}
                        width="100%"
                        height="100%"
                      />
                    )}
                  </div>
                  <CardContent classes={{ root: classes.cardContentRoot }}>
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={2}>
                        <IconUser className={classes.icon} />
                      </Grid>
                      <Grid item container xs={10}>
                        <Grid item xs={12}>
                          <Typography
                            variant="body2"
                            className={classes.header}
                          >
                            Jina
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" className={classes.name}>
                            {user?.name}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={2}>
                        <IconEmail className={classes.icon} />
                      </Grid>
                      <Grid item container xs={10}>
                        <Grid item xs={12}>
                          <Typography
                            variant="body2"
                            className={classes.header}
                          >
                            Barua Pepe
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" className={classes.text}>
                            {user?.email}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={2}>
                        <IconRole className={classes.roleIcon} />
                      </Grid>
                      <Grid item container xs={10}>
                        <Grid item xs={12}>
                          <Typography
                            variant="body2"
                            className={classes.header}
                          >
                            Role
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" className={classes.text}>
                            {user?.role}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} container className={classes.button} spacing={1}>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  component={Link}
                  href="/profile/settings"
                  fullWidth
                  color="inherit"
                  className={classes.editButton}
                >
                  Hariri
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="inherit"
                  onClick={signOut}
                  className={classes.logOutButton}
                >
                  Ondoka
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            {user?.role === "admin" && <Admin {...props} />}
          </Grid>
        </Grid>
      </Section>
    </div>
  );
}

Account.propTypes = {
  user: PropTypes.shape({
    image: PropTypes.string,
    role: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default Account;

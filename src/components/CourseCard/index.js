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
import React, { useState } from "react";

import { ReactComponent as RegisterIcon } from "@/jikopoint/assets/icons/icon-register.svg";
import { ReactComponent as RemoveIcon } from "@/jikopoint/assets/icons/icon-remove.svg";
import LoginDialog from "@/jikopoint/components/Course/LoginDialog";
import JikoSnackbar from "@/jikopoint/components/JikoSnackbar";
import Link from "@/jikopoint/components/Link";
import useAuth from "@/jikopoint/hooks/useAuth";
import fetcher from "@/jikopoint/utils/fetcher";

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
    fontWeight: "bold",
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
  enrolmentId,
  ...props
}) {
  const classes = useStyles(props);
  const { session, signIn, providers } = useAuth();
  const [openLogin, setOpenLogin] = useState(false);
  const [notice, setNotice] = useState();
  const [noticeStatus, setNoticeStatus] = useState();
  const Component = slug?.length ? Link : undefined;

  const [open, setOpen] = useState(false);

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleCloseDialog = () => {
    setOpenLogin(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (session?.user && session?.user?.role === "trainee") {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          student: session.user.email,
          course: slug,
        }),
      };
      const res = await fetcher("/api/enrolment", options);
      if (!res.success) {
        setNotice(`Samahani, jaribu tena baadae ${res.message}`);
        setNoticeStatus("error");
      } else {
        setNotice("Umefanikiwa kujisajili");
        setNoticeStatus("success");
      }
      setOpen(true);
    } else {
      setOpenLogin(true);
    }
  };

  const handleDeregister = async (e) => {
    e.preventDefault();
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
    };
    const res = await fetcher(`/api/enrolment/${enrolmentId}`, options);
    if (!res.success) {
      setNotice(`Samahani, jaribu tena baadae ${res.message}`);
      setNoticeStatus("error");
    } else {
      setNotice("Umefanikiwa kufuta");
      setNoticeStatus("success");
    }
    setOpen(true);
  };

  if (!(name || image || slug)) {
    return null;
  }
  return (
    <>
      <JikoSnackbar
        open={open}
        onClose={handleCloseSnack}
        message={notice}
        status={noticeStatus}
      />
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
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
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
                    {!trainee ? (
                      <Tooltip title="Jisajili">
                        <IconButton
                          aria-label="Open drawer"
                          edge="start"
                          onClick={handleRegister}
                          className={classes.menuButton}
                        >
                          <RegisterIcon className={classes.icon} />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Futa usajili">
                        <IconButton
                          edge="start"
                          onClick={handleDeregister}
                          className={classes.menuButton}
                        >
                          <RemoveIcon className={classes.icon} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}
        </CardActionArea>
      </Card>
      <LoginDialog
        {...props}
        openDialog={openLogin}
        handleCloseDialog={handleCloseDialog}
        signIn={signIn}
        providers={providers}
        title="Ili kujisajili kwenye darasa, inabidi uingie kama mwanafunzi"
      />
    </>
  );
}

CourseCard.propTypes = {
  slug: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  duration: PropTypes.number,
  trainer: PropTypes.bool,
  trainee: PropTypes.bool,
  enrolmentId: PropTypes.string,
  instructor: PropTypes.shape({
    name: PropTypes.string,
  }),
};

CourseCard.defaultProps = {
  slug: undefined,
  enrolmentId: undefined,
  image: undefined,
  instructor: undefined,
  name: undefined,
  duration: undefined,
  trainer: false,
  trainee: false,
};

export default CourseCard;

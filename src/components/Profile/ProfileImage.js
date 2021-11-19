/* eslint-disable no-underscore-dangle */
import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Image from "next/image";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { WidgetLoader, Widget } from "react-cloudinary-upload-widget";

import anonymous from "@/jikopoint/assets/images/anonymous_3.png";
import fetcher from "@/jikopoint/utils/fetcher";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {},
  label: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(16),
  },
  caption: {
    color: palette.text.primary,
    fontSize: typography.pxToRem(13),
    textDecoration: "underline",
  },
  button: {
    color: palette.text.secondary,
    fontFamily: typography.body1.fontFamily,
    width: typography.pxToRem(120),
    margin: `${typography.pxToRem(20)} auto`,
  },
  futaButton: {
    backgroundColor: "#CC8585",
    "& :hover": {
      backgroundColor: "#CC8585",
      opacity: 0.7,
    },
  },
}));

function ProfileImage({ user: userProps, ...props }) {
  const classes = useStyles(props);
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(userProps);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    setUser(userProps);
    if (userProps?.image) {
      setImage(userProps?.image);
    }
  }, [userProps]);

  const onSuccess = (obj) => {
    if (obj?.event === "success") {
      setImage(obj?.info?.secure_url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ image }),
    };
    const rUser = await fetcher(`/api/users/${user?._id}`, options);
    if (rUser?.success) {
      setNotification("Umefanikiwa kuhifadhi");
    } else {
      setNotification("Samahani, huduma imesitisha. Jaribu tena");
    }
    setTimeout(() => {
      setNotification("");
    }, 4000);
  };

  const imageSrc = image && image !== "null" ? image : anonymous;

  return (
    <>
      <WidgetLoader />
      <form className={classes.root} onSubmit={(e) => handleSubmit(e)}>
        {notification?.length > 0 && (
          <Typography className={classes.caption}>{notification}</Typography>
        )}
        <Grid container>
          <Grid item xs={12} md={6}>
            <Image
              src={imageSrc}
              objectFit="contain"
              width={310}
              height={224}
              alt="profile image"
            />
          </Grid>
          <Grid item xs={12} md={6} container>
            {image && (
              <Grid item xs={6} md={12}>
                <Button
                  variant="contained"
                  classes={{
                    contained: clsx(classes.button, classes.futaButton),
                  }}
                  onClick={() => {
                    setImage(null);
                  }}
                >
                  Futa picha
                </Button>
              </Grid>
            )}
            <Grid item xs={6} md={12}>
              <Widget
                sources={["local", "camera"]} // set the sources available for uploading -> by default
                // all sources are available. More information on their use can be found at
                // https://cloudinary.com/documentation/upload_widget#the_sources_parameter
                // and ID's as an object. More information on their use can be found at
                // https://cloudinary.com/documentation/upload_widget#the_sources_parameter
                resourceType="image" // optionally set with 'auto', 'image', 'video' or 'raw' -> default = 'auto'
                cloudName="nukta-cloud" // your cloudinary account cloud name.
                // Locmy_foldermy_folderated on https://cloudinary.com/console/
                uploadPreset="jikopoint" // check that an upload preset exists and check mode is signed or unisgned
                buttonText="Pakia Picha" // default 'Upload Files'
                style={{
                  color: "white",
                  border: "none",
                  width: "120px",
                  backgroundColor: "#41aa54",
                  textTransform: "uppercase",
                  fontFamily: "'Source Sans Pro', sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  borderRadius: "4px",
                  padding: "6px 8px",
                  lineHeight: 1.6875,
                }} // inline styling only or style id='cloudinary_upload_button'
                folder="public/uploads" // set cloudinary folder name to send file
                cropping // set ability to crop images -> default = true
                onSuccess={onSuccess} // add success callback -> returns result
                onFailure={() => {}} // add failure callback -> returns 'response.error' + 'response.result'
                logging={false} // logs will be provided for success and failure messages,
                // set to false for production -> default = true
                customPublicId="sample" // set a specific custom public_id.
                // To use the file name as the public_id use 'use_filename={true}' parameter
                eager="w_400,h_300,c_pad|w_260,h_200,c_crop" // add eager transformations -> deafult = null
                use_filename={false} // tell Cloudinary to use the original name of the uploaded
                // file as its public ID -> default = true,
              />
            </Grid>
            <Grid item xs={6} md={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                classes={{ root: classes.button }}
              >
                Hifadhi
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.buttonAction} />
      </form>
    </>
  );
}

ProfileImage.propTypes = {
  user: PropTypes.shape({
    image: PropTypes.string,
    _id: PropTypes.string,
  }),
};

ProfileImage.defaultProps = {
  user: undefined,
};

export default ProfileImage;

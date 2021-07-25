import { IconButton, Grid, Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { ReactComponent as SearchIcon } from "@/jikopoint/assets/icons/icon-search-white.svg";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {},
  inputRoot: {
    padding: typography.pxToRem(2),
    color: palette.text.secondary,
    border: "1px solid transparent",
    transition: "background-color 0.3s ease-out, border 0.3s ease-out",
    "&:hover, &:focus-within": {
      backgroundColor: palette.background.default,
      border: `1px solid ${palette.primary.main}`,
    },
    [breakpoints.down("sm")]: {
      width: typography.pxToRem(200),
    },
  },
  button: {
    backgroundColor: palette.secondary.main,
    borderRadius: typography.pxToRem(3),
    padding: typography.pxToRem(15),
    marginLeft: typography.pxToRem(20),
    [breakpoints.up("md")]: {
      marginLeft: typography.pxToRem(30),
    },
    [breakpoints.up("lg")]: {
      marginLeft: typography.pxToRem(40),
    },
  },
  icon: {
    width: typography.pxToRem(25),
    height: typography.pxToRem(25),
  },
  input: {
    backgroundColor: "inherit",
    height: typography.pxToRem(22),
    // For border-radius of 20px, we need to leave spacing
    marginLeft: typography.pxToRem(8),
    padding: `${typography.pxToRem(6)} 0`,
    "&::placeholder": {
      fontFamily: typography.h2.fontFamily,
      fontSize: typography.pxToRem(30),
      fontWeight: 400,
      opacity: 1,
    },
    "&:hover::placeholder, &:focus::placeholder": {
      opacity: 0,
      backgroundColor: "inherit",
    },
  },
  underline: {
    "&:after": {
      borderBottom: `2px solid ${palette.background.default}`,
    },
    "&:before": {
      borderBottom: `2px solid ${palette.background.default}`,
    },
  },
}));

function Search({ ...props }) {
  const classes = useStyles(props);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleClick = () => {
    const href = `/search/${query}`;
    router.push(href);
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleClick();
    }
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="flex-end"
      alignContent="center"
      className={classes.root}
    >
      <Grid item>
        <Input
          inputProps={{ "aria-label": "search" }}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={"Tafuta.."}
          classes={{
            root: classes.inputRoot,
            input: classes.input,
            underline: classes.underline,
          }}
        />
      </Grid>
      <Grid item>
        <IconButton
          color="primary"
          onClick={handleClick}
          size="small"
          className={classes.button}
        >
          <SearchIcon className={classes.icon} />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default Search;

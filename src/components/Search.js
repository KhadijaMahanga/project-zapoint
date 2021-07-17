import {
    IconButton,
    InputAdornment,
    InputBase,
  } from "@material-ui/core";
  import { makeStyles } from "@material-ui/core/styles";
  import { useRouter } from "next/router";
  import React, { useState } from "react";
  
  import { ReactComponent as SearchIcon } from "@/jikopoint/assets/icons/icon-search-white.svg";
  
  const useStyles = makeStyles(({ palette, typography }) => ({
    root: {
      padding: typography.pxToRem(2),
      backgroundColor: "#E1EDED",
      borderRadius: typography.pxToRem(20),
      color: palette.primary.main,
      border: "1px solid transparent",
      width: typography.pxToRem(200),
      transition: "background-color 0.3s ease-out, border 0.3s ease-out",
      "&:hover, &:focus-within": {
        backgroundColor: palette.background.default,
        border: `1px solid ${palette.primary.main}`,
      },
    },
    button: {
      padding: 0,
      backgroundColor: palette.secondary.main,
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
      textAlign: "right",
      "&:hover::placeholder, &:focus::placeholder": {
        opacity: 0,
      },
    },
  }));
  
  function Search() {
    const classes = useStyles();
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
      <InputBase
        inputProps={{ "aria-label": "search" }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              color="primary"
              onClick={handleClick}
              size="small"
              className={classes.button}
            >
              <SearchIcon className={classes.icon} />
            </IconButton>
          </InputAdornment>
        }
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        classes={{
          root: classes.root,
          input: classes.input,
        }}
      />
    );
  }
  
  export default Search;
  
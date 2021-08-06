import { IconButton, SvgIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import { ReactComponent as ArrowLeftIcon } from "@/jikopoint/assets/icons/arrow-left-circle.svg";
import { ReactComponent as ArrowRightIcon } from "@/jikopoint/assets/icons/arrow-right-circle.svg";

const useStyles = makeStyles(({ typography }) => ({
  root: (props) => ({
    fontSize: typography.pxToRem(props.fontSize),
  }),
  icon: {
    padding: 0,
  },
}));

function PaginationButton({
  direction,
  disabled: disabledProp,
  size,
  href,
  onClick,
  ...props
}) {
  let fontSize;
  switch (size) {
    case "large":
      fontSize = 48;
      break;
    case "small":
      fontSize = 24;
      break;
    default:
      fontSize = 37;
  }
  const disabled = disabledProp || (!href?.length && onClick === undefined);
  const classes = useStyles({ disabled, fontSize, ...props });
  const Icon =
    direction?.toLowerCase() === "next" ? ArrowRightIcon : ArrowLeftIcon;

  return (
    <IconButton
      color="primary"
      disabled={disabled}
      href={href}
      onClick={onClick}
      {...props}
      classes={{ root: classes.icon }}
    >
      <SvgIcon
        component={Icon}
        viewBox="0 0 16 16"
        classes={{ root: classes.root }}
      />
    </IconButton>
  );
}

PaginationButton.propTypes = {
  direction: PropTypes.oneOf(["previous", "next"]),
  disabled: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
};

PaginationButton.defaultProps = {
  direction: "previous",
  disabled: undefined,
  href: undefined,
  onClick: undefined,
  size: "medium",
};

export default PaginationButton;

import React from "react";
import MoreIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";

export const Mobile = ({ classes, mobileMenu }) => {
  return (
    <div className={classes.sectionMobile}>
      <IconButton
        aria-label="show more"
        aria-controls={mobileMenu.id}
        aria-haspopup="true"
        onClick={mobileMenu.open}
        color="inherit"
      >
        <MoreIcon />
      </IconButton>
    </div>
  );
};

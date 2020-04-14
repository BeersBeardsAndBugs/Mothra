import React from "react";
import MoreIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";

export const Mobile = ({ classes, mobileMenuId, handleMobileMenuOpen }) => {
  return (
    <div className={classes.sectionMobile}>
      <IconButton
        aria-label="show more"
        aria-controls={mobileMenuId}
        aria-haspopup="true"
        onClick={handleMobileMenuOpen}
        color="inherit"
      >
        <MoreIcon />
      </IconButton>
    </div>
  );
};

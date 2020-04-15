import React, { Fragment } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

export const ProfileMenu = ({ name, email, handleAllMenuClose }) => {
  return (
    <Fragment>
      <MenuItem>{name}</MenuItem>
      <MenuItem>{email}</MenuItem>
      <Divider />
      <MenuItem onClick={() => handleAllMenuClose("logout")}>Logout</MenuItem>
    </Fragment>
  );
};

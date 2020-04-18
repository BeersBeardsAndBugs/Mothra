import React, { Fragment } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

export const ProfileMenu = ({ name, email, logout, handleAllMenuClose }) => {
  const handleLogOut = () => {
    handleAllMenuClose();
    logout();
  };
  return (
    <Fragment>
      <MenuItem>{name}</MenuItem>
      <MenuItem>{email}</MenuItem>
      <Divider />
      <MenuItem onClick={handleLogOut}>Logout</MenuItem>
    </Fragment>
  );
};

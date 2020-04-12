import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export const ProfileMenu = ({
  profileAnchorEl,
  profileMenuId,
  isProfileMenuOpen,
  handleAllMenuClose,
  name,
  email,
}) => {
  return (
    <Menu
      anchorEl={profileAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={profileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isProfileMenuOpen}
      onClose={handleAllMenuClose}
    >
      <MenuItem>{name}</MenuItem>
      <MenuItem>{email}</MenuItem>
      <hr />
      <MenuItem onClick={handleAllMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleAllMenuClose}>My account</MenuItem>
      <MenuItem onClick={() => handleAllMenuClose("logout")}>Logout</MenuItem>
    </Menu>
  );
};

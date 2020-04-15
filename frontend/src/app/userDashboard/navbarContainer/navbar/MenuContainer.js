import React from "react";
import Menu from "@material-ui/core/Menu";

export const MenuContainer = ({
  anchorEl,
  menuId,
  isMenuOpen,
  handleAllMenuClose,
  children,
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleAllMenuClose}
    >
      {children}
    </Menu>
  );
};

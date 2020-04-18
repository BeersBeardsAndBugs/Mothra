import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";

export const NotificationsMenu = ({
  notifications = [],
  handleAllMenuClose,
  anchorEl,
  menuId,
  isMenuOpen,
}) => {
  const handleNotificationClick = (bugid) => {
    alert(
      `404: You are trying to open Bug-${bugid}, but the BugDetail Component isn't finished.`
    );
    handleAllMenuClose();
  };
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
      {notifications.map((notification, index) => {
        return (
          <MenuItem
            key={"notification" + index}
            onClick={() => handleNotificationClick(notification.bugId)}
          >
            <ListItemText
              primary={notification.bugId}
              secondary={notification.message}
            />
          </MenuItem>
        );
      })}
    </Menu>
  );
};

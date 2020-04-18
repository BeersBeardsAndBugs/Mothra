import React, { Fragment } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";

export const NotificationsMenu = ({ notifications, handleAllMenuClose }) => {
  const handleNotificationClick = (bugid) => {
    alert(
      `404: You are trying to open Bug-${bugid}, but the BugDetail Component isn't finished.`
    );
    handleAllMenuClose();
  };
  return (
    <Fragment>
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
    </Fragment>
  );
};

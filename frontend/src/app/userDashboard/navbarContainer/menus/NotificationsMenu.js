import React, { Fragment } from "react";
import MenuItem from "@material-ui/core/MenuItem";

export const NotificationsMenu = ({
  notifications,
  handleNotificationClick,
}) => {
  return (
    <Fragment>
      {notifications.map((notification, index) => {
        return (
          <MenuItem
            key={"notification" + index}
            onClick={() => handleNotificationClick(notification.bugId)}
          >
            <h3>{notification.bugId}</h3>: <p>{notification.message}</p>
          </MenuItem>
        );
      })}
    </Fragment>
  );
};

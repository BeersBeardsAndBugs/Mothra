import React from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";

export const Desktop = ({
  classes,
  notifications,
  profileMenu,
  notificationsMenu,
}) => {
  return (
    <div className={classes.sectionDesktop}>
      <IconButton
        aria-label={`show ${notifications?.length} new notifications`}
        aria-label="notifications of current user"
        aria-controls={notificationsMenu.id}
        aria-haspopup="true"
        onClick={notificationsMenu.open}
        color="inherit"
      >
        <Badge badgeContent={notifications?.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={profileMenu.id}
        aria-haspopup="true"
        onClick={profileMenu.open}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </div>
  );
};

import React from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";

export const Desktop = ({
  classes,
  messages,
  notifications,
  profileMenuId,
  handleProfileMenuOpen,
}) => {
  return (
    <div className={classes.sectionDesktop}>
      <IconButton aria-label="show 4 new messagess" color="inherit">
        <Badge badgeContent={messages?.length} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
      <IconButton aria-label="show 17 new notifications" color="inherit">
        <Badge badgeContent={notifications?.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={profileMenuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
    </div>
  );
};

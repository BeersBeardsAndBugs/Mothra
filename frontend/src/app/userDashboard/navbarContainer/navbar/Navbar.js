import React, { useState, useRef } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import { Logo } from "./logo";
import { Search, Desktop, Mobile } from "./sections";

export const Navbar = ({
  classes,
  user,
  profileMenuId,
  handleProfileMenuOpen,
  mobileMenuId,
  handleMobileMenuOpen,
}) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          <Logo />
        </Typography>
        <Search {...{ classes }} />
        <div className={classes.grow} />
        <Desktop
          {...{
            classes,
            messages: user.messages,
            notifications: user.notifications,
            profileMenuId,
            handleProfileMenuOpen,
          }}
        />
        <Mobile {...{ classes, mobileMenuId, handleMobileMenuOpen }} />
      </Toolbar>
    </AppBar>
  );
};

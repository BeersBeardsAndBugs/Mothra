import React, { useState, useEffect, useRef } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { MobileMenu, ProfileMenu, Navbar } from "./components";
import { navbarStyles } from "./navbarStyles";

export const NavbarContainer = ({ user, setUser, setPageSelected }) => {
  // ALEX TESTING
  // use for testing notifications and messages badges
  useEffect(() => {
    setUser({
      ...user,
      messages: [
        "You're fired.",
        "Did I mention you are fired?",
        "In case you missed it, you no longer work here.",
      ],
      notifications: ["Status Changed to: FIRED"],
    });
  }, []);
  // ALEX TESTING

  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const classes = makeStyles((theme) => navbarStyles(theme, fade))();

  const isProfileMenuOpen = !!profileAnchorEl;
  const isMobileMenuOpen = !!mobileMoreAnchorEl;

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleAllMenuClose = (action) => {
    switch (action) {
      case "logout":
        setPageSelected("login");
        setUser(null);
        break;
      case "default":
        break;
    }

    setProfileAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const profileMenuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <div className={`${classes.grow}`}>
      <Navbar
        {...{
          classes,
          user,
          profileMenuId,
          handleProfileMenuOpen,
          mobileMenuId,
          handleMobileMenuOpen,
        }}
      />
      <MobileMenu
        {...{
          mobileMoreAnchorEl,
          mobileMenuId,
          isMobileMenuOpen,
          handleAllMenuClose,
          handleProfileMenuOpen,
          messages: user.messages,
          notifications: user.notifications,
        }}
      />
      <ProfileMenu
        {...{
          profileAnchorEl,
          profileMenuId,
          isProfileMenuOpen,
          handleAllMenuClose,
          name: user.name,
          email: user.email,
        }}
      />
    </div>
  );
};

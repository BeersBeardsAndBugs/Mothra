import React, { useState, useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  MobileMenu,
  Navbar,
  ProfileMenu,
  MenuContainer,
  NotificationsMenu,
} from "./navbar";
import { navbarStyles } from "./navbarStyles";
import {} from "./navbar";

export const NavbarContainer = ({ user, setUser, setPageSelected }) => {
  // ALEX TESTING
  // use for testing notifications and messages badges
  useEffect(() => {
    setUser({
      ...user,
      notifications: [
        { bugId: "1234", message: "Description Changed." },
        { bugId: "2345", message: "Status changed" },
      ],
    });
  }, []);
  // ALEX TESTING

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);

  const classes = makeStyles((theme) => navbarStyles(theme, fade))();

  const isProfileMenuOpen = !!profileAnchorEl;
  const isNotificationsMenuOpen = !!notificationsAnchorEl;
  const isMobileMenuOpen = !!mobileMoreAnchorEl;
  const profileMenuId = "primary-search-account-menu";
  const notificationsMenuId = "primary-search-notif-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const handleNotificationsMenuOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleAllMenuClose = (action) => {
    switch (action) {
      case "logout":
        setPageSelected("login");
        setUser(null);
        break;
      default:
        break;
    }

    setMobileMoreAnchorEl(null);
    setProfileAnchorEl(null);
    setNotificationsAnchorEl(null);
  };

  const handleNotificationClick = (bugid) => {
    alert(
      `404: You are trying to open Bug-${bugid}, but the BugDetail Component isn't finished.`
    );
    setNotificationsAnchorEl(null);
  };

  return (
    <div className={`${classes.grow}`}>
      <Navbar
        {...{
          classes,
          user,
          profileMenuId,
          handleProfileMenuOpen,
          notificationsMenuId,
          handleNotificationsMenuOpen,
          mobileMenuId,
          handleMobileMenuOpen,
        }}
      />

      <MenuContainer
        {...{
          anchorEl: profileAnchorEl,
          menuId: profileAnchorEl,
          isMenuOpen: isProfileMenuOpen,
          handleAllMenuClose,
        }}
      >
        <ProfileMenu
          {...{ name: user.name, email: user.email, handleAllMenuClose }}
        />
      </MenuContainer>
      <MenuContainer
        {...{
          anchorEl: notificationsAnchorEl,
          menuId: notificationsMenuId,
          isMenuOpen: isNotificationsMenuOpen,
          handleAllMenuClose,
        }}
      >
        <NotificationsMenu
          {...{
            handleNotificationClick,
            notifications: user.notifications,
          }}
        />
      </MenuContainer>
      <MenuContainer
        {...{
          anchorEl: mobileMoreAnchorEl,
          menuId: mobileMenuId,
          isMenuOpen: isMobileMenuOpen,
          handleAllMenuClose,
        }}
      >
        <MobileMenu
          {...{
            handleNotificationsMenuOpen,
            handleProfileMenuOpen,
            notificationsCount: user.notifications?.length,
          }}
        />
      </MenuContainer>
    </div>
  );
};

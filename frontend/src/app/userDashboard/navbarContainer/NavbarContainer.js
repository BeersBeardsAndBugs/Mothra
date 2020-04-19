import React, { useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { navbarStyles } from "./navbarStyles";
import { useMenu } from "../../../hooks";
import { Navbar } from "./navbar";
import { MobileMenu, ProfileMenu, NotificationsMenu } from "./menus";

export const NavbarContainer = ({
  user,
  setUser,
  setPageSelected,
  handleVisibleBugChange,
}) => {
  // ALEX TESTING
  // use for testing notifications
  useEffect(() => {
    setUser({
      ...user,
      notifications: [
        { bugId: 1, message: "The title has been altered." },
        { bugId: 2, message: "Status changed" },
      ],
    });
  }, []);
  // ALEX TESTING

  const [profileMenu] = useMenu("profile", {
    name: user.name,
    email: user.email,
    logout: () => {
      setPageSelected("login");
      setUser(null);
    },
  });

  const [notificationsMenu] = useMenu("profile", {
    notifications: user.notifications,
    handleVisibleBugChange,
  });

  const [mobileMenu] = useMenu("profile", {
    notificationsMenuOpen: notificationsMenu.open,
    profileMenuOpen: profileMenu.open,
    notificationsCount: user.notifications?.length,
  });

  const classes = makeStyles((theme) => navbarStyles(theme, fade))();

  const handleAllMenuClose = () => {
    profileMenu.close();
    notificationsMenu.close();
    mobileMenu.close();
  };

  return (
    <div className={`${classes.grow}`}>
      <Navbar
        {...{
          classes,
          user,
          profileMenu,
          notificationsMenu,
          mobileMenu,
        }}
      />
      <MobileMenu {...{ ...mobileMenu.props, handleAllMenuClose }} />
      <ProfileMenu {...{ ...profileMenu.props, handleAllMenuClose }} />
      <NotificationsMenu
        {...{ ...notificationsMenu.props, handleAllMenuClose }}
      />
    </div>
  );
};

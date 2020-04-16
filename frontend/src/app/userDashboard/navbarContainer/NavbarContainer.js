import React, { useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  MobileMenu,
  Navbar,
  ProfileMenu,
  MenuContainer,
  NotificationsMenu,
} from "./navbar";
import { navbarStyles } from "./navbarStyles";
import { useMenu } from "../../../hooks";

export const NavbarContainer = ({ user, setUser, setPageSelected }) => {
  // ALEX TESTING
  // use for testing notifications
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

  const [profileMenu] = useMenu("profile", {
    name: user.name,
    email: user.email,
  });

  const [notificationsMenu] = useMenu("profile", {
    notifications: user.notifications,
  });

  const [mobileMenu] = useMenu("profile", {
    notificationsMenuOpen: notificationsMenu.open,
    profileMenuOpen: profileMenu.open,
    notificationsCount: user.notifications?.length,
  });

  const classes = makeStyles((theme) => navbarStyles(theme, fade))();

  const handleAllMenuClose = (action) => {
    switch (action) {
      case "logout":
        setPageSelected("login");
        setUser(null);
        break;
      default:
        break;
    }

    profileMenu.close();
    notificationsMenu.close();
    mobileMenu.close();
  };

  const handleNotificationClick = (bugid) => {
    alert(
      `404: You are trying to open Bug-${bugid}, but the BugDetail Component isn't finished.`
    );
    handleAllMenuClose();
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
      <MenuContainer {...{ ...mobileMenu.containerProps, handleAllMenuClose }}>
        <MobileMenu {...{ ...mobileMenu.menuProps }} />
      </MenuContainer>

      <MenuContainer {...{ ...profileMenu.containerProps, handleAllMenuClose }}>
        <ProfileMenu {...{ ...profileMenu.menuProps, handleAllMenuClose }} />
      </MenuContainer>
      <MenuContainer
        {...{ ...notificationsMenu.containerProps, handleAllMenuClose }}
      >
        <NotificationsMenu
          {...{ ...notificationsMenu.menuProps, handleNotificationClick }}
        />
      </MenuContainer>
    </div>
  );
};

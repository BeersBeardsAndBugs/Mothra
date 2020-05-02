import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import { navbarStyles } from './navbarStyles'
import { useMenu } from '../../../hooks'
import { Navbar } from './navbar'
import { MobileMenu, ProfileMenu, NotificationsMenu } from './menus'

export const NavbarContainer = ({
    user,
    setPageSelected,
    handleVisibleBugChange,
    handleNewBugDialogOpen,
}) => {
    // const [notifications] = useFetch(PATH.NOTIFICATION, [])

    // useEffect(() => {
    //     notifications.getById(user.response.id)
    // }, [])

    const [profileMenu] = useMenu('profile', {
        name: user.response.name,
        email: user.response.email,
        logout: () => {
            setPageSelected('login')
            user.reset()
        },
    })

    const [notificationsMenu] = useMenu('profile', {
        notifications: user.response.notifications,
        handleVisibleBugChange,
    })

    const [mobileMenu] = useMenu('profile', {
        notificationsMenuOpen: notificationsMenu.open,
        profileMenuOpen: profileMenu.open,
        notificationsCount: user.response.notifications?.length,
    })

    const classes = makeStyles((theme) => navbarStyles(theme, fade))()

    const handleAllMenuClose = () => {
        profileMenu.close()
        notificationsMenu.close()
        mobileMenu.close()
    }

    return (
        <div className={`${classes.grow}`}>
            <Navbar
                {...{
                    classes,
                    user,
                    profileMenu,
                    notificationsMenu,
                    mobileMenu,
                    handleNewBugDialogOpen,
                }}
            />
            <MobileMenu {...{ ...mobileMenu.props, handleAllMenuClose }} />
            <ProfileMenu {...{ ...profileMenu.props, handleAllMenuClose }} />
            <NotificationsMenu
                {...{ ...notificationsMenu.props, handleAllMenuClose }}
            />
        </div>
    )
}

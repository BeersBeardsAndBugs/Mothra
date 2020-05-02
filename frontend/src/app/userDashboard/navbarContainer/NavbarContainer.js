import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import { navbarStyles } from './navbarStyles'
import { useMenu, useFetch } from '../../../hooks'
import { Navbar } from './navbar'
import { MobileMenu, ProfileMenu, NotificationsMenu } from './menus'
import { useEffect } from 'react'
import { PATH } from '../../../constants'

export const NavbarContainer = ({
    user,
    setPageSelected,
    handleVisibleBugChange,
    handleNewBugModalOpen,
}) => {
    const [notifications] = useFetch(PATH.NOTIFICATION, [])
    useEffect(() => {
        notifications.getById(user.response.id)
    }, [])

    useEffect(() => {
        const getNotificationTimer = setInterval(() => {
            notifications.getById(user.response.id)
        }, 300000)
        return () => {
            clearInterval(getNotificationTimer)
        }
    })

    const [profileMenu] = useMenu('profile', {
        name: user.response.name,
        email: user.response.email,
        logout: () => {
            setPageSelected('login')
            user.reset()
        },
    })
    const [notificationsMenu] = useMenu('profile', {
        notifications,
        handleVisibleBugChange,
    })

    const [mobileMenu] = useMenu('profile', {
        notificationsMenuOpen: notificationsMenu.open,
        profileMenuOpen: profileMenu.open,
        notificationsCount: notifications?.length,
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
                    handleNewBugModalOpen,
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

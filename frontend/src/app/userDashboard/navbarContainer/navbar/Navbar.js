import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import { Logo } from './logo'
import { Search, Desktop, Mobile } from './sections'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

export const Navbar = ({
    classes,
    user,
    profileMenu,
    notificationsMenu,
    mobileMenu,
    handleNewBugModalOpen,
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
                <Typography className={classes.logo} variant="h5" noWrap>
                    <Logo />
                </Typography>
                <Typography className={classes.logoSmall} variant="h5" noWrap>
                    {`};{`}
                </Typography>
                <Search {...{ classes }} />
                <div className={classes.grow} />
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                    onClick={handleNewBugModalOpen}
                >
                    Create Bug
                </Button>
                <div className={classes.grow} />
                <Desktop
                    {...{
                        classes,
                        messages: user.messages,
                        notifications: user.notifications,
                        profileMenu,
                        notificationsMenu,
                    }}
                />
                <Mobile {...{ classes, mobileMenu }} />
            </Toolbar>
        </AppBar>
    )
}

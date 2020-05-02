import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import Menu from '@material-ui/core/Menu'

export const ProfileMenu = ({
    name,
    email,
    logout,
    handleAllMenuClose,
    anchorEl,
    menuId,
    isMenuOpen,
}) => {
    const handleLogOut = () => {
        handleAllMenuClose()
        logout()
    }
    console.log(
        'UserMessage',
        'findDomNode warning discussion can be found at https://github.com/mui-org/material-ui/issues/13394'
    )
    return (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleAllMenuClose}
        >
            <MenuItem>{name}</MenuItem>
            <MenuItem>{email}</MenuItem>
            <Divider />
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
    )
}

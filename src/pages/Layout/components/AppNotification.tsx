import React from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';

const AppNotification = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const openNot = Boolean(anchorEl);


    return (
        <div>
            <IconButton color="inherit"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}>
                <Badge badgeContent={4} color="secondary" >
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={openNot}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
    </div>
    )
}

export default AppNotification;
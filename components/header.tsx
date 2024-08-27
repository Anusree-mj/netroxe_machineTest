'use client'
import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const Header = () => {
    const router = useRouter()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = async () => {
        try {
            handleClose();
            Cookies.remove('netroxeCookie', { path: '/' });
            localStorage.removeItem('userData');
            router.push('/');
        } catch (error) {
            toast.error('Logout Failed');
        }
    };
    return (
        <Box sx={{
            background: 'linear-gradient(to right, #3d3f42, #212226)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            maxWidth: "100%", p: 2,
            boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        }}>
            <Typography>Dashboard</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleMenuClick} sx={{ p: 0 }}>
                    <Avatar src="/profile.jpg" alt="Profile Image" sx={{ width: 35, height: 35 }} />
                    <ArrowDropDownIcon sx={{ color: 'white', ml: 1 }} />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Box>

        </Box>
    )
}

export default Header
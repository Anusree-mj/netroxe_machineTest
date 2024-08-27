'use client'
import { Box, Typography } from "@mui/material"
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import FilterVintageOutlinedIcon from '@mui/icons-material/FilterVintageOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import FormatAlignCenterOutlinedIcon from '@mui/icons-material/FormatAlignCenterOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import Divider from '@mui/material/Divider';
import CircleIcon from '@mui/icons-material/Circle';
import { useState } from "react";

const SideBar = () => {
    const [selectedItem, setSelectedItem] = useState('Dashboard')

    const menuItems = [
        { id: 'Dashboard', icon: <PieChartOutlineOutlinedIcon sx={{ color: 'white' }} />, label: 'Dashboard' },
        { id: 'Icons', icon: <FilterVintageOutlinedIcon sx={{ color: 'white' }} />, label: 'Icons' },
        { id: 'Maps', icon: <PushPinOutlinedIcon sx={{ transform: 'rotate(70deg)', color: 'white' }} />, label: 'Maps' },
        { id: 'Notifications', icon: <NotificationsNoneOutlinedIcon sx={{ color: 'white' }} />, label: 'Notifications' },
        { id: 'User Profile', icon: <PermIdentityOutlinedIcon sx={{ color: 'white' }} />, label: 'User Profile' },
        { id: 'Table List', icon: <BeachAccessOutlinedIcon sx={{ color: 'white' }} />, label: 'Table List' },
        { id: 'Typography', icon: <FormatAlignCenterOutlinedIcon sx={{ color: 'white' }} />, label: 'Typography' },
        { id: 'RTL Support', icon: <PublicOutlinedIcon sx={{ color: 'white' }} />, label: 'RTL Support' }
    ];

    return (
        <Box sx={{
            mt: 1,
            background: 'linear-gradient(to right, #f792f0,#cf46c8)',
            display: 'flex', flexDirection: 'column', p: 2,
            width: '15rem', maxWidth: '70%', minHeight: '100vh'
        }}>
            <Box sx={{
                display: 'flex', mb: 3,
                gap: 2, alignItems: 'center',
                width: '20rem', maxWidth: '80%'
            }}>
                <Typography sx={{
                    color: 'white',
                    fontWeight: '600'
                }}>CT</Typography>
                <Typography sx={{
                    color: 'white',
                    fontWeight: '600'
                }}>CREATIVE TIM</Typography>
            </Box>
            <Divider sx={{ mb: 3, backgroundColor: 'white' }} />
            {menuItems.map((item) => (
                <Box key={item.id} sx={{
                    display: 'flex', mb: 3, cursor: 'pointer',
                    width: '20rem', maxWidth: '80%'
                }}>
                    <CircleIcon sx={{
                        mr: 2, color: 'white',
                        visibility: selectedItem === item.label ? 'visible' : 'hidden',
                        width: '0.7rem'
                    }} />
                    <Box sx={{
                        display: 'flex', gap: 1,
                        alignItems: 'center',
                        maxWidth: '100%'
                    }} onClick={() => {
                        setSelectedItem(item.label)
                    }}>
                        {item.icon}
                        <Typography sx={{
                            color: 'white',
                            fontWeight: '600'
                        }}>{item.label}</Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default SideBar
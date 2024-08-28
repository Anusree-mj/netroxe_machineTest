'use client';

import { Box, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import SideBar from '@/components/sideBar';
import { UserProvider } from '@/helpers/userContext';
import AddToDo from '@/components/addToDo';
import TodoManagement from '@/components/todoManagement';

const Page = () => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    return (
        <UserProvider>
            <Box sx={{ background: 'linear-gradient(to right, #3d3f42, #212226)' }}>
                <Header />
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap-reverse',
                        gap: 3, alignItems: 'flex-end',
                        maxWidth: '100%',
                    }}
                >
                    <SideBar />
                    <Box sx={{ width: isSmallScreen ? '100%' : 'auto' }}>
                        <AddToDo />
                        <TodoManagement />
                    </Box>
                </Box>
            </Box>
        </UserProvider>
    );
};

export default Page;

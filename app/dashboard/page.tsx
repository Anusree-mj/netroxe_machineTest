'use client';

import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import SideBar from '@/components/sideBar';
import { UserProvider } from '@/helpers/userContext';
import AddToDo from '@/components/addToDo';
import TodoManagement from '@/components/todoManagement';

const Page = () => {

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
                    <Box>
                        <AddToDo />
                        <TodoManagement />
                    </Box>
                </Box>
            </Box>
        </UserProvider>
    );
};

export default Page;

'use client';

import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import SideBar from '@/components/sideBar';
import MainComponent from '@/components/mainComponent/mainComponent';
import { UserProvider } from '@/helpers/userContext';

const Page = () => {
    const router = useRouter();

    return (
        <UserProvider>
            <Box sx={{ background: 'linear-gradient(to right, #3d3f42, #212226)' }}>
                <Header />
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap-reverse',
                        gap: 3,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        maxWidth: '100%',
                        border: '1px solid grey',
                    }}
                >
                    <SideBar />
                    <MainComponent />
                </Box>
            </Box>
        </UserProvider>
    );
};

export default Page;

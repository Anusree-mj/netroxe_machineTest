import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface UserContextType {
    userId: string | null;
    setUserId: (id: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (!userData) {
            router.push('/');
        } else {
            try {
                const parsedData = JSON.parse(userData);
                const id = parsedData.id;
                setUserId(id);
            } catch (error) {
                console.error('Failed to parse user data', error);
                router.push('/');
            }
        }
    }, [router]);

    return (
        <UserContext.Provider value={{ userId, setUserId }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };

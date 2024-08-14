import React, { useEffect, ReactNode } from 'react';
import { useStorageState } from './useStorageState';
// import { fetchFromAPI, postToAPI } from './api';

// Define types for session and AuthContext
interface User {
    id: number;
    name: string;
    accessToken: string;
}

interface AuthContextType {
    signIn: (values: any) => Promise<boolean>;
    signOut: () => Promise<void>;
    signUp: (values: any) => Promise<any>;
    refreshUser: () => Promise<void>;
    session: User | null;
    isLoading: boolean;
}

// Define the default values for the AuthContext
const defaultAuthContext: AuthContextType = {
    signIn: async () => false,
    signOut: async () => {},
    signUp: async () => ({}),
    refreshUser: async () => {},
    session: null,
    isLoading: false,
};

const AuthContext = React.createContext<AuthContextType>(defaultAuthContext);

export function useSession() {
    const value = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be wrapped in a <SessionProvider />');
        }
    }

    return value;
}

interface SessionProviderProps {
    children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
    const [[isLoading, session], setStorageState] = useStorageState<User | null>("session");

    async function signIn(values: any): Promise<boolean> {
        // const data = await postToAPI("users/login/", values);

        // if (data.success) {
        //     await setStorageState(data.user);
        // }

        return true; // data.success;
    }

    async function signUp(values: any): Promise<any> {
        // const data = await postToAPI("users/", values);

        // if (data?.success) {
        //     console.log(data.user);
        //     await setStorageState(data.user);
        // }

        return true;// data;
    }

    async function signOut(): Promise<void> {
        // await setStorageState(null);
    }

    async function refreshUser(): Promise<void> {
        // const res = await fetchFromAPI('users/');
        // await setStorageState(res.user);
    }

    useEffect(() => {
        if (session) {
            console.log("[👤] ", Object.keys(session));
        }
    }, [session]);

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                signUp,
                refreshUser,
                session,
                isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

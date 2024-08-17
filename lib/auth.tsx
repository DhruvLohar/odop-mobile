import React, { useEffect, ReactNode } from 'react';
import { useStorageState } from './useStorageState';
import { fetchFromAPI, postToAPI } from './api';

// Define types for session and AuthContext
interface User {
    id: number;
    role: string;
    name: string;
    email: string;
    phone_number: string;
    profile_image: string;
    accessToken: string;
}

interface AuthContextType {

    getOTP: (id: number, type: string | undefined) => Promise<boolean>;
    verifyOTP: (id: number, type: string | undefined, otp: number, saveDetails: boolean) => Promise<boolean>;

    artisanLogin: (values: any) => Promise<boolean>;
    userLogin: (values: any) => Promise<boolean>;
    
    logOut: () => Promise<void>;

    registerArtisan: (values: any) => Promise<any>;
    refreshUser: () => Promise<void>;
    session: User | null;
    isLoading: boolean;
}

// Define the default values for the AuthContext
const defaultAuthContext: AuthContextType = {
    artisanLogin: async () => false,
    userLogin: async () => false,

    getOTP: async () => false,
    verifyOTP: async () => false,

    logOut: async () => {},

    registerArtisan: async () => ({}),
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

    async function getOTP(id: number, type: string | undefined) {
        const data = await fetchFromAPI(`${type}/${id}/getOTPOnEmail/`);

        return data.success;
    }

    async function verifyOTP(id: number, type: string | undefined, otp: number, saveDetails=true) {
        const data = await postToAPI(`${type}/${id}/verifyOTPOnEmail/`, {
            otp,
        });

        if (data?.user && saveDetails) {
            await setStorageState(data.user);
        }

        if (data?.artisan && saveDetails) {
            await setStorageState(data.artisan);
        }

        return data?.success;
    }

    async function artisanLogin(values: any): Promise<boolean> {
        const data = await postToAPI("artisan/signUpSignIn/", values);

        console.log(data)
        if (data?.success && data?.verified) {
            // await setStorageState(data.user);
            console.log(data?.user)
        } else {
            console.log("not verified")
        }

        return data;
    }

    async function userLogin(values: any): Promise<boolean> {
        const data = await postToAPI("user/signUpSignIn/", values);

        console.log(data)
        if (data?.success && data?.verified) {
            // await setStorageState(data.user);
            console.log(data?.user)
        } else {
            console.log("not verified")
        }
    
        return data
    }

    async function registerArtisan(values: any): Promise<any> {
        // const data = await postToAPI("user/signUpSignIn/", values);

        // console.log(data)
        // if (data?.success && data?.verified) {
        //     // await setStorageState(data.user);
        //     console.log(data?.user)
        // } else {
        //     console.log("not verified")
        // }
    
        // return data.success
    }

    async function logOut(): Promise<void> {
        await setStorageState(null);
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
                getOTP,
                verifyOTP,
                
                registerArtisan,
                
                artisanLogin,
                userLogin,
                
                refreshUser,
                logOut,
                session,
                isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
}

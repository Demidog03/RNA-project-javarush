import {createContext, useContext} from "react";

interface AuthContextType {
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthContext');
    }
    return context;
}

export const useIsSignedIn = () => {
    const { isAuthenticated } = useAuth()

    return isAuthenticated
};
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

const AUTH_KEY = "itsoftlab360_authenticated";

const VALID_USERNAME = "rahul.ahirwal";
const VALID_PASSWORD = "rahul.ahirwal";

type AuthContextType = {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (
        username: string,
        password: string
    ) => Promise<{
        success: boolean;
        message: string;
    }>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    /**
     * Check whether the user was previously authenticated.
     */
    useEffect(() => {
        const loadAuthentication = async () => {
            try {
                const authenticated = await SecureStore.getItemAsync(AUTH_KEY);

                setIsAuthenticated(authenticated === "true");
            } catch (error) {
                console.error(
                    "Failed to load authentication state:",
                    error
                );

                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        loadAuthentication();
    }, []);

    /**
     * Hard-coded login.
     */
    const login = useCallback(
        async (username: string, password: string) => {
            const cleanUsername = username.trim();

            if (!cleanUsername || !password) {
                return {
                    success: false,
                    message: "Please enter username and password.",
                };
            }

            if (
                cleanUsername !== VALID_USERNAME ||
                password !== VALID_PASSWORD
            ) {
                return {
                    success: false,
                    message: "Invalid username or password.",
                };
            }

            try {
                await SecureStore.setItemAsync(
                    AUTH_KEY,
                    "true"
                );

                setIsAuthenticated(true);
                router.replace("/");


                return {
                    success: true,
                    message: "Login successful.",
                };
            } catch (error) {
                console.error("Login storage error:", error);

                return {
                    success: false,
                    message: "Unable to save login session.",
                };
            }
        },
        [router]
    );

    /**
     * Logout and remove local authentication.
     */
    const logout = useCallback(async () => {
        try {
            await SecureStore.deleteItemAsync(AUTH_KEY);
            router.replace("/login");
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Logout error:", error);

            setIsAuthenticated(false);
        }
    }, [router]);

    const value = useMemo(
        () => ({
            isAuthenticated,
            isLoading,
            login,
            logout,
        }),
        [isAuthenticated, isLoading, login, logout]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}

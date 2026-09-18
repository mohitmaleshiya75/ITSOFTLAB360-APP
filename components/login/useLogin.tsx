import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Platform } from "react-native";

const AUTH_KEY = "itsoftlab360_authenticated";

const VALID_USERNAMES = ["rahul.ahirwal", "rahul.ahirwal@itsoftlab.com"];
const VALID_PASSWORDS = ["rahul.ahirwal", "rahul.ahirwal"];

export type UserProfile = {
    name: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    designation: string;
    department: string;
    employeeId: string;
    phone: string;
    location: string;
    role: string;
};

export const DEFAULT_USER: UserProfile = {
    name: "Rahul Ahirwal",
    firstName: "Rahul",
    lastName: "Ahirwal",
    username: "rahul.ahirwal",
    email: "rahul.ahirwal@itsoftlab.com",
    designation: "Chief Technology Officer",
    department: "Technology & Enterprise Architecture",
    employeeId: "ITSL-001",
    phone: "+91 98765 43210",
    location: "Indore, Madhya Pradesh, India",
    role: "System Super Administrator",
};

async function getStorageItem(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
        try {
            if (typeof window !== "undefined" && window.localStorage) {
                return window.localStorage.getItem(key);
            }
        } catch (e) {
            console.warn("Web localStorage read error:", e);
        }
        return null;
    }
    try {
        return await SecureStore.getItemAsync(key);
    } catch (e) {
        console.warn("SecureStore read error:", e);
        return null;
    }
}

async function setStorageItem(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
        try {
            if (typeof window !== "undefined" && window.localStorage) {
                window.localStorage.setItem(key, value);
            }
        } catch (e) {
            console.warn("Web localStorage write error:", e);
        }
        return;
    }
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (e) {
        console.warn("SecureStore write error:", e);
    }
}

async function removeStorageItem(key: string): Promise<void> {
    if (Platform.OS === "web") {
        try {
            if (typeof window !== "undefined" && window.localStorage) {
                window.localStorage.removeItem(key);
            }
        } catch (e) {
            console.warn("Web localStorage remove error:", e);
        }
        return;
    }
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (e) {
        console.warn("SecureStore delete error:", e);
    }
}

type AuthContextType = {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: UserProfile;
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
    const [user] = useState<UserProfile>(DEFAULT_USER);

    /**
     * Check whether the user was previously authenticated.
     */
    useEffect(() => {
        let mounted = true;
        const loadAuthentication = async () => {
            try {
                const authenticated = await getStorageItem(AUTH_KEY);
                if (mounted) {
                    setIsAuthenticated(authenticated === "true");
                }
            } catch (error) {
                console.error("Failed to load authentication state:", error);
                if (mounted) {
                    setIsAuthenticated(false);
                }
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        loadAuthentication();
        return () => {
            mounted = false;
        };
    }, []);

    /**
     * Login with simulated 2-second API authentication roundtrip.
     */
    const login = useCallback(
        async (username: string, password: string) => {
            const cleanUsername = username.trim().toLowerCase();
            const cleanPassword = password.trim();

            if (!cleanUsername || !cleanPassword) {
                return {
                    success: false,
                    message: "Please enter your username and password.",
                };
            }

            // Simulate realistic 2-second enterprise API verification
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const isUsernameValid = VALID_USERNAMES.includes(cleanUsername);
            const isPasswordValid = VALID_PASSWORDS.includes(cleanPassword.toLowerCase());

            if (!isUsernameValid || !isPasswordValid) {
                return {
                    success: false,
                    message: "Invalid credentials.",
                };
            }

            try {
                await setStorageItem(AUTH_KEY, "true");
                setIsAuthenticated(true);
                // Safe deferred navigation to home
                setTimeout(() => {
                    try {
                        router.replace("/(tabs)");
                    } catch {
                        // Protected Stack will handle transition
                    }
                }, 50);

                return {
                    success: true,
                    message: "Welcome back, Rahul Ahirwal!",
                };
            } catch (error) {
                console.error("Login storage error:", error);
                return {
                    success: false,
                    message: "Unable to save login session. Please try again.",
                };
            }
        },
        [router]
    );

    /**
     * Logout and wipe local authentication session completely.
     */
    const logout = useCallback(async () => {
        try {
            await removeStorageItem(AUTH_KEY);
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setIsAuthenticated(false);
            setTimeout(() => {
                try {
                    router.replace("/login");
                } catch {
                    // Protected Stack will handle transition
                }
            }, 50);
        }
    }, [router]);

    const value = useMemo(
        () => ({
            isAuthenticated,
            isLoading,
            user,
            login,
            logout,
        }),
        [isAuthenticated, isLoading, user, login, logout]
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

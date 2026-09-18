import React, { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { LogOut } from "lucide-react-native";
import { useAuth } from "./useLogin";

export default function LogoutButton() {
    const { logout } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handlePress = async () => {
        if (isLoggingOut) return;
        setIsLoggingOut(true);
        try {
            await logout();
        } catch (error) {
            console.error(error);
            setIsLoggingOut(false);
        }
    };

    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                pressed && !isLoggingOut && styles.buttonPressed,
                isLoggingOut && styles.buttonDisabled,
            ]}
            onPress={handlePress}
            disabled={isLoggingOut}
        >
            {isLoggingOut ? (
                <View style={styles.content}>
                    <ActivityIndicator size="small" color="#FFFFFF" />
                    <Text style={styles.text}>Signing Out...</Text>
                </View>
            ) : (
                <View style={styles.content}>
                    <LogOut size={18} color="#FFFFFF" />
                    <Text style={styles.text}>Sign Out of ITSOFTLAB360</Text>
                </View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 18,
        marginBottom: 10,
        backgroundColor: "#DC2626",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#DC2626",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 3,
    },
    buttonPressed: {
        backgroundColor: "#B91C1C",
        transform: [{ scale: 0.99 }],
    },
    buttonDisabled: {
        backgroundColor: "#F87171",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    text: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
        letterSpacing: 0.2,
    },
});

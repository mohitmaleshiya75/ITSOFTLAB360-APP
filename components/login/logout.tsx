import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useAuth } from "./useLogin";

export default function LogoutButton() {
    const { logout } = useAuth()
    return (
        <Pressable style={styles.button} onPress={logout}>
            <Text style={styles.text}>Logout</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop:10,
        backgroundColor: "#DC2626",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});

import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { useAuth } from "@/components/login/useLogin";

export default function LoginScreen() {
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // ==========================================================
    // LOGIN
    // ==========================================================

    const handleLogin = async () => {
        setErrorMessage("");

        if (!username.trim()) {
            setErrorMessage("Please enter your username.");
            return;
        }

        if (!password) {
            setErrorMessage("Please enter your password.");
            return;
        }

        try {
            setLoading(true);
            if(username!=="rahul.ahirwal"||password!=="rahul.ahirwal"){
                setErrorMessage("Invalid username or password.");
            }

            const success = await login(username, password);

            if (!success) {
                setErrorMessage("Invalid username or password.");
                return;
            }

            // Login successful
        } catch (error) {
            console.error(error);
            setErrorMessage("Unable to login. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#f5f8ff"
            />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* ====================================================
            BRANDING
        ==================================================== */}

                <View style={styles.brandSection}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={require("./assets/images/icon.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>

                    <Text style={styles.brandTitle}>
                        ITSOFTLAB360
                    </Text>

                    <Text style={styles.brandSubtitle}>
                        Smart Business Management
                    </Text>
                </View>

                {/* ====================================================
            LOGIN CARD
        ==================================================== */}

                <View style={styles.loginCard}>

                    <View style={styles.welcomeSection}>
                        <Text style={styles.welcomeTitle}>
                            Welcome Back
                        </Text>

                        <Text style={styles.welcomeSubtitle}>
                            Sign in to continue to your ITSOFTLAB360 dashboard
                        </Text>
                    </View>

                    {/* ==================================================
              USERNAME
          ================================================== */}

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>
                            Username
                        </Text>

                        <View
                            style={[
                                styles.inputContainer,
                                errorMessage ? styles.inputErrorBorder : null,
                            ]}
                        >
                            <Ionicons
                                name="person-outline"
                                size={20}
                                color="#64748b"
                            />

                            <TextInput
                                value={username}
                                onChangeText={(text) => {
                                    setUsername(text);
                                    setErrorMessage("");
                                }}
                                placeholder="Enter username"
                                placeholderTextColor="#94a3b8"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="default"
                                style={styles.input}
                                editable={!loading}
                                returnKeyType="next"
                            />
                        </View>
                    </View>

                    {/* ==================================================
              PASSWORD
          ================================================== */}

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>
                            Password
                        </Text>

                        <View
                            style={[
                                styles.inputContainer,
                                errorMessage ? styles.inputErrorBorder : null,
                            ]}
                        >
                            <Ionicons
                                name="lock-closed-outline"
                                size={20}
                                color="#64748b"
                            />

                            <TextInput
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setErrorMessage("");
                                }}
                                placeholder="Enter password"
                                placeholderTextColor="#94a3b8"
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                                editable={!loading}
                                returnKeyType="done"
                                onSubmitEditing={handleLogin}
                            />

                            <Pressable
                                onPress={() =>
                                    setShowPassword((previous) => !previous)
                                }
                                hitSlop={10}
                            >
                                <Ionicons
                                    name={
                                        showPassword
                                            ? "eye-outline"
                                            : "eye-off-outline"
                                    }
                                    size={21}
                                    color="#64748b"
                                />
                            </Pressable>
                        </View>
                    </View>

                    {/* ==================================================
              ERROR
          ================================================== */}

                    {errorMessage ? (
                        <View style={styles.errorContainer}>
                            <Ionicons
                                name="alert-circle-outline"
                                size={18}
                                color="#dc2626"
                            />

                            <Text style={styles.errorText}>
                                {errorMessage}
                            </Text>
                        </View>
                    ) : null}

                    {/* ==================================================
              LOGIN BUTTON
          ================================================== */}

                    <Pressable
                        onPress={handleLogin}
                        disabled={loading}
                        style={({ pressed }) => [
                            styles.loginButton,
                            pressed && !loading
                                ? styles.loginButtonPressed
                                : null,
                            loading ? styles.loginButtonDisabled : null,
                        ]}
                    >
                        {loading ? (
                            <ActivityIndicator
                                size="small"
                                color="#ffffff"
                            />
                        ) : (
                            <>
                                <Text style={styles.loginButtonText}>
                                    Sign In
                                </Text>

                                <Ionicons
                                    name="arrow-forward"
                                    size={20}
                                    color="#ffffff"
                                />
                            </>
                        )}
                    </Pressable>

                    {/* ==================================================
              SECURITY MESSAGE
          ================================================== */}

                    <View style={styles.securityInfo}>
                        <Ionicons
                            name="shield-checkmark-outline"
                            size={18}
                            color="#2563eb"
                        />

                        <Text style={styles.securityText}>
                            Authorized access only
                        </Text>
                    </View>

                </View>

                {/* ====================================================
            FOOTER
        ==================================================== */}

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        ITSOFTLAB360
                    </Text>

                    <Text style={styles.footerVersion}>
                        Secure Business Management Platform
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f8ff",
    },

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 22,
        paddingTop: 55,
        paddingBottom: 30,
    },

    // ----------------------------------------------------------
    // BRAND
    // ----------------------------------------------------------

    brandSection: {
        alignItems: "center",
        marginBottom: 28,
    },

    logoContainer: {
        width: 86,
        height: 86,
        borderRadius: 22,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 14,

        shadowColor: "#0f172a",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.08,
        shadowRadius: 12,

        elevation: 4,
    },

    logo: {
        width: 68,
        height: 68,
    },

    brandTitle: {
        fontSize: 24,
        fontWeight: "900",
        color: "#0f2a70",
        letterSpacing: 0.5,
    },

    brandSubtitle: {
        marginTop: 5,
        fontSize: 13,
        color: "#64748b",
        fontWeight: "500",
    },

    // ----------------------------------------------------------
    // CARD
    // ----------------------------------------------------------

    loginCard: {
        backgroundColor: "#ffffff",
        borderRadius: 24,
        padding: 22,

        shadowColor: "#0f172a",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.08,
        shadowRadius: 20,

        elevation: 5,
    },

    welcomeSection: {
        marginBottom: 26,
    },

    welcomeTitle: {
        fontSize: 27,
        fontWeight: "800",
        color: "#0f172a",
    },

    welcomeSubtitle: {
        fontSize: 13,
        lineHeight: 20,
        color: "#64748b",
        marginTop: 7,
    },

    // ----------------------------------------------------------
    // INPUT
    // ----------------------------------------------------------

    inputGroup: {
        marginBottom: 18,
    },

    inputLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#334155",
        marginBottom: 8,
    },

    inputContainer: {
        height: 54,
        borderWidth: 1,
        borderColor: "#dbe3ef",
        backgroundColor: "#f8fafc",
        borderRadius: 13,

        flexDirection: "row",
        alignItems: "center",

        paddingHorizontal: 15,
        gap: 11,
    },

    inputErrorBorder: {
        borderColor: "#ef4444",
    },

    input: {
        flex: 1,
        height: "100%",
        color: "#0f172a",
        fontSize: 14,
        fontWeight: "500",
    },

    // ----------------------------------------------------------
    // ERROR
    // ----------------------------------------------------------

    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,

        backgroundColor: "#fef2f2",
        borderRadius: 10,

        paddingHorizontal: 12,
        paddingVertical: 10,

        marginBottom: 16,
    },

    errorText: {
        flex: 1,
        color: "#dc2626",
        fontSize: 12,
        fontWeight: "600",
    },

    // ----------------------------------------------------------
    // BUTTON
    // ----------------------------------------------------------

    loginButton: {
        height: 55,
        borderRadius: 13,

        backgroundColor: "#155eef",

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        gap: 10,

        shadowColor: "#155eef",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,

        elevation: 4,
    },

    loginButtonPressed: {
        opacity: 0.85,
        transform: [{ scale: 0.99 }],
    },

    loginButtonDisabled: {
        opacity: 0.7,
    },

    loginButtonText: {
        color: "#ffffff",
        fontSize: 15,
        fontWeight: "800",
    },

    // ----------------------------------------------------------
    // SECURITY
    // ----------------------------------------------------------

    securityInfo: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",

        gap: 7,

        marginTop: 20,
    },

    securityText: {
        fontSize: 11,
        color: "#64748b",
        fontWeight: "600",
    },

    // ----------------------------------------------------------
    // FOOTER
    // ----------------------------------------------------------

    footer: {
        alignItems: "center",
        marginTop: 30,
    },

    footerText: {
        fontSize: 12,
        fontWeight: "800",
        color: "#64748b",
    },

    footerVersion: {
        marginTop: 4,
        fontSize: 10,
        color: "#94a3b8",
    },
});
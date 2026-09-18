import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
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
import { User, Lock, Wifi } from "lucide-react-native";

import { useAuth } from "@/components/login/useLogin";

export default function LoginScreen() {
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const passwordInputRef = useRef<TextInput>(null);

    // ==========================================================
    // DEMO AUTO-FILL
    // ==========================================================
    // const handleQuickFill = () => {
    //     setUsername("rahul.ahirwal");
    //     setPassword("rahul.ahirwal");
    //     setErrorMessage("");
    // };

    // ==========================================================
    // LOGIN HANDLER
    // ==========================================================
    const handleLogin = async () => {
        setErrorMessage("");

        const cleanUser = username.trim();
        const cleanPass = password.trim();

        if (!cleanUser) {
            setErrorMessage("Please enter your username.");
            return;
        }

        if (!cleanPass) {
            setErrorMessage("Please enter your password.");
            return;
        }

        try {
            setLoading(true);
            const res = await login(cleanUser, cleanPass);

            if (!res.success) {
                setErrorMessage(res.message);
                return;
            }

            // Success handled by router in useLogin & Stack.Protected
        } catch (error) {
            console.error(error);
            setErrorMessage("Unable to connect to authentication server. Please try again.");
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
                backgroundColor="#f8faff"
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
                            source={require("../assets/images/icon.png")}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>

                    <Text style={styles.brandTitle}>ITSOFTLAB360</Text>
                    <Text style={styles.brandSubtitle}>
                        Unified Enterprise Business Platform
                    </Text>
                </View>

                {/* ====================================================
                    LOGIN CARD
                ==================================================== */}
                <View style={styles.loginCard}>
                    <View style={styles.welcomeSection}>
                        <Text style={styles.welcomeTitle}>Welcome Back</Text>
                        <Text style={styles.welcomeSubtitle}>
                            Sign in to access your ITSOFTLAB360 enterprise apps
                        </Text>
                    </View>

                    {/* Quick Fill Demo Helper Chip */}
                    {/* <Pressable
                        onPress={handleQuickFill}
                        style={({ pressed }) => [
                            styles.demoChip,
                            pressed && styles.demoChipPressed,
                        ]}
                    >
                        <Sparkles size={14} color="#2563EB" />
                        <Text style={styles.demoChipText}>
                            Quick Fill
                        </Text>
                    </Pressable> */}

                    {/* ==================================================
                        USERNAME INPUT
                    ================================================== */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Username / Email</Text>

                        <View
                            style={[
                                styles.inputContainer,
                                errorMessage ? styles.inputErrorBorder : null,
                            ]}
                        >
                            <User size={18} color="#64748B" />

                            <TextInput
                                value={username}
                                onChangeText={(text) => {
                                    setUsername(text);
                                    setErrorMessage("");
                                }}
                                placeholder="john.doe"
                                placeholderTextColor="#94A3B8"
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="default"
                                style={styles.input}
                                editable={!loading}
                                returnKeyType="next"
                                onSubmitEditing={() => passwordInputRef.current?.focus()}
                            />
                        </View>
                    </View>

                    {/* ==================================================
                        PASSWORD INPUT
                    ================================================== */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Password</Text>

                        <View
                            style={[
                                styles.inputContainer,
                                errorMessage ? styles.inputErrorBorder : null,
                            ]}
                        >
                            <Lock size={18} color="#64748B" />

                            <TextInput
                                ref={passwordInputRef}
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setErrorMessage("");
                                }}
                                placeholder="••••••••••••"
                                placeholderTextColor="#94A3B8"
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                                editable={!loading}
                                returnKeyType="done"
                                onSubmitEditing={handleLogin}
                            />

                            <Pressable
                                onPress={() => setShowPassword((prev) => !prev)}
                                hitSlop={10}
                            >
                                <Ionicons
                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                    size={20}
                                    color="#64748B"
                                />
                            </Pressable>
                        </View>
                    </View>

                    {/* ==================================================
                        ERROR MESSAGE
                    ================================================== */}
                    {errorMessage ? (
                        <View style={styles.errorContainer}>
                            <Ionicons
                                name="alert-circle-outline"
                                size={18}
                                color="#DC2626"
                            />
                            <Text style={styles.errorText}>{errorMessage}</Text>
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
                            pressed && !loading ? styles.loginButtonPressed : null,
                            loading ? styles.loginButtonDisabled : null,
                        ]}
                    >
                        {loading ? (
                            <View style={styles.loadingRow}>
                                <ActivityIndicator size="small" color="#FFFFFF" />
                                <Text style={styles.loginButtonText}>
                                    Authenticating ...
                                </Text>
                            </View>
                        ) : (
                            <>
                                <Text style={styles.loginButtonText}>Sign In</Text>
                                <Ionicons
                                    name="arrow-forward"
                                    size={19}
                                    color="#FFFFFF"
                                />
                            </>
                        )}
                    </Pressable>

                    {/* Live Server Telemetry Feedback during Loading */}
                    {loading && (
                        <View style={styles.liveFeedback}>
                            <Wifi size={13} color="#2563EB" />
                            <Text style={styles.liveFeedbackText}>
                                Connecting to ITSOFTLAB Authentication Gateway...
                            </Text>
                        </View>
                    )}

                    {/* ==================================================
                        SECURITY INFO
                    ================================================== */}
                    {/* <View style={styles.securityInfo}>
                        <ShieldCheck size={16} color="#2563EB" />
                        <Text style={styles.securityText}>
                            Encrypted with TLS 1.3 • Authorized access only
                        </Text>
                    </View> */}
                </View>

                {/* ====================================================
                    FOOTER
                ==================================================== */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>ITSOFTLAB CONSULTANCY SERVICES PVT. LTD.</Text>
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
        backgroundColor: "#F8FAFC",
    },

    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 22,
        paddingTop: 55,
        paddingBottom: 30,
    },

    brandSection: {
        alignItems: "center",
        marginBottom: 24,
    },

    logoContainer: {
        width: 82,
        height: 82,
        borderRadius: 22,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },

    logo: {
        width: 62,
        height: 62,
    },

    brandTitle: {
        fontSize: 24,
        fontWeight: "900",
        color: "#0F172A",
        letterSpacing: 0.5,
    },

    brandSubtitle: {
        marginTop: 4,
        fontSize: 13,
        color: "#64748B",
        fontWeight: "500",
    },

    loginCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 22,
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.07,
        shadowRadius: 20,
        elevation: 5,
        borderWidth: 1,
        borderColor: "#EDF2F7",
    },

    welcomeSection: {
        marginBottom: 16,
    },

    welcomeTitle: {
        fontSize: 24,
        fontWeight: "800",
        color: "#0F172A",
    },

    welcomeSubtitle: {
        fontSize: 13,
        color: "#64748B",
        marginTop: 4,
        lineHeight: 18,
    },

    demoChip: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        backgroundColor: "#EFF6FF",
        borderWidth: 1,
        borderColor: "#BFDBFE",
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 7,
        gap: 6,
        marginBottom: 20,
    },

    demoChipPressed: {
        backgroundColor: "#DBEAFE",
    },

    demoChipText: {
        fontSize: 12,
        color: "#1D4ED8",
        fontWeight: "700",
    },

    inputGroup: {
        marginBottom: 16,
    },

    inputLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#334155",
        marginBottom: 7,
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        borderWidth: 1.5,
        borderColor: "#E2E8F0",
        borderRadius: 14,
        paddingHorizontal: 14,
        height: 52,
        gap: 10,
    },

    inputErrorBorder: {
        borderColor: "#EF4444",
        backgroundColor: "#FEF2F2",
    },

    input: {
        flex: 1,
        fontSize: 15,
        color: "#0F172A",
        fontWeight: "500",
    },

    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FEF2F2",
        borderWidth: 1,
        borderColor: "#FECACA",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 8,
        marginBottom: 16,
    },

    errorText: {
        fontSize: 13,
        color: "#DC2626",
        fontWeight: "600",
        flex: 1,
    },

    loginButton: {
        backgroundColor: "#2563EB",
        borderRadius: 14,
        height: 52,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginTop: 6,
        shadowColor: "#2563EB",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 3,
    },

    loginButtonPressed: {
        backgroundColor: "#1D4ED8",
        transform: [{ scale: 0.99 }],
    },

    loginButtonDisabled: {
        backgroundColor: "#93C5FD",
        shadowOpacity: 0.1,
    },

    loginButtonText: {
        color: "#FFFFFF",
        fontSize: 15,
        fontWeight: "700",
        letterSpacing: 0.3,
    },

    loadingRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    liveFeedback: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        marginTop: 12,
    },

    liveFeedbackText: {
        fontSize: 11,
        color: "#2563EB",
        fontWeight: "600",
    },

    securityInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        marginTop: 18,
        paddingTop: 14,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
    },

    securityText: {
        fontSize: 11,
        color: "#64748B",
        fontWeight: "500",
    },

    footer: {
        alignItems: "center",
        marginTop: 28,
    },

    footerText: {
        fontSize: 13,
        fontWeight: "700",
        color: "#475569",
    },

    footerVersion: {
        fontSize: 11,
        color: "#94A3B8",
        marginTop: 3,
    },
});

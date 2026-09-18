import { Server } from "lucide-react-native";
import { useEffect, useRef } from "react";
import {
    ActivityIndicator,
    Animated,
    StyleSheet,
    Text,
    View,
} from "react-native";

type ApiDataLoaderProps = {
    title?: string;
    subtitle?: string;
    moduleName?: string;
    accentColor?: string;
};

export default function ApiDataLoader({
    title = "Loading data",
    subtitle = "Connecting securely to ITSOFTLAB360...",
    moduleName,
    accentColor = "#2563EB",
}: ApiDataLoaderProps) {
    const pulseAnim = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        const animation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 900,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0.5,
                    duration: 900,
                    useNativeDriver: true,
                }),
            ])
        );

        animation.start();

        return () => {
            animation.stop();
        };
    }, [pulseAnim]);

    return (
        <View style={styles.container}>
            <View style={styles.content}>

                {/* Brand */}
                <Text style={styles.brand}>
                    ITSOFTLAB<Text style={styles.brandAccent}>360</Text>
                </Text>

                {/* Module */}
                {moduleName ? (
                    <Text style={styles.moduleName}>
                        {moduleName}
                    </Text>
                ) : null}

                {/* Loader */}
                <View style={styles.loaderWrapper}>
                    <Animated.View
                        style={[
                            styles.loaderRing,
                            {
                                borderColor: `${accentColor}20`,
                                transform: [
                                    {
                                        scale: pulseAnim,
                                    },
                                ],
                            },
                        ]}
                    />

                    <View
                        style={[
                            styles.loaderIcon,
                            {
                                backgroundColor: `${accentColor}10`,
                                borderColor: `${accentColor}25`,
                            },
                        ]}
                    >
                        <Server
                            size={24}
                            color={accentColor}
                            strokeWidth={1.8}
                        />
                    </View>

                    {/* <ActivityIndicator
                        size="small"
                        color={accentColor}
                        style={styles.spinner}
                    /> */}
                </View>

                {/* Message */}
                {/* <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.subtitle}>
                    {subtitle}
                </Text> */}

                {/* Status */}
                {/* <View style={styles.statusRow}>
                    <Animated.View
                        style={[
                            styles.statusDot,
                            {
                                backgroundColor: accentColor,
                                opacity: pulseAnim,
                            },
                        ]}
                    />

                    <Text style={styles.statusText}>
                        Establishing connection
                    </Text>
                </View> */}

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },

    content: {
        width: "100%",
        maxWidth: 380,
        alignItems: "center",
    },

    /* Brand */

    brand: {
        fontSize: 17,
        fontWeight: "800",
        color: "#0F172A",
        letterSpacing: 0.3,
        marginBottom: 4,
    },

    brandAccent: {
        color: "#2563EB",
    },

    moduleName: {
        fontSize: 12,
        fontWeight: "600",
        color: "#64748B",
        letterSpacing: 0.3,
        marginBottom: 36,
    },

    /* Loader */

    loaderWrapper: {
        width: 88,
        height: 88,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 28,
    },

    loaderRing: {
        position: "absolute",
        width: 76,
        height: 76,
        borderRadius: 38,
        borderWidth: 2,
    },

    loaderIcon: {
        width: 58,
        height: 58,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
    },

    spinner: {
        position: "absolute",
        bottom: -4,
        right: -2,
    },

    /* Text */

    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#0F172A",
        textAlign: "center",
        letterSpacing: -0.2,
        marginBottom: 7,
    },

    subtitle: {
        maxWidth: 310,
        fontSize: 13,
        lineHeight: 20,
        fontWeight: "400",
        color: "#64748B",
        textAlign: "center",
    },

    /* Status */

    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 22,
        paddingHorizontal: 11,
        paddingVertical: 7,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 7,
    },

    statusText: {
        fontSize: 11,
        fontWeight: "600",
        color: "#64748B",
    },
});
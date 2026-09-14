import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from "react-native";

type SectionCardProps = {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    style?: ViewStyle;
};

export default function SectionCard({
    title,
    subtitle,
    children,
    icon,
    style,
}: SectionCardProps) {
    return (
        <View style={[styles.card, style]}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.title}>
                        {title}
                    </Text>

                    {subtitle ? (
                        <Text style={styles.subtitle}>
                            {subtitle}
                        </Text>
                    ) : null}
                </View>

                {icon ? (
                    <View style={styles.iconContainer}>
                        {icon}
                    </View>
                ) : null}
            </View>

            {/* Content */}
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        marginTop: 14,
        padding: 16,
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#E5E7EB",

        // Android
        elevation: 2,

        // iOS
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 6,
    },

    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 16,
    },

    headerContent: {
        flex: 1,
        paddingRight: 10,
    },

    title: {
        fontSize: 16,
        fontWeight: "800",
        color: "#111827",
    },

    subtitle: {
        marginTop: 4,
        fontSize: 11,
        lineHeight: 16,
        color: "#64748B",
    },

    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E8F7F8",
    },

    content: {
        width: "100%",
    },
});

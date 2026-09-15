import React, { useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import {
    X,
    LayoutGrid,
    Users,
    ShoppingCart,
    Package,
    ClipboardCheck,
    GraduationCap,
    FileText,
    Truck,
    BarChart3,
    BriefcaseBusiness,
    Bot,
    Database,
} from "lucide-react-native";

type Application = {
    id: string;
    name: string;
    shortName: string;
    description: string;
    icon: React.ComponentType<any>;
    color: string;
    background: string;
    route: string;
};

export const APPLICATIONS: Application[] = [
    {
        id: "hrms",
        name: "HRMSM",
        shortName: "HR",
        description: "Human Resource Management",
        icon: Users,
        color: "#2563EB",
        background: "#EFF6FF",
        route: "/hrmsm",
    },
    {
        id: "erp",
        name: "ERP",
        shortName: "ERP",
        description: "Enterprise Resource Planning",
        icon: Database,
        color: "#7C3AED",
        background: "#F5F3FF",
        route: "/erp",
    },
    {
        id: "crm",
        name: "CRM",
        shortName: "CRM",
        description: "Customer Relationship Management",
        icon: Users,
        color: "#0891B2",
        background: "#ECFEFF",
        route: "/crm",
    },
    {
        id: "pos",
        name: "POS",
        shortName: "POS",
        description: "Point of Sale",
        icon: ShoppingCart,
        color: "#EA580C",
        background: "#FFF7ED",
        route: "/pos",
    },
    {
        id: "qms",
        name: "QMS",
        shortName: "QMS",
        description: "Quality Management System",
        icon: ClipboardCheck,
        color: "#059669",
        background: "#ECFDF5",
        route: "/qms",
    },
    {
        id: "ai",
        name: "AI Automation",
        shortName: "AI",
        description: "AI Powered Automation",
        icon: Bot,
        color: "#9333EA",
        background: "#FAF5FF",
        route: "/ai",
    },
    {
        id: "sfa",
        name: "SFA",
        shortName: "SFA",
        description: "Sales Force Automation",
        icon: BarChart3,
        color: "#DC2626",
        background: "#FEF2F2",
        route: "/sfa",
    },
    {
        id: "supply-chain",
        name: "Supply Chain",
        shortName: "SC",
        description: "Supply Chain & Logistics",
        icon: Truck,
        color: "#CA8A04",
        background: "#FEFCE8",
        route: "/supply-chain",
    },
    {
        id: "vms",
        name: "VMS",
        shortName: "VMS",
        description: "Vendor Management System",
        icon: BriefcaseBusiness,
        color: "#4F46E5",
        background: "#EEF2FF",
        route: "/vms",
    },
    {
        id: "lms",
        name: "LMS",
        shortName: "LMS",
        description: "Learning Management System",
        icon: GraduationCap,
        color: "#0284C7",
        background: "#F0F9FF",
        route: "/lms",
    },
    {
        id: "doms",
        name: "DoMS",
        shortName: "DoMS",
        description: "Document Management System",
        icon: FileText,
        color: "#BE123C",
        background: "#FFF1F2",
        route: "/doms",
    },
    {
        id: "dms",
        name: "DMS",
        shortName: "DMS",
        description: "Data Management System",
        icon: Package,
        color: "#475569",
        background: "#F8FAFC",
        route: "/dms",
    },
];

type ApplicationLauncherProps = {
    onSelectApplication?: (application: Application) => void;
};

export default function ApplicationLauncher({
    onSelectApplication,
}: ApplicationLauncherProps) {
    const [visible, setVisible] = useState(false);

    const handleSelect = (application: Application) => {
        setVisible(false);

        onSelectApplication?.(application);
    };

    return (
        <>
            {/* 9 DOT BUTTON */}
            <Pressable
                onPress={() => setVisible(true)}
                style={({ pressed }) => [
                    styles.launcherButton,
                    pressed && styles.launcherButtonPressed,
                ]}
            >
                <View style={styles.dots}>
                    {Array.from({ length: 9 }).map((_, index) => (
                        <View
                            key={index}
                            style={styles.dot}
                        />
                    ))}
                </View>
            </Pressable>

            {/* APPLICATION DIALOG */}
            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.dialog}>
                        {/* HEADER */}
                        <View style={styles.dialogHeader}>
                            <View style={styles.titleContainer}>
                                <View style={styles.titleIcon}>
                                    <LayoutGrid
                                        size={20}
                                        color="#4F46E5"
                                    />
                                </View>

                                <View>
                                    <Text style={styles.title}>
                                        Applications
                                    </Text>

                                    <Text style={styles.subtitle}>
                                        Select an application to continue
                                    </Text>
                                </View>
                            </View>

                            <Pressable
                                onPress={() => setVisible(false)}
                                style={styles.closeButton}
                            >
                                <X
                                    size={20}
                                    color="#64748B"
                                />
                            </Pressable>
                        </View>

                        {/* APPLICATION LIST */}
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={
                                styles.applicationGrid
                            }
                        >
                            {APPLICATIONS.map((application) => {
                                const Icon = application.icon;

                                return (
                                    <Pressable
                                        key={application.id}
                                        onPress={() =>
                                            handleSelect(application)
                                        }
                                        style={({ pressed }) => [
                                            styles.applicationCard,
                                            pressed &&
                                                styles.applicationCardPressed,
                                        ]}
                                    >
                                        <View
                                            style={[
                                                styles.applicationIcon,
                                                {
                                                    backgroundColor:
                                                        application.background,
                                                },
                                            ]}
                                        >
                                            <Icon
                                                size={23}
                                                color={
                                                    application.color
                                                }
                                            />
                                        </View>

                                        <View
                                            style={
                                                styles.applicationInfo
                                            }
                                        >
                                            <Text
                                                style={
                                                    styles.applicationName
                                                }
                                                numberOfLines={1}
                                            >
                                                {application.name}
                                            </Text>

                                            <Text
                                                style={
                                                    styles.applicationDescription
                                                }
                                                numberOfLines={2}
                                            >
                                                {
                                                    application.description
                                                }
                                            </Text>
                                        </View>
                                    </Pressable>
                                );
                            })}
                        </ScrollView>

                        {/* FOOTER */}
                        <View style={styles.dialogFooter}>
                            <Text style={styles.footerText}>
                                ITSOFTLAB360 • 12 Applications
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    launcherButton: {
        width: 42,
        height: 42,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    launcherButtonPressed: {
        backgroundColor: "#F1F5F9",
        transform: [{ scale: 0.96 }],
    },

    dots: {
        width: 20,
        height: 20,
        gap:2,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "space-between",
    },

    dot: {
        width: 5,
        height: 5,
        borderRadius: 3,
        backgroundColor: "#334155",
    },

    overlay: {
        flex: 1,
        backgroundColor: "rgba(15, 23, 42, 0.55)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    dialog: {
        width: "100%",
        maxWidth: 520,
        maxHeight: "82%",
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        overflow: "hidden",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.2,
        shadowRadius: 25,

        elevation: 10,
    },

    dialogHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },

    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    titleIcon: {
        width: 42,
        height: 42,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EEF2FF",
        marginRight: 11,
    },

    title: {
        color: "#0F172A",
        fontSize: 17,
        fontWeight: "800",
    },

    subtitle: {
        color: "#64748B",
        fontSize: 11,
        marginTop: 3,
    },

    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F8FAFC",
    },

    applicationGrid: {
        padding: 14,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    applicationCard: {
        width: "48%",
        minHeight: 105,
        marginBottom: 12,
        padding: 13,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: "center",
    },

    applicationCardPressed: {
        backgroundColor: "#F8FAFC",
        transform: [{ scale: 0.98 }],
    },

    applicationIcon: {
        width: 46,
        height: 46,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },

    applicationInfo: {
        flex: 1,
    },

    applicationName: {
        color: "#0F172A",
        fontSize: 13,
        fontWeight: "800",
    },

    applicationDescription: {
        color: "#64748B",
        fontSize: 9,
        lineHeight: 13,
        marginTop: 4,
    },

    dialogFooter: {
        padding: 12,
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
        backgroundColor: "#F8FAFC",
    },

    footerText: {
        color: "#94A3B8",
        fontSize: 10,
        fontWeight: "600",
    },
});
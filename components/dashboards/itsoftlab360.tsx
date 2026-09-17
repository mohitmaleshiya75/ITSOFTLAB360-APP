import React, { useMemo, useState } from "react";
import {
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import {
    Users,
    Database,
    ShoppingCart,
    ClipboardCheck,
    Bot,
    BarChart3,
    Truck,
    BriefcaseBusiness,
    GraduationCap,
    FileText,
    Package,
    // Building2,
    ChevronRight,
    // Grid3X3,
    TrendingUp,
    Activity,
    X,
    DollarSign,
    // CircleCheck,
    Clock3,
    AlertCircle,
} from "lucide-react-native";

/* ============================================================
   TYPES
============================================================ */

type IconComponent = React.ComponentType<{
    size?: number;
    color?: string;
    strokeWidth?: number;
}>;

interface Application {
    id: string;
    name: string;
    shortName: string;
    description: string;
    icon: IconComponent;
    color: string;
    background: string;
    route: string;
}

interface ApplicationStats {
    activeUsers: number;
    transactions: number;
    revenue: number;
    pending: number;
}

/* ============================================================
   APPLICATIONS
============================================================ */

const APPLICATIONS: Application[] = [
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
        description: "Queue Management System",
        icon: ClipboardCheck,
        color: "#059669",
        background: "#ECFDF5",
        route: "/qms",
    },
    {
        id: "ai",
        name: "AI Automation",
        shortName: "AI",
        description: "AI Automation",
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
        description: "Dealer Management System",
        icon: Package,
        color: "#475569",
        background: "#F8FAFC",
        route: "/dms",
    },
];

/* ============================================================
   DUMMY APPLICATION DATA
============================================================ */

const APPLICATION_DATA: Record<string, ApplicationStats> = {
    hrms: {
        activeUsers: 128,
        transactions: 842,
        revenue: 0,
        pending: 18,
    },
    erp: {
        activeUsers: 74,
        transactions: 1260,
        revenue: 285000,
        pending: 32,
    },
    crm: {
        activeUsers: 96,
        transactions: 584,
        revenue: 178500,
        pending: 21,
    },
    pos: {
        activeUsers: 42,
        transactions: 2180,
        revenue: 425600,
        pending: 12,
    },
    qms: {
        activeUsers: 38,
        transactions: 315,
        revenue: 0,
        pending: 8,
    },
    ai: {
        activeUsers: 24,
        transactions: 4620,
        revenue: 92000,
        pending: 6,
    },
    sfa: {
        activeUsers: 67,
        transactions: 932,
        revenue: 638660,
        pending: 15,
    },
    "supply-chain": {
        activeUsers: 53,
        transactions: 714,
        revenue: 316000,
        pending: 27,
    },
    vms: {
        activeUsers: 31,
        transactions: 285,
        revenue: 124000,
        pending: 11,
    },
    lms: {
        activeUsers: 86,
        transactions: 640,
        revenue: 0,
        pending: 19,
    },
    doms: {
        activeUsers: 45,
        transactions: 1520,
        revenue: 0,
        pending: 7,
    },
    dms: {
        activeUsers: 29,
        transactions: 386,
        revenue: 0,
        pending: 4,
    },
};

/* ============================================================
   COMMON DASHBOARD
============================================================ */

export default function CommonDashboard() {
    const [showApplications, setShowApplications] =
        useState(false);

    const [selectedApplication, setSelectedApplication] =
        useState<Application | null>(null);

    /* ---------------------------------------------------------
       CALCULATE COMBINED DATA
    --------------------------------------------------------- */

    const totals = useMemo(() => {
        return APPLICATIONS.reduce(
            (acc, application) => {
                const data =
                    APPLICATION_DATA[application.id];

                acc.users += data.activeUsers;
                acc.transactions += data.transactions;
                acc.revenue += data.revenue;
                acc.pending += data.pending;

                return acc;
            },
            {
                users: 0,
                transactions: 0,
                revenue: 0,
                pending: 0,
            }
        );
    }, []);

    /* ---------------------------------------------------------
       APPLICATION CLICK
    --------------------------------------------------------- */

    const handleApplicationPress = (
        application: Application
    ) => {
        setSelectedApplication(application);
        setShowApplications(false);

        /*
         * Later you can navigate here:
         *
         * router.push(application.route);
         *
         * For now we only select the application.
         */
    };

    /* ---------------------------------------------------------
       FORMAT CURRENCY
    --------------------------------------------------------- */

    const formatCurrency = (value: number) => {
        if (value >= 10000000) {
            return `₹${(value / 10000000).toFixed(1)}Cr`;
        }

        if (value >= 100000) {
            return `₹${(value / 100000).toFixed(1)}L`;
        }

        if (value >= 1000) {
            return `₹${(value / 1000).toFixed(1)}K`;
        }

        return `₹${value.toLocaleString("en-IN")}`;
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* =================================================
                    HEADER
                ================================================= */}

                {/* <View style={styles.header}> */}
                    {/* <View style={styles.headerLeft}>
                        <View style={styles.logo}>
                            <Building2
                                size={22}
                                color="#FFFFFF"
                            />
                        </View>

                        <View>
                            <Text style={styles.brand}>
                                ITSOFTLAB360
                            </Text>

                            <Text style={styles.headerSubtitle}>
                                Unified Business Dashboard
                            </Text>
                        </View>
                    </View> */}

                    {/* 9 DOT APPLICATION BUTTON */}

                    {/* <Pressable
                        onPress={() =>
                            setShowApplications(true)
                        }
                        style={({ pressed }) => [
                            styles.appSwitcher,
                            pressed &&
                            styles.appSwitcherPressed,
                        ]}
                    >
                        <Grid3X3
                            size={23}
                            color="#0F172A"
                        />
                    </Pressable> */}
                {/* </View> */}

                {/* =================================================
                    WELCOME
                ================================================= */}

                <View style={styles.welcomeSection}>
                    <Text style={styles.welcomeTitle}>
                        Good Morning, Admin 👋
                    </Text>

                    <Text style={styles.welcomeSubtitle}>
                        Here&apos;s what&apos;s happening across your
                        business applications today.
                    </Text>
                </View>

                {/* =================================================
                    KPI CARDS
                ================================================= */}

                <View style={styles.kpiGrid}>
                    <KpiCard
                        title="Active Users"
                        value={totals.users.toLocaleString()}
                        subtitle="Across all applications"
                        icon={Users}
                        color="#2563EB"
                        background="#EFF6FF"
                    />

                    <KpiCard
                        title="Transactions"
                        value={totals.transactions.toLocaleString()}
                        subtitle="This period"
                        icon={Activity}
                        color="#7C3AED"
                        background="#F5F3FF"
                    />

                    <KpiCard
                        title="Total Revenue"
                        value={formatCurrency(
                            totals.revenue
                        )}
                        subtitle="Combined revenue"
                        icon={DollarSign}
                        color="#059669"
                        background="#ECFDF5"
                    />

                    <KpiCard
                        title="Pending Actions"
                        value={totals.pending.toLocaleString()}
                        subtitle="Requires attention"
                        icon={Clock3}
                        color="#EA580C"
                        background="#FFF7ED"
                    />
                </View>

                {/* =================================================
                    APPLICATION OVERVIEW
                ================================================= */}

                <SectionHeader
                    title="Application Overview"
                    subtitle="Performance across all ITSOFTLAB360 applications"
                />

                <View style={styles.applicationGrid}>
                    {APPLICATIONS.map(
                        (application) => {
                            const Icon =
                                application.icon;

                            const data =
                                APPLICATION_DATA[
                                application.id
                                ];

                            return (
                                <Pressable
                                    key={application.id}
                                    onPress={() =>
                                        handleApplicationPress(
                                            application
                                        )
                                    }
                                    style={({ pressed }) => [
                                        styles.applicationCard,
                                        pressed &&
                                        styles.cardPressed,
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
                                            size={22}
                                            color={
                                                application.color
                                            }
                                        />
                                    </View>

                                    <View style={styles.applicationInfo}>
                                        <Text
                                            style={
                                                styles.applicationName
                                            }
                                        >
                                            {
                                                application.name
                                            }
                                        </Text>

                                        <Text
                                            style={
                                                styles.applicationDescription
                                            }
                                            numberOfLines={1}
                                        >
                                            {
                                                application.description
                                            }
                                        </Text>
                                    </View>

                                    <View
                                        style={
                                            styles.applicationMetrics
                                        }
                                    >
                                        <View>
                                            <Text
                                                style={
                                                    styles.metricValue
                                                }
                                            >
                                                {data.activeUsers}
                                            </Text>

                                            <Text
                                                style={
                                                    styles.metricLabel
                                                }
                                            >
                                                Users
                                            </Text>
                                        </View>

                                        <View>
                                            <Text
                                                style={
                                                    styles.metricValue
                                                }
                                            >
                                                {data.transactions}
                                            </Text>

                                            <Text
                                                style={
                                                    styles.metricLabel
                                                }
                                            >
                                                Activity
                                            </Text>
                                        </View>
                                    </View>

                                    {/* <ChevronRight
                                        size={18}
                                        color="#94A3B8"
                                    /> */}
                                </Pressable>
                            );
                        }
                    )}
                </View>

                {/* =================================================
                    BUSINESS PERFORMANCE
                ================================================= */}

                <SectionHeader
                    title="Business Performance"
                    subtitle="Combined metrics from your applications"
                />

                <View style={styles.performanceCard}>
                    <PerformanceRow
                        title="Revenue Performance"
                        value={formatCurrency(
                            totals.revenue
                        )}
                        percentage={82}
                        icon={TrendingUp}
                        color="#059669"
                    />

                    <View style={styles.divider} />

                    <PerformanceRow
                        title="User Engagement"
                        value={`${totals.users} Active Users`}
                        percentage={76}
                        icon={Users}
                        color="#2563EB"
                    />

                    <View style={styles.divider} />

                    <PerformanceRow
                        title="Transaction Processing"
                        value={totals.transactions.toLocaleString()}
                        percentage={91}
                        icon={Activity}
                        color="#7C3AED"
                    />
                </View>

                {/* =================================================
                    RECENT ACTIVITY
                ================================================= */}

                <SectionHeader
                    title="Recent Activity"
                    subtitle="Latest activity across applications"
                />

                <View style={styles.activityCard}>
                    <ActivityItem
                        application="SFA"
                        title="Sales order completed"
                        description="Order #ORD-2026-0042 completed successfully"
                        time="5 min ago"
                        color="#DC2626"
                    />

                    <ActivityItem
                        application="CRM"
                        title="New customer added"
                        description="ABC Enterprises was added to CRM"
                        time="18 min ago"
                        color="#0891B2"
                    />

                    <ActivityItem
                        application="HRMSM"
                        title="Employee attendance updated"
                        description="128 employees marked attendance"
                        time="32 min ago"
                        color="#2563EB"
                    />

                    <ActivityItem
                        application="POS"
                        title="Sales transaction completed"
                        description="₹42,500 transaction processed"
                        time="46 min ago"
                        color="#EA580C"
                    />

                    <ActivityItem
                        application="ERP"
                        title="Inventory synchronized"
                        description="ERP inventory synchronization completed"
                        time="1 hour ago"
                        color="#7C3AED"
                    />
                </View>

                {/* =================================================
                    FOOTER
                ================================================= */}

                <View style={styles.footer}>
                    <Text style={styles.footerTitle}>
                        ITSOFTLAB360
                    </Text>

                    <Text style={styles.footerText}>
                        One platform. Multiple business
                        solutions.
                    </Text>
                </View>
            </ScrollView>

            {/* =====================================================
                APPLICATION SWITCHER MODAL
            ===================================================== */}

            <Modal
                visible={showApplications}
                transparent
                animationType="fade"
                onRequestClose={() =>
                    setShowApplications(false)
                }
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {/* MODAL HEADER */}

                        <View style={styles.modalHeader}>
                            <View>
                                <Text
                                    style={
                                        styles.modalTitle
                                    }
                                >
                                    Applications
                                </Text>

                                <Text
                                    style={
                                        styles.modalSubtitle
                                    }
                                >
                                    Select an application
                                </Text>
                            </View>

                            <Pressable
                                onPress={() =>
                                    setShowApplications(
                                        false
                                    )
                                }
                                style={
                                    styles.closeButton
                                }
                            >
                                <X
                                    size={21}
                                    color="#475569"
                                />
                            </Pressable>
                        </View>

                        {/* APPLICATION LIST */}

                        <ScrollView
                            showsVerticalScrollIndicator={
                                false
                            }
                            contentContainerStyle={
                                styles.modalGrid
                            }
                        >
                            {APPLICATIONS.map(
                                (application) => {
                                    const Icon =
                                        application.icon;

                                    const isSelected =
                                        selectedApplication?.id ===
                                        application.id;

                                    return (
                                        <Pressable
                                            key={
                                                application.id
                                            }
                                            onPress={() =>
                                                handleApplicationPress(
                                                    application
                                                )
                                            }
                                            style={[
                                                styles.modalApplication,
                                                isSelected &&
                                                styles.modalApplicationSelected,
                                            ]}
                                        >
                                            <View
                                                style={[
                                                    styles.modalIcon,
                                                    {
                                                        backgroundColor:
                                                            application.background,
                                                    },
                                                ]}
                                            >
                                                <Icon
                                                    size={
                                                        24
                                                    }
                                                    color={
                                                        application.color
                                                    }
                                                />
                                            </View>

                                            <View
                                                style={
                                                    styles.modalApplicationInfo
                                                }
                                            >
                                                <Text
                                                    style={
                                                        styles.modalApplicationName
                                                    }
                                                >
                                                    {
                                                        application.name
                                                    }
                                                </Text>

                                                <Text
                                                    style={
                                                        styles.modalApplicationDescription
                                                    }
                                                    numberOfLines={
                                                        2
                                                    }
                                                >
                                                    {
                                                        application.description
                                                    }
                                                </Text>
                                            </View>

                                            <ChevronRight
                                                size={
                                                    18
                                                }
                                                color="#94A3B8"
                                            />
                                        </Pressable>
                                    );
                                }
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

/* ============================================================
   KPI CARD
============================================================ */

function KpiCard({
    title,
    value,
    subtitle,
    icon: Icon,
    color,
    background,
}: {
    title: string;
    value: string;
    subtitle: string;
    icon: IconComponent;
    color: string;
    background: string;
}) {
    return (
        <View style={styles.kpiCard}>
            <View
                style={[
                    styles.kpiIcon,
                    {
                        backgroundColor: background,
                    },
                ]}
            >
                <Icon
                    size={20}
                    color={color}
                />
            </View>

            <Text style={styles.kpiTitle}>
                {title}
            </Text>

            <Text style={styles.kpiValue}>
                {value}
            </Text>

            <Text style={styles.kpiSubtitle}>
                {subtitle}
            </Text>
        </View>
    );
}

/* ============================================================
   SECTION HEADER
============================================================ */

function SectionHeader({
    title,
    subtitle,
}: {
    title: string;
    subtitle: string;
}) {
    return (
        <View style={styles.sectionHeader}>
            <View>
                <Text style={styles.sectionTitle}>
                    {title}
                </Text>

                <Text style={styles.sectionSubtitle}>
                    {subtitle}
                </Text>
            </View>
        </View>
    );
}

/* ============================================================
   PERFORMANCE ROW
============================================================ */

function PerformanceRow({
    title,
    value,
    percentage,
    icon: Icon,
    color,
}: {
    title: string;
    value: string;
    percentage: number;
    icon: IconComponent;
    color: string;
}) {
    return (
        <View style={styles.performanceRow}>
            <View
                style={[
                    styles.performanceIcon,
                    {
                        backgroundColor: `${color}15`,
                    },
                ]}
            >
                <Icon
                    size={20}
                    color={color}
                />
            </View>

            <View style={styles.performanceInfo}>
                <View
                    style={
                        styles.performanceTitleRow
                    }
                >
                    <Text
                        style={
                            styles.performanceTitle
                        }
                    >
                        {title}
                    </Text>

                    <Text
                        style={[
                            styles.performancePercentage,
                            {
                                color,
                            },
                        ]}
                    >
                        {percentage}%
                    </Text>
                </View>

                <Text
                    style={
                        styles.performanceValue
                    }
                >
                    {value}
                </Text>

                <View
                    style={
                        styles.progressBackground
                    }
                >
                    <View
                        style={[
                            styles.progressFill,
                            {
                                width: `${percentage}%`,
                                backgroundColor:
                                    color,
                            },
                        ]}
                    />
                </View>
            </View>
        </View>
    );
}

/* ============================================================
   ACTIVITY ITEM
============================================================ */

function ActivityItem({
    application,
    title,
    description,
    time,
    color,
}: {
    application: string;
    title: string;
    description: string;
    time: string;
    color: string;
}) {
    return (
        <View style={styles.activityItem}>
            <View
                style={[
                    styles.activityDot,
                    {
                        backgroundColor: color,
                    },
                ]}
            />

            <View style={styles.activityContent}>
                <View
                    style={
                        styles.activityTitleRow
                    }
                >
                    <View
                        style={
                            styles.activityAppBadge
                        }
                    >
                        <Text
                            style={[
                                styles.activityAppText,
                                {
                                    color,
                                },
                            ]}
                        >
                            {application}
                        </Text>
                    </View>

                    <Text
                        style={styles.activityTime}
                    >
                        {time}
                    </Text>
                </View>

                <Text
                    style={styles.activityTitle}
                >
                    {title}
                </Text>

                <Text
                    style={
                        styles.activityDescription
                    }
                >
                    {description}
                </Text>
            </View>

            <CircleCheck
                color={color}
            />
        </View>
    );
}

/* ============================================================
   SMALL ICON
============================================================ */

function CircleCheck({
    color,
}: {
    color: string;
}) {
    return (
        <View
            style={[
                styles.activityCheck,
                {
                    backgroundColor: `${color}15`,
                },
            ]}
        >
            <AlertCircle
                size={17}
                color={color}
            />
        </View>
    );
}

/* ============================================================
   STYLES
============================================================ */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },

    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },

    /* HEADER */

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
    },

    headerLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 11,
        flex: 1,
    },

    logo: {
        width: 44,
        height: 44,
        borderRadius: 13,
        backgroundColor: "#0F172A",
        alignItems: "center",
        justifyContent: "center",
    },

    brand: {
        fontSize: 17,
        fontWeight: "900",
        color: "#0F172A",
        letterSpacing: 0.3,
    },

    headerSubtitle: {
        marginTop: 2,
        fontSize: 11,
        color: "#64748B",
        fontWeight: "500",
    },

    appSwitcher: {
        width: 45,
        height: 45,
        borderRadius: 13,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        alignItems: "center",
        justifyContent: "center",
    },

    appSwitcherPressed: {
        backgroundColor: "#F1F5F9",
        transform: [
            {
                scale: 0.95,
            },
        ],
    },

    /* WELCOME */

    welcomeSection: {
        marginBottom: 20,
    },

    welcomeTitle: {
        fontSize: 25,
        fontWeight: "900",
        color: "#0F172A",
        marginBottom: 6,
    },

    welcomeSubtitle: {
        fontSize: 13,
        lineHeight: 20,
        color: "#64748B",
    },

    /* KPI */

    kpiGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 26,
    },

    kpiCard: {
        width: "48%",
        flexGrow: 1,
        minHeight: 145,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    kpiIcon: {
        width: 40,
        height: 40,
        borderRadius: 11,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },

    kpiTitle: {
        fontSize: 11,
        fontWeight: "700",
        color: "#64748B",
    },

    kpiValue: {
        marginTop: 3,
        fontSize: 22,
        fontWeight: "900",
        color: "#0F172A",
    },

    kpiSubtitle: {
        marginTop: 3,
        fontSize: 9,
        color: "#94A3B8",
    },

    /* SECTION */

    sectionHeader: {
        marginBottom: 12,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "900",
        color: "#0F172A",
    },

    sectionSubtitle: {
        marginTop: 3,
        fontSize: 11,
        color: "#64748B",
    },

    /* APPLICATION */

    applicationGrid: {
        gap: 10,
        marginBottom: 26,
    },

    applicationCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 13,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    cardPressed: {
        backgroundColor: "#F8FAFC",
        transform: [
            {
                scale: 0.985,
            },
        ],
    },

    applicationIcon: {
        width: 46,
        height: 46,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 11,
    },

    applicationInfo: {
        flex: 1,
        minWidth: 0,
    },

    applicationName: {
        fontSize: 14,
        fontWeight: "800",
        color: "#0F172A",
    },

    applicationDescription: {
        marginTop: 3,
        fontSize: 10,
        color: "#64748B",
    },

    applicationMetrics: {
        flexDirection: "row",
        gap: 16,
        marginRight: 10,
    },

    metricValue: {
        textAlign: "center",
        fontSize: 13,
        fontWeight: "900",
        color: "#0F172A",
    },

    metricLabel: {
        marginTop: 2,
        fontSize: 8,
        color: "#94A3B8",
        textAlign: "center",
    },

    /* PERFORMANCE */

    performanceCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 17,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        padding: 16,
        marginBottom: 26,
    },

    performanceRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    performanceIcon: {
        width: 43,
        height: 43,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    performanceInfo: {
        flex: 1,
    },

    performanceTitleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    performanceTitle: {
        fontSize: 12,
        fontWeight: "800",
        color: "#334155",
    },

    performancePercentage: {
        fontSize: 12,
        fontWeight: "900",
    },

    performanceValue: {
        fontSize: 10,
        color: "#64748B",
        marginTop: 3,
        marginBottom: 8,
    },

    progressBackground: {
        height: 7,
        backgroundColor: "#E2E8F0",
        borderRadius: 10,
        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        borderRadius: 10,
    },

    divider: {
        height: 1,
        backgroundColor: "#F1F5F9",
        marginVertical: 16,
    },

    /* ACTIVITY */

    activityCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 17,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        padding: 15,
        marginBottom: 26,
    },

    activityItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 11,
    },

    activityDot: {
        width: 8,
        height: 8,
        borderRadius: 8,
        marginTop: 6,
        marginRight: 11,
    },

    activityContent: {
        flex: 1,
    },

    activityTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    activityAppBadge: {
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 6,
        backgroundColor: "#F8FAFC",
    },

    activityAppText: {
        fontSize: 8,
        fontWeight: "900",
    },

    activityTime: {
        fontSize: 9,
        color: "#94A3B8",
    },

    activityTitle: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: "800",
        color: "#334155",
    },

    activityDescription: {
        marginTop: 3,
        fontSize: 10,
        lineHeight: 15,
        color: "#64748B",
    },

    activityCheck: {
        width: 30,
        height: 30,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 8,
    },

    /* FOOTER */

    footer: {
        alignItems: "center",
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
    },

    footerTitle: {
        fontSize: 13,
        fontWeight: "900",
        color: "#0F172A",
    },

    footerText: {
        marginTop: 4,
        fontSize: 10,
        color: "#94A3B8",
    },

    /* MODAL */

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(15, 23, 42, 0.55)",
        justifyContent: "center",
        padding: 16,
    },

    modalContainer: {
        maxHeight: "90%",
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        overflow: "hidden",
    },

    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: "900",
        color: "#0F172A",
    },

    modalSubtitle: {
        marginTop: 3,
        fontSize: 11,
        color: "#64748B",
    },

    closeButton: {
        width: 38,
        height: 38,
        borderRadius: 11,
        backgroundColor: "#F1F5F9",
        alignItems: "center",
        justifyContent: "center",
    },

    modalGrid: {
        padding: 14,
        gap: 10,
    },

    modalApplication: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        backgroundColor: "#FFFFFF",
    },

    modalApplicationSelected: {
        borderColor: "#2563EB",
        backgroundColor: "#F8FAFC",
    },

    modalIcon: {
        width: 46,
        height: 46,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 11,
    },

    modalApplicationInfo: {
        flex: 1,
    },

    modalApplicationName: {
        fontSize: 13,
        fontWeight: "800",
        color: "#0F172A",
    },

    modalApplicationDescription: {
        marginTop: 3,
        fontSize: 10,
        lineHeight: 14,
        color: "#64748B",
    },
});
import React, { useMemo } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Pressable,
    useWindowDimensions,
} from "react-native";
import {
    ArrowRight,
    BarChart3,
    Boxes,
    CalendarDays,
    CheckCircle2,
    ClipboardCheck,
    Clock3,
    Gauge,
    Package,
    Truck,
    Users,
    Warehouse,
} from "lucide-react-native";

type RoleCount = {
    role: string;
    count: number;
};

type Approval = {
    id: string;
    name: string;
    approvalType: "Driver" | "Vehicle";
};

type Activity = {
    id: string;
    title: string;
    user: string;
    createdAt: string;
};

const COLORS = {
    primary: "#0FA4AF",
    primaryDark: "#003135",
    primaryLight: "#E8F7F8",
    text: "#0F172A",
    muted: "#64748B",
    border: "#E2E8F0",
    card: "#FFFFFF",
    background: "#F8FAFC",
    green: "#16A34A",
    amber: "#D97706",
    rose: "#E11D48",
};

const dummyData = {
    user: { name: "Rahul Ahirwal" },

    licenses: {
        total: 25,
        used: 18,
        remaining: 7,
    },

    cards: {
        customers: 42,
        purchaseOrders: 128,
        pendingPurchaseOrders: 14,
        activeShipments: 36,
        deliveredShipments: 214,
        delayedShipments: 8,
        products: 864,
        lowStock: 27,
        warehouses: 8,
        availableVehicles: 19,
    },

    usersByRole: [
        { role: "ORDER_MANAGER", count: 5 },
        { role: "LOGISTICS_MANAGER", count: 4 },
        { role: "INVENTORY_WAREHOUSE_MANAGER", count: 6 },
        { role: "ACCOUNTANT", count: 3 },
        { role: "CUSTOMER", count: 42 },
    ] as RoleCount[],

    inventory: {
        totalQuantity: 12840,
        availableQuantity: 9360,
    },

    vehicleStatus: [
        { status: "AVAILABLE", count: 19 },
        { status: "IN_TRANSIT", count: 12 },
        { status: "MAINTENANCE", count: 5 },
    ],

    deliveryTrend: [
        { period: "Apr", total: 32 },
        { period: "May", total: 46 },
        { period: "Jun", total: 41 },
        { period: "Jul", total: 59 },
        { period: "Aug", total: 71 },
        { period: "Sep", total: 64 },
    ],

    shipmentStatus: [
        { status: "DELIVERED", value: 214 },
        { status: "IN_TRANSIT", value: 36 },
        { status: "DELAYED", value: 8 },
        { status: "PROCESSING", value: 17 },
    ],

    approvals: [
        { id: "a1", name: "Amit Sharma", approvalType: "Driver" },
        { id: "a2", name: "MP09 AB 4521", approvalType: "Vehicle" },
        { id: "a3", name: "Vikram Singh", approvalType: "Driver" },
        { id: "a4", name: "MP09 CD 7812", approvalType: "Vehicle" },
    ] as Approval[],

    activities: [
        {
            id: "1",
            title: "Purchase order PO-1048 was approved",
            user: "Rahul Ahirwal",
            createdAt: "Today, 10:42 AM",
        },
        {
            id: "2",
            title: "New vehicle MP09 EF 2210 was added",
            user: "Logistics Manager",
            createdAt: "Today, 09:18 AM",
        },
        {
            id: "3",
            title: "Shipment SH-2031 marked as delivered",
            user: "Dispatch Team",
            createdAt: "Yesterday, 06:35 PM",
        },
        {
            id: "4",
            title: "Inventory quantity updated for SKU-882",
            user: "Warehouse Manager",
            createdAt: "Yesterday, 04:12 PM",
        },
        {
            id: "5",
            title: "New customer account was created",
            user: "Accountant",
            createdAt: "Yesterday, 01:26 PM",
        },
        {
            id: "6",
            title: "Driver document submitted for approval",
            user: "Amit Sharma",
            createdAt: "Sep 12, 11:05 AM",
        },
    ] as Activity[],
};

const managerRoles = [
    {
        role: "ORDER_MANAGER",
        label: "Order Manager",
        description: "Order pipeline & processing",
        icon: Boxes,
    },
    {
        role: "LOGISTICS_MANAGER",
        label: "Logistics Manager",
        description: "Fleet, routes & dispatch",
        icon: Truck,
    },
    {
        role: "INVENTORY_WAREHOUSE_MANAGER",
        label: "Inv & Warehouse Manager",
        description: "Stock & facility oversight",
        icon: Warehouse,
    },
    {
        role: "ACCOUNTANT",
        label: "Accountant",
        description: "Invoices & transactions",
        icon: BarChart3,
    },
];

const quickActions = [
    { label: "Add Manager", icon: Users },
    { label: "View Approvals", icon: ClipboardCheck },
    { label: "View Orders", icon: Boxes },
    { label: "View Shipments", icon: Truck },
    { label: "View Warehouses", icon: Warehouse },
    { label: "View Drivers", icon: Users },
];

function formatNumber(value: number) {
    return value.toLocaleString();
}

function ProgressRow({
    label,
    value,
}: {
    label: string;
    value: number;
}) {
    const percentage = Math.max(0, Math.min(100, Math.round(value)));

    return (
        <View style={styles.progressBlock}>
            <View style={styles.progressHeader}>
                <Text style={styles.progressLabel}>{label}</Text>
                <Text style={styles.progressValue}>{percentage}%</Text>
            </View>
            <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${percentage}%` }]} />
            </View>
        </View>
    );
}

function KpiCard({
    label,
    value,
    helper,
    icon: Icon,
}: {
    label: string;
    value: number;
    helper: string;
    icon: React.ComponentType<any>;
}) {
    return (
        <View style={styles.kpiCard}>
            <View style={styles.kpiTop}>
                <View style={styles.iconBox}>
                    <Icon size={20} color={COLORS.primary} />
                </View>
                <ArrowRight size={17} color="#CBD5E1" />
            </View>

            <Text style={styles.kpiValue}>{formatNumber(value)}</Text>
            <Text style={styles.kpiLabel}>{label}</Text>
            <Text style={styles.kpiHelper}>{helper}</Text>
        </View>
    );
}

function SectionHeader({
    title,
    subtitle,
    action,
}: {
    title: string;
    subtitle?: string;
    action?: string;
}) {
    return (
        <View style={styles.sectionHeader}>
            <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>{title}</Text>
                {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
            </View>
            {action ? (
                <Pressable>
                    <Text style={styles.actionText}>{action}</Text>
                </Pressable>
            ) : null}
        </View>
    );
}

export default function AdminDashboard() {
    const { width } = useWindowDimensions();

    const isTablet = width >= 700;
    const isWide = width >= 1000;

    const data = dummyData;

    const managerCount = useMemo(
        () =>
            data.usersByRole
                .filter((item) => item.role.includes("MANAGER"))
                .reduce((total, item) => total + item.count, 0),
        []
    );

    const customerCount =
        data.usersByRole.find((item) => item.role === "CUSTOMER")?.count ??
        data.cards.customers;

    const totalVehicles = data.vehicleStatus.reduce(
        (total, item) => total + item.count,
        0
    );

    const availableVehicles = data.vehicleStatus.find(
        (item) => item.status === "AVAILABLE"
    )?.count ?? 0;

    const shipmentTotal =
        data.cards.activeShipments +
        data.cards.deliveredShipments +
        data.cards.delayedShipments;

    const licensePercentage = Math.min(
        100,
        Math.round((data.licenses.used / data.licenses.total) * 100)
    );

    const operations = [
        {
            label: "Order Processing",
            value:
                ((data.cards.purchaseOrders - data.cards.pendingPurchaseOrders) /
                    data.cards.purchaseOrders) *
                100,
        },
        {
            label: "Shipment Completion",
            value: (data.cards.deliveredShipments / shipmentTotal) * 100,
        },
        {
            label: "Vehicle Availability",
            value: (availableVehicles / totalVehicles) * 100,
        },
        {
            label: "Inventory Availability",
            value:
                (data.inventory.availableQuantity / data.inventory.totalQuantity) *
                100,
        },
    ];

    const now = new Date();
    const greeting =
        now.getHours() < 12
            ? "Good morning"
            : now.getHours() < 18
                ? "Good afternoon"
                : "Good evening";

    const dateLabel = now.toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const weekday = now.toLocaleDateString(undefined, {
        weekday: "long",
    });

    const timeLabel = now.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
    });

    const kpis = [
        {
            label: "Total Managers",
            value: managerCount,
            helper: "Across operational teams",
            icon: Users,
        },
        {
            label: "Active Customers",
            value: customerCount,
            helper: "Organization customers",
            icon: Users,
        },
        {
            label: "Purchase Orders",
            value: data.cards.purchaseOrders,
            helper: `${data.cards.pendingPurchaseOrders} pending`,
            icon: Boxes,
        },
        {
            label: "Active Shipments",
            value: data.cards.activeShipments,
            helper: `${data.cards.deliveredShipments} delivered`,
            icon: Truck,
        },
        {
            label: "Products",
            value: data.cards.products,
            helper: `${data.cards.lowStock} low stock`,
            icon: Package,
        },
        {
            label: "Warehouses",
            value: data.cards.warehouses,
            helper: `${formatNumber(data.inventory.totalQuantity)} inventory units`,
            icon: Warehouse,
        },
        {
            label: "Available Vehicles",
            value: data.cards.availableVehicles,
            helper: `${totalVehicles} tracked`,
            icon: Truck,
        },
        {
            label: "Pending Approvals",
            value: data.approvals.length,
            helper: "Drivers and vehicles",
            icon: ClipboardCheck,
        },
    ];

    const chartMax = Math.max(...data.deliveryTrend.map((item) => item.total));

    return (
        <ScrollView
            style={styles.screen}
            contentContainerStyle={[
                styles.content,
                { paddingHorizontal: isTablet ? 24 : 16 },
            ]}
            showsVerticalScrollIndicator={false}
        >
            {/* Hero + date */}
            <View
                style={[
                    styles.heroRow,
                    isWide ? styles.heroRowWide : undefined,
                ]}
            >
                <View style={styles.heroCard}>
                    <View style={styles.heroCircle} />

                    <View style={styles.heroContent}>
                        <Text style={styles.heroGreeting}>{greeting},</Text>
                        <Text style={styles.heroName}>{data.user.name}</Text>
                        <Text style={styles.heroDescription}>
                            Manage your organization&apos;s orders, warehouses, shipments,
                            drivers, and approvals from one connected operations dashboard.
                        </Text>

                        <View style={styles.onlinePill}>
                            <CheckCircle2 size={15} color="#FFFFFF" />
                            <Text style={styles.onlineText}>Operations center online</Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.dateCard, isWide ? { flex: 0.8 } : undefined]}>
                    <View style={styles.dateTop}>
                        <View style={styles.dateIcon}>
                            <CalendarDays size={22} color={COLORS.primary} />
                        </View>
                        <View style={styles.livePill}>
                            <Text style={styles.liveText}>Live</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.dateText}>{dateLabel}</Text>
                        <Text style={styles.weekday}>{weekday}</Text>
                    </View>

                    <View style={styles.timeRow}>
                        <Clock3 size={17} color={COLORS.primary} />
                        <Text style={styles.timeText}>{timeLabel}</Text>
                    </View>
                </View>
            </View>

            {/* License pool */}
            <View style={styles.card}>
                <View style={styles.licenseTop}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.licenseLabelRow}>
                            <Text style={styles.licenseBadge}>LICENSE POOL</Text>
                            <Text style={styles.smallMuted}>Active User Allocation</Text>
                        </View>

                        <Text style={styles.licenseTitle}>
                            {data.licenses.used} / {data.licenses.total}{" "}
                            <Text style={styles.licenseTitleMuted}>Licenses Used</Text>
                        </Text>

                        <Text style={styles.licenseDescription}>
                            Each active manager account consumes 1 license. Deactivating an
                            account immediately returns the license to the available pool.
                        </Text>
                    </View>

                    <View style={styles.licenseStats}>
                        <View style={styles.licenseStat}>
                            <Text style={styles.statCaption}>TOTAL</Text>
                            <Text style={styles.statValue}>{data.licenses.total}</Text>
                        </View>

                        <View style={styles.licenseStat}>
                            <Text style={styles.statCaption}>USED</Text>
                            <Text style={[styles.statValue, { color: COLORS.primary }]}>
                                {data.licenses.used}
                            </Text>
                        </View>

                        <View style={[styles.licenseStat, styles.remainingStat]}>
                            <Text style={[styles.statCaption, { color: COLORS.green }]}>
                                REMAINING
                            </Text>
                            <Text style={[styles.statValue, { color: COLORS.green }]}>
                                {data.licenses.remaining}
                            </Text>
                        </View>

                        <Pressable style={styles.primaryButton}>
                            <Text style={styles.primaryButtonText}>Manage Users</Text>
                            <ArrowRight size={14} color="#FFFFFF" />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.licenseProgressHeader}>
                    <Text style={styles.progressLabel}>License Utilization</Text>
                    <Text style={styles.progressValue}>{licensePercentage}%</Text>
                </View>

                <View style={styles.progressTrack}>
                    <View
                        style={[
                            styles.progressFill,
                            {
                                width: `${licensePercentage}%`,
                                backgroundColor:
                                    licensePercentage >= 100
                                        ? COLORS.rose
                                        : licensePercentage >= 80
                                            ? COLORS.amber
                                            : COLORS.primary,
                            },
                        ]}
                    />
                </View>
            </View>

            {/* KPI cards */}
            <View
                style={[
                    styles.kpiGrid,
                    isTablet ? styles.kpiGridTablet : undefined,
                ]}
            >
                {kpis.map((item) => (
                    <View
                        key={item.label}
                        style={[
                            styles.kpiWrapper,
                            isTablet ? { width: "25%" } : { width: "50%" },
                        ]}
                    >
                        <KpiCard {...item} />
                    </View>
                ))}
            </View>

            {/* Managers */}
            <View style={styles.card}>
                <SectionHeader
                    title="Operational Managers Breakdown"
                    subtitle="Live distribution of active manager roles in this organization"
                    action="Manage All Managers →"
                />

                <View style={styles.managerGrid}>
                    {managerRoles.map((item) => {
                        const count =
                            data.usersByRole.find((role) => role.role === item.role)
                                ?.count ?? 0;
                        const Icon = item.icon;

                        return (
                            <View key={item.role} style={styles.managerItem}>
                                <View style={styles.managerIcon}>
                                    <Icon size={19} color={COLORS.primary} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <View style={styles.managerTitleRow}>
                                        <Text style={styles.managerLabel} numberOfLines={1}>
                                            {item.label}
                                        </Text>
                                        <View style={styles.countBadge}>
                                            <Text style={styles.countText}>{count}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.managerDescription} numberOfLines={1}>
                                        {item.description}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </View>

            {/* Charts row */}
            <View style={[styles.twoColumn, isWide ? styles.twoColumnWide : null]}>
                {/* Delivery trend */}
                <View style={[styles.card, isWide ? { flex: 1.4 } : null]}>
                    <SectionHeader
                        title="Delivery Trend"
                        subtitle="Completed deliveries by period"
                    />

                    <View style={styles.chart}>
                        <View style={styles.chartGrid}>
                            {[0, 1, 2, 3].map((line) => (
                                <View
                                    key={line}
                                    style={[
                                        styles.chartLine,
                                        { top: `${line * 33.33}%` },
                                    ]}
                                />
                            ))}

                            {data.deliveryTrend.map((item) => {
                                const height = (item.total / chartMax) * 100;

                                return (
                                    <View key={item.period} style={styles.barColumn}>
                                        <Text style={styles.barValue}>{item.total}</Text>
                                        <View
                                            style={[
                                                styles.bar,
                                                { height: `${Math.max(10, height)}%` },
                                            ]}
                                        />
                                        <Text style={styles.barLabel}>{item.period}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </View>

                {/* Shipment status */}
                <View style={[styles.card, isWide ? { flex: 1 } : null]}>
                    <SectionHeader
                        title="Shipment Status"
                        subtitle="Live distribution across shipment stages"
                    />

                    <View style={styles.shipmentChartArea}>
                        <View style={styles.donut}>
                            <View style={styles.donutInner}>
                                <Text style={styles.donutValue}>
                                    {data.shipmentStatus.reduce(
                                        (total, item) => total + item.value,
                                        0
                                    )}
                                </Text>
                                <Text style={styles.donutCaption}>TOTAL</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, gap: 12 }}>
                            {data.shipmentStatus.map((item) => (
                                <View key={item.status} style={styles.legendRow}>
                                    <View style={styles.legendLeft}>
                                        <View
                                            style={[
                                                styles.legendDot,
                                                {
                                                    backgroundColor:
                                                        item.status === "DELIVERED"
                                                            ? COLORS.green
                                                            : item.status === "DELAYED"
                                                                ? COLORS.rose
                                                                : item.status === "IN_TRANSIT"
                                                                    ? COLORS.primary
                                                                    : COLORS.amber,
                                                },
                                            ]}
                                        />
                                        <Text style={styles.legendText}>
                                            {item.status.replace("_", " ")}
                                        </Text>
                                    </View>
                                    <Text style={styles.legendValue}>{item.value}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </View>

            {/* Pending + Activity */}
            <View style={[styles.twoColumn, isWide ? styles.twoColumnWide : null]}>
                <View style={[styles.card, isWide ? { flex: 1 } : null]}>
                    <SectionHeader
                        title="Pending Approvals"
                        subtitle="Drivers and vehicles awaiting review"
                        action="View all"
                    />

                    <View style={{ gap: 8 }}>
                        {data.approvals.map((item) => {
                            const Icon = item.approvalType === "Driver" ? Users : Truck;

                            return (
                                <Pressable key={item.id} style={styles.approvalRow}>
                                    <View style={styles.approvalIcon}>
                                        <Icon size={17} color={COLORS.primary} />
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.approvalName} numberOfLines={1}>
                                            {item.name}
                                        </Text>
                                        <Text style={styles.approvalType}>
                                            {item.approvalType}
                                        </Text>
                                    </View>

                                    <View style={styles.pendingBadge}>
                                        <Text style={styles.pendingText}>Pending</Text>
                                    </View>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                <View style={[styles.card, isWide ? { flex: 1.4 } : null]}>
                    <SectionHeader
                        title="Recent Activity"
                        subtitle="Latest organization audit events"
                    />

                    <View>
                        {data.activities.map((item, index) => (
                            <View
                                key={item.id}
                                style={[
                                    styles.activityRow,
                                    index === data.activities.length - 1
                                        ? { borderBottomWidth: 0 }
                                        : null,
                                ]}
                            >
                                <View style={styles.activityDot} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.activityTitle} numberOfLines={2}>
                                        {item.title}
                                    </Text>
                                    <Text style={styles.activityMeta}>
                                        {item.user} · {item.createdAt}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>

            {/* Quick actions + operations */}
            <View style={[styles.twoColumn, isWide ? styles.twoColumnWide : null]}>
                <View style={[styles.card, isWide ? { flex: 1.4 } : null]}>
                    <SectionHeader
                        title="Quick Actions"
                        subtitle="Open frequently used administration tools"
                    />

                    <View style={styles.quickGrid}>
                        {quickActions.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Pressable key={item.label} style={styles.quickAction}>
                                    <View style={styles.quickIcon}>
                                        <Icon size={18} color={COLORS.muted} />
                                    </View>
                                    <Text style={styles.quickLabel} numberOfLines={1}>
                                        {item.label}
                                    </Text>
                                    <ArrowRight size={15} color="#94A3B8" />
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                <View style={[styles.card, isWide ? { flex: 1 } : null]}>
                    <SectionHeader
                        title="Operations Status"
                        subtitle="Calculated from live operational counts"
                    />

                    <View style={styles.operationsHeader}>
                        <Gauge size={21} color={COLORS.primary} />
                    </View>

                    <View style={{ gap: 18 }}>
                        {operations.map((item) => (
                            <ProgressRow
                                key={item.label}
                                label={item.label}
                                value={item.value}
                            />
                        ))}
                    </View>
                </View>
            </View>

            <View style={{ height: 24 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        paddingTop: 16,
        paddingBottom: 30,
        gap: 16,
    },

    heroRow: {
        gap: 16,
    },
    heroRowWide: {
        flexDirection: "row",
    },
    heroCard: {
        flex: 1.7,
        minHeight: 210,
        overflow: "hidden",
        borderRadius: 24,
        backgroundColor: COLORS.primaryDark,
        padding: 24,
        position: "relative",
    },
    heroCircle: {
        position: "absolute",
        right: -55,
        top: -70,
        width: 190,
        height: 190,
        borderRadius: 100,
        borderWidth: 28,
        borderColor: "rgba(255,255,255,0.08)",
    },
    heroContent: {
        zIndex: 2,
    },
    heroGreeting: {
        color: "#BCEDEF",
        fontSize: 14,
        fontWeight: "700",
    },
    heroName: {
        marginTop: 3,
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: "800",
        letterSpacing: -0.5,
    },
    heroDescription: {
        marginTop: 14,
        maxWidth: 600,
        color: "#D6F4F5",
        fontSize: 14,
        lineHeight: 21,
    },
    onlinePill: {
        alignSelf: "flex-start",
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: "rgba(255,255,255,0.12)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.18)",
    },
    onlineText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "700",
    },

    dateCard: {
        flex: 0.8,
        minHeight: 210,
        borderRadius: 24,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: "#DDF0F1",
        padding: 20,
        justifyContent: "space-between",
    },
    dateTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    dateIcon: {
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primaryLight,
    },
    livePill: {
        borderRadius: 999,
        backgroundColor: "#ECFDF5",
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    liveText: {
        color: "#15803D",
        fontSize: 11,
        fontWeight: "800",
    },
    dateText: {
        marginTop: 12,
        color: COLORS.text,
        fontSize: 23,
        fontWeight: "800",
    },
    weekday: {
        marginTop: 3,
        color: COLORS.muted,
        fontSize: 13,
    },
    timeRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingTop: 14,
    },
    timeText: {
        color: "#334155",
        fontSize: 14,
        fontWeight: "700",
    },

    card: {
        borderRadius: 18,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 18,
    },

    licenseTop: {
        gap: 18,
    },
    licenseLabelRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 9,
        flexWrap: "wrap",
    },
    licenseBadge: {
        color: COLORS.primaryDark,
        backgroundColor: "#DDF5F6",
        paddingHorizontal: 9,
        paddingVertical: 5,
        borderRadius: 999,
        fontSize: 10,
        fontWeight: "900",
        letterSpacing: 1.2,
    },
    smallMuted: {
        color: COLORS.muted,
        fontSize: 11,
        fontWeight: "600",
    },
    licenseTitle: {
        marginTop: 10,
        color: COLORS.text,
        fontSize: 21,
        fontWeight: "800",
    },
    licenseTitleMuted: {
        color: COLORS.muted,
        fontSize: 13,
        fontWeight: "400",
    },
    licenseDescription: {
        marginTop: 5,
        color: COLORS.muted,
        fontSize: 12,
        lineHeight: 18,
        maxWidth: 720,
    },
    licenseStats: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 10,
    },
    licenseStat: {
        minWidth: 76,
        paddingHorizontal: 12,
        paddingVertical: 9,
        alignItems: "center",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        backgroundColor: "#F8FAFC",
    },
    remainingStat: {
        borderColor: "#BBF7D0",
        backgroundColor: "#F0FDF4",
    },
    statCaption: {
        color: COLORS.muted,
        fontSize: 9,
        fontWeight: "800",
        letterSpacing: 0.8,
    },
    statValue: {
        marginTop: 3,
        color: COLORS.text,
        fontSize: 17,
        fontWeight: "800",
    },
    primaryButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        paddingHorizontal: 14,
        paddingVertical: 11,
    },
    primaryButtonText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "800",
    },
    licenseProgressHeader: {
        marginTop: 18,
        marginBottom: 6,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    progressBlock: {
        gap: 7,
    },
    progressHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    progressLabel: {
        color: "#475569",
        fontSize: 11,
        fontWeight: "700",
    },
    progressValue: {
        color: COLORS.text,
        fontSize: 11,
        fontWeight: "800",
    },
    progressTrack: {
        height: 9,
        overflow: "hidden",
        borderRadius: 99,
        backgroundColor: "#EEF2F7",
    },
    progressFill: {
        height: "100%",
        borderRadius: 99,
        backgroundColor: COLORS.primary,
    },

    kpiGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: -4,
    },
    kpiGridTablet: {
        marginHorizontal: -5,
    },
    kpiWrapper: {
        padding: 4,
    },
    kpiCard: {
        minHeight: 150,
        borderRadius: 16,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 15,
    },
    kpiTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primaryLight,
    },
    kpiValue: {
        marginTop: 14,
        color: COLORS.text,
        fontSize: 23,
        fontWeight: "800",
    },
    kpiLabel: {
        marginTop: 2,
        color: "#334155",
        fontSize: 13,
        fontWeight: "700",
    },
    kpiHelper: {
        marginTop: 3,
        color: COLORS.muted,
        fontSize: 10,
        lineHeight: 14,
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 10,
        marginBottom: 15,
    },
    sectionTitle: {
        color: COLORS.text,
        fontSize: 15,
        fontWeight: "800",
    },
    sectionSubtitle: {
        marginTop: 3,
        color: COLORS.muted,
        fontSize: 11,
        lineHeight: 16,
    },
    actionText: {
        color: COLORS.primary,
        fontSize: 11,
        fontWeight: "800",
    },

    managerGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: -5,
    },
    managerItem: {
        width: "50%",
        padding: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    managerIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E8F7F8",
    },
    managerTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    managerLabel: {
        flex: 1,
        color: COLORS.text,
        fontSize: 11,
        fontWeight: "800",
    },
    managerDescription: {
        marginTop: 2,
        color: COLORS.muted,
        fontSize: 10,
    },
    countBadge: {
        minWidth: 24,
        alignItems: "center",
        borderRadius: 999,
        paddingHorizontal: 7,
        paddingVertical: 3,
        backgroundColor: "#DDF5F6",
    },
    countText: {
        color: COLORS.primaryDark,
        fontSize: 10,
        fontWeight: "800",
    },

    twoColumn: {
        gap: 16,
    },
    twoColumnWide: {
        flexDirection: "row",
        alignItems: "stretch",
    },

    chart: {
        height: 250,
        paddingTop: 8,
    },
    chartGrid: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-around",
        position: "relative",
        paddingHorizontal: 8,
    },
    chartLine: {
        position: "absolute",
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: "#EEF2F7",
    },
    barColumn: {
        height: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingHorizontal: 5,
        zIndex: 2,
    },
    barValue: {
        marginBottom: 5,
        color: COLORS.muted,
        fontSize: 9,
        fontWeight: "700",
    },
    bar: {
        width: "58%",
        minWidth: 12,
        maxWidth: 28,
        borderRadius: 8,
        backgroundColor: COLORS.primary,
    },
    barLabel: {
        marginTop: 8,
        color: COLORS.muted,
        fontSize: 10,
        fontWeight: "600",
    },

    shipmentChartArea: {
        minHeight: 235,
        flexDirection: "row",
        alignItems: "center",
        gap: 18,
    },
    donut: {
        width: 145,
        height: 145,
        borderRadius: 100,
        borderWidth: 22,
        borderColor: COLORS.primary,
        borderRightColor: COLORS.green,
        borderBottomColor: COLORS.amber,
        alignItems: "center",
        justifyContent: "center",
    },
    donutInner: {
        alignItems: "center",
        justifyContent: "center",
    },
    donutValue: {
        color: COLORS.text,
        fontSize: 23,
        fontWeight: "800",
    },
    donutCaption: {
        marginTop: 1,
        color: COLORS.muted,
        fontSize: 9,
        fontWeight: "800",
        letterSpacing: 0.8,
    },
    legendRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
    },
    legendLeft: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
    },
    legendDot: {
        width: 9,
        height: 9,
        borderRadius: 99,
    },
    legendText: {
        color: "#475569",
        fontSize: 10,
        fontWeight: "600",
    },
    legendValue: {
        color: COLORS.text,
        fontSize: 11,
        fontWeight: "800",
    },

    approvalRow: {
        minHeight: 58,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        padding: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    approvalIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primaryLight,
    },
    approvalName: {
        color: "#334155",
        fontSize: 12,
        fontWeight: "800",
    },
    approvalType: {
        marginTop: 2,
        color: COLORS.muted,
        fontSize: 10,
    },
    pendingBadge: {
        borderRadius: 999,
        backgroundColor: "#FFF7ED",
        paddingHorizontal: 9,
        paddingVertical: 5,
    },
    pendingText: {
        color: COLORS.amber,
        fontSize: 9,
        fontWeight: "800",
    },

    activityRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },
    activityDot: {
        width: 9,
        height: 9,
        marginTop: 4,
        borderRadius: 99,
        backgroundColor: COLORS.primary,
    },
    activityTitle: {
        color: "#334155",
        fontSize: 11,
        fontWeight: "700",
        lineHeight: 16,
    },
    activityMeta: {
        marginTop: 2,
        color: COLORS.muted,
        fontSize: 9,
    },

    quickGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: -4,
    },
    quickAction: {
        width: "50%",
        minHeight: 58,
        padding: 4,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    quickIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F8FAFC",
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    quickLabel: {
        flex: 1,
        color: "#334155",
        fontSize: 11,
        fontWeight: "700",
    },
    operationsHeader: {
        position: "absolute",
        right: 18,
        top: 20,
    },
});
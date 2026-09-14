import React, { ReactNode } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import dayjs from "dayjs";
import {
    ArrowDownRight,
    ArrowRight,
    ArrowUpRight,
    BarChart3,
    CheckCircle2,
    Clock3,
    Package,
    RefreshCw,
    TrendingUp,
    Users,
} from "lucide-react-native";

/**
 * All dashboard components are kept in this file so the dashboard can be
 * dropped into an Expo/React Native project without creating separate
 * component files.
 *
 * Expected hook shape (adapt as necessary to your existing hook):
 *
 * const {
 *   data,
 *   isLoading,
 *   isError,
 *   error,
 *   refetch,
 * } = useExecutiveDashboard();
 *
 * The components intentionally accept flexible data shapes so they can be
 * connected to your existing API response without changing the UI.
 */

const COLORS = {
    primary: "#0FA4AF",
    primaryDark: "#003135",
    primarySoft: "#E8F7F8",
    background: "#F8FAFC",
    card: "#FFFFFF",
    text: "#0F172A",
    secondaryText: "#334155",
    muted: "#64748B",
    border: "#E2E8F0",
    success: "#16A34A",
    successSoft: "#F0FDF4",
    warning: "#D97706",
    warningSoft: "#FFF7ED",
    danger: "#DC2626",
    dangerSoft: "#FEF2F2",
};

type AnyRecord = Record<string, any>;

type StatItem = {
    id?: string | number;
    label: string;
    value: string | number;
    helper?: string;
    trend?: number;
    trendLabel?: string;
    icon?: React.ComponentType<any>;
    iconColor?: string;
};

type StatsGridProps = {
    children?: ReactNode;
    stats?: StatItem[];
    columns?: 1 | 2 | 3 | 4;
};

type StatCardProps = {
    label: string;
    value: string | number;
    helper?: string;
    trend?: number;
    trendLabel?: string;
    icon?: React.ComponentType<any>;
    iconColor?: string;
};

type SectionCardProps = {
    title: string;
    subtitle?: string;
    actionLabel?: string;
    onActionPress?: () => void;
    children: ReactNode;
};

type ActivityItem = {
    id?: string | number;
    title?: string;
    description?: string;
    user?: string;
    module?: string;
    createdAt?: string;
    timestamp?: string;
    status?: string;
};

type ActivityTimelineProps = {
    activities?: ActivityItem[];
    limit?: number;
};

type EmptyDashboardProps = {
    title?: string;
    message?: string;
};

type ErrorStateProps = {
    title?: string;
    message?: string;
    onRetry?: () => void;
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function firstDefined<T>(...values: T[]): T | undefined {
    return values.find(
        (value) => value !== undefined && value !== null && value !== ""
    );
}

function numberValue(value: any, fallback = 0): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}

function stringValue(value: any, fallback = ""): string {
    return value === undefined || value === null ? fallback : String(value);
}

function readableLabel(value: any): string {
    return stringValue(value)
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatNumber(value: any): string {
    return numberValue(value).toLocaleString();
}

function formatDate(value?: string) {
    if (!value) return "";

    const parsed = dayjs(value);
    if (!parsed.isValid()) return value;

    return parsed.format("DD MMM YYYY, hh:mm A");
}

/* -------------------------------------------------------------------------- */
/* StatCard                                                                   */
/* -------------------------------------------------------------------------- */

export function StatCard({
    label,
    value,
    helper,
    trend,
    trendLabel,
    icon: Icon = BarChart3,
    iconColor = COLORS.primary,
}: StatCardProps) {
    const hasTrend = typeof trend === "number";
    const positive = numberValue(trend) >= 0;

    return (
        <View style={styles.statCard}>
            <View style={styles.statTopRow}>
                <View
                    style={[
                        styles.statIcon,
                        { backgroundColor: `${iconColor}18` },
                    ]}
                >
                    <Icon size={20} color={iconColor} />
                </View>

                {hasTrend ? (
                    <View
                        style={[
                            styles.trendBadge,
                            {
                                backgroundColor: positive
                                    ? COLORS.successSoft
                                    : COLORS.dangerSoft,
                            },
                        ]}
                    >
                        {positive ? (
                            <ArrowUpRight size={13} color={COLORS.success} />
                        ) : (
                            <ArrowDownRight size={13} color={COLORS.danger} />
                        )}

                        <Text
                            style={[
                                styles.trendText,
                                {
                                    color: positive ? COLORS.success : COLORS.danger,
                                },
                            ]}
                        >
                            {Math.abs(trend).toFixed(1)}%
                        </Text>
                    </View>
                ) : null}
            </View>

            <Text style={styles.statValue}>
                {typeof value === "number" ? formatNumber(value) : value}
            </Text>

            <Text style={styles.statLabel}>{label}</Text>

            {helper ? <Text style={styles.statHelper}>{helper}</Text> : null}

            {trendLabel ? (
                <Text style={styles.trendLabel}>{trendLabel}</Text>
            ) : null}
        </View>
    );
}

/* -------------------------------------------------------------------------- */
/* StatsGrid                                                                  */
/* -------------------------------------------------------------------------- */

export function StatsGrid({
    stats = [],
    children,
    columns = 2,
}: StatsGridProps) {
    if (children) {
        return <View style={styles.statsGrid}>{children}</View>;
    }

    const width =
        columns === 4 ? "25%" : columns === 3 ? "33.3333%" : "50%";

    return (
        <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
                <View
                    key={stat.id ?? `${stat.label}-${index}`}
                    style={[styles.statWrapper, { width }]}
                >
                    <StatCard {...stat} />
                </View>
            ))}
        </View>
    );
}

/* -------------------------------------------------------------------------- */
/* SectionCard                                                                */
/* -------------------------------------------------------------------------- */

export function SectionCard({
    title,
    subtitle,
    actionLabel,
    onActionPress,
    children,
}: SectionCardProps) {
    return (
        <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.sectionTitle}>{title}</Text>

                    {subtitle ? (
                        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
                    ) : null}
                </View>

                {actionLabel ? (
                    <Pressable
                        onPress={onActionPress}
                        style={({ pressed }) => [
                            styles.sectionAction,
                            pressed && { opacity: 0.65 },
                        ]}
                    >
                        <Text style={styles.sectionActionText}>{actionLabel}</Text>
                        <ArrowRight size={14} color={COLORS.primary} />
                    </Pressable>
                ) : null}
            </View>

            {children}
        </View>
    );
}

/* -------------------------------------------------------------------------- */
/* ActivityTimeline                                                           */
/* -------------------------------------------------------------------------- */

export function ActivityTimeline({
    activities = [],
    limit = 6,
}: ActivityTimelineProps) {
    const visibleActivities = activities.slice(0, limit);

    if (!visibleActivities.length) {
        return (
            <View style={styles.timelineEmpty}>
                <Clock3 size={20} color={COLORS.muted} />
                <Text style={styles.timelineEmptyText}>
                    No recent activity available.
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.timeline}>
            {visibleActivities.map((activity, index) => {
                const last = index === visibleActivities.length - 1;

                const title =
                    firstDefined(
                        activity.title,
                        activity.description,
                        `${readableLabel(activity.module)} activity`
                    ) || "Dashboard activity";

                const actor =
                    firstDefined(
                        activity.user,
                        activity.module ? readableLabel(activity.module) : undefined,
                        "System"
                    ) || "System";

                const date = firstDefined(
                    activity.createdAt,
                    activity.timestamp
                );

                return (
                    <View
                        key={activity.id ?? `${title}-${index}`}
                        style={styles.timelineItem}
                    >
                        <View style={styles.timelineRail}>
                            <View style={styles.timelineDot} />
                            {!last ? <View style={styles.timelineLine} /> : null}
                        </View>

                        <View style={styles.timelineContent}>
                            <View style={styles.timelineTitleRow}>
                                <Text style={styles.timelineTitle} numberOfLines={2}>
                                    {title}
                                </Text>

                                {activity.status ? (
                                    <View style={styles.activityStatus}>
                                        <Text style={styles.activityStatusText}>
                                            {readableLabel(activity.status)}
                                        </Text>
                                    </View>
                                ) : null}
                            </View>

                            <Text style={styles.timelineMeta}>
                                {actor}
                                {date ? ` · ${formatDate(date)}` : ""}
                            </Text>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}

/* -------------------------------------------------------------------------- */
/* EmptyDashboard                                                             */
/* -------------------------------------------------------------------------- */

export function EmptyDashboard({
    title = "No dashboard data",
    message = "There is currently no data available to display.",
}: EmptyDashboardProps) {
    return (
        <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
                <BarChart3 size={24} color={COLORS.primary} />
            </View>

            <Text style={styles.emptyTitle}>{title}</Text>
            <Text style={styles.emptyMessage}>{message}</Text>
        </View>
    );
}

/* -------------------------------------------------------------------------- */
/* ErrorState                                                                 */
/* -------------------------------------------------------------------------- */

export function ErrorState({
    title = "Unable to load dashboard",
    message = "Something went wrong while loading the dashboard.",
    onRetry,
}: ErrorStateProps) {
    return (
        <View style={styles.errorState}>
            <View style={styles.errorIcon}>
                <RefreshCw size={22} color={COLORS.danger} />
            </View>

            <Text style={styles.errorTitle}>{title}</Text>
            <Text style={styles.errorMessage}>{message}</Text>

            {onRetry ? (
                <Pressable
                    onPress={onRetry}
                    style={({ pressed }) => [
                        styles.retryButton,
                        pressed && { opacity: 0.75 },
                    ]}
                >
                    <RefreshCw size={15} color="#FFFFFF" />
                    <Text style={styles.retryButtonText}>Try Again</Text>
                </Pressable>
            ) : null}
        </View>
    );
}

/* -------------------------------------------------------------------------- */
/* Executive Dashboard                                                        */
/* -------------------------------------------------------------------------- */

export default function ExecutiveDashboard() {
    // const auth: any = useAuth();
    const dashboard = useExecutiveDashboard();

    const user =
        auth?.user ??
        auth?.currentUser ??
        auth?.data?.user ??
        {};

    const rawData =
        dashboard?.data?.data ??
        dashboard?.data ??
        {};

    const isLoading = Boolean(
        dashboard?.isLoading ??
        dashboard?.loading ??
        dashboard?.isFetching
    );

    const isError = Boolean(dashboard?.isError ?? dashboard?.error);

    const refetch =
        typeof dashboard?.refetch === "function"
            ? dashboard.refetch
            : undefined;

    if (isLoading) {
        return (
            <View style={styles.centerState}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Loading dashboard...</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <ScrollView
                style={styles.screen}
                contentContainerStyle={styles.errorContainer}
            >
                <ErrorState
                    message={
                        stringValue(
                            dashboard?.error?.message,
                            "Unable to fetch executive dashboard data."
                        )
                    }
                    onRetry={refetch}
                />
            </ScrollView>
        );
    }

    const cards =
        rawData?.cards ??
        rawData?.stats ??
        rawData?.summary ??
        {};

    const activities =
        rawData?.recentActivities ??
        rawData?.activities ??
        rawData?.recent_activity ??
        [];

    const stats: StatItem[] = [
        {
            label: "Total Employees",
            value: numberValue(
                firstDefined(
                    cards.totalEmployees,
                    cards.employees,
                    rawData.totalEmployees
                )
            ),
            helper: "Active organization workforce",
            icon: Users,
        },
        {
            label: "Active Customers",
            value: numberValue(
                firstDefined(
                    cards.activeCustomers,
                    cards.customers,
                    rawData.activeCustomers
                )
            ),
            helper: "Current customer accounts",
            icon: Users,
        },
        {
            label: "Total Orders",
            value: numberValue(
                firstDefined(
                    cards.totalOrders,
                    cards.orders,
                    rawData.totalOrders
                )
            ),
            helper: "Orders across the organization",
            icon: Package,
        },
        {
            label: "Completed Orders",
            value: numberValue(
                firstDefined(
                    cards.completedOrders,
                    rawData.completedOrders
                )
            ),
            helper: "Successfully completed",
            icon: CheckCircle2,
            iconColor: COLORS.success,
        },
        {
            label: "Revenue",
            value: firstDefined(
                cards.revenueFormatted,
                cards.revenue,
                rawData.revenueFormatted,
                rawData.revenue,
                "₹0"
            ) as string | number,
            helper: "Current reported revenue",
            icon: TrendingUp,
        },
        {
            label: "Pending Tasks",
            value: numberValue(
                firstDefined(
                    cards.pendingTasks,
                    cards.pending,
                    rawData.pendingTasks
                )
            ),
            helper: "Items requiring attention",
            icon: Clock3,
            iconColor: COLORS.warning,
        },
    ];

    const firstName =
        stringValue(
            firstDefined(
                user?.firstName,
                user?.first_name,
                user?.name
            ),
            "Admin"
        ).split(" ")[0];

    const greeting =
        dayjs().hour() < 12
            ? "Good morning"
            : dayjs().hour() < 18
                ? "Good afternoon"
                : "Good evening";

    return (
        <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.greeting}>{greeting},</Text>
                    <Text style={styles.name}>{firstName}</Text>
                    <Text style={styles.headerDescription}>
                        Here&apos;s an overview of your organization&apos;s current performance
                        and activity.
                    </Text>
                </View>

                <View style={styles.dateBox}>
                    <CalendarIcon />
                    <Text style={styles.dateText}>
                        {dayjs().format("DD MMM")}
                    </Text>
                </View>
            </View>

            {/* Stats */}
            <StatsGrid stats={stats} columns={2} />

            {/* Recent Activity */}
            <SectionCard
                title="Recent Activity"
                subtitle="Latest organization events"
                actionLabel="View All"
            >
                <ActivityTimeline activities={activities} />
            </SectionCard>

            {/* Performance summary */}
            <SectionCard
                title="Performance Overview"
                subtitle="High-level operational indicators"
            >
                <View style={styles.performanceGrid}>
                    <PerformanceItem
                        label="Order Completion"
                        value={numberValue(
                            firstDefined(
                                cards.orderCompletion,
                                cards.order_completion,
                                rawData.orderCompletion
                            )
                        )}
                    />

                    <PerformanceItem
                        label="Customer Growth"
                        value={numberValue(
                            firstDefined(
                                cards.customerGrowth,
                                cards.customer_growth,
                                rawData.customerGrowth
                            )
                        )}
                    />

                    <PerformanceItem
                        label="Task Completion"
                        value={numberValue(
                            firstDefined(
                                cards.taskCompletion,
                                cards.task_completion,
                                rawData.taskCompletion
                            )
                        )}
                    />
                </View>
            </SectionCard>

            {/* Empty state if API returned nothing */}
            {!Object.keys(rawData || {}).length ? (
                <EmptyDashboard
                    title="Dashboard is empty"
                    message="Connect your executive dashboard API to start showing live data."
                />
            ) : null}
        </ScrollView>
    );
}

/* -------------------------------------------------------------------------- */
/* Small internal components                                                  */
/* -------------------------------------------------------------------------- */

function CalendarIcon() {
    return (
        <View style={styles.calendarIcon}>
            <Text style={styles.calendarIconText}>
                {dayjs().format("D")}
            </Text>
        </View>
    );
}

function PerformanceItem({
    label,
    value,
}: {
    label: string;
    value: number;
}) {
    const percentage = Math.max(0, Math.min(100, Math.round(value)));

    return (
        <View style={styles.performanceItem}>
            <View style={styles.performanceHeader}>
                <Text style={styles.performanceLabel}>{label}</Text>
                <Text style={styles.performanceValue}>{percentage}%</Text>
            </View>

            <View style={styles.performanceTrack}>
                <View
                    style={[
                        styles.performanceFill,
                        { width: `${percentage}%` },
                    ]}
                />
            </View>
        </View>
    );
}

/* -------------------------------------------------------------------------- */
/* Styles                                                                     */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    container: {
        padding: 16,
        paddingBottom: 32,
        gap: 16,
    },

    header: {
        minHeight: 150,
        padding: 20,
        borderRadius: 22,
        backgroundColor: COLORS.primaryDark,
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 14,
        overflow: "hidden",
    },

    greeting: {
        color: "#BCEDEF",
        fontSize: 13,
        fontWeight: "700",
    },

    name: {
        marginTop: 2,
        color: "#FFFFFF",
        fontSize: 28,
        fontWeight: "800",
    },

    headerDescription: {
        marginTop: 8,
        maxWidth: 600,
        color: "#D6F4F5",
        fontSize: 12,
        lineHeight: 18,
    },

    dateBox: {
        minWidth: 58,
        alignItems: "center",
        padding: 8,
        borderRadius: 13,
        backgroundColor: "rgba(255,255,255,0.1)",
    },

    calendarIcon: {
        width: 31,
        height: 31,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
    },

    calendarIconText: {
        color: COLORS.primaryDark,
        fontSize: 13,
        fontWeight: "800",
    },

    dateText: {
        marginTop: 5,
        color: "#FFFFFF",
        fontSize: 10,
        fontWeight: "700",
    },

    statsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginHorizontal: -4,
    },

    statWrapper: {
        padding: 4,
    },

    statCard: {
        minHeight: 145,
        padding: 15,
        borderRadius: 16,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    statTopRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    statIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },

    statValue: {
        marginTop: 14,
        color: COLORS.text,
        fontSize: 23,
        fontWeight: "800",
    },

    statLabel: {
        marginTop: 2,
        color: COLORS.secondaryText,
        fontSize: 12,
        fontWeight: "800",
    },

    statHelper: {
        marginTop: 4,
        color: COLORS.muted,
        fontSize: 10,
        lineHeight: 14,
    },

    trendBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        paddingHorizontal: 7,
        paddingVertical: 4,
        borderRadius: 999,
    },

    trendText: {
        fontSize: 9,
        fontWeight: "800",
    },

    trendLabel: {
        marginTop: 3,
        color: COLORS.muted,
        fontSize: 9,
    },

    sectionCard: {
        padding: 17,
        borderRadius: 18,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    sectionHeader: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
        marginBottom: 14,
    },

    sectionTitle: {
        color: COLORS.text,
        fontSize: 15,
        fontWeight: "800",
    },

    sectionSubtitle: {
        marginTop: 3,
        color: COLORS.muted,
        fontSize: 10,
        lineHeight: 15,
    },

    sectionAction: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        paddingVertical: 3,
    },

    sectionActionText: {
        color: COLORS.primary,
        fontSize: 10,
        fontWeight: "800",
    },

    timeline: {
        gap: 0,
    },

    timelineItem: {
        flexDirection: "row",
        minHeight: 65,
    },

    timelineRail: {
        width: 18,
        alignItems: "center",
        position: "relative",
    },

    timelineDot: {
        width: 9,
        height: 9,
        marginTop: 4,
        borderRadius: 99,
        backgroundColor: COLORS.primary,
        zIndex: 2,
    },

    timelineLine: {
        position: "absolute",
        top: 13,
        bottom: -1,
        width: 1,
        backgroundColor: "#DDE7EA",
    },

    timelineContent: {
        flex: 1,
        paddingLeft: 8,
        paddingBottom: 13,
    },

    timelineTitleRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 8,
    },

    timelineTitle: {
        flex: 1,
        color: COLORS.secondaryText,
        fontSize: 11,
        fontWeight: "700",
        lineHeight: 16,
    },

    timelineMeta: {
        marginTop: 3,
        color: COLORS.muted,
        fontSize: 9,
    },

    activityStatus: {
        borderRadius: 999,
        backgroundColor: COLORS.primarySoft,
        paddingHorizontal: 7,
        paddingVertical: 3,
    },

    activityStatusText: {
        color: COLORS.primaryDark,
        fontSize: 8,
        fontWeight: "800",
    },

    timelineEmpty: {
        minHeight: 90,
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
    },

    timelineEmptyText: {
        color: COLORS.muted,
        fontSize: 11,
    },

    emptyState: {
        minHeight: 150,
        padding: 20,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    emptyIcon: {
        width: 48,
        height: 48,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primarySoft,
    },

    emptyTitle: {
        marginTop: 10,
        color: COLORS.text,
        fontSize: 14,
        fontWeight: "800",
    },

    emptyMessage: {
        marginTop: 4,
        maxWidth: 300,
        textAlign: "center",
        color: COLORS.muted,
        fontSize: 10,
        lineHeight: 16,
    },

    errorState: {
        minHeight: 230,
        padding: 22,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: "#FECACA",
    },

    errorIcon: {
        width: 48,
        height: 48,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.dangerSoft,
    },

    errorTitle: {
        marginTop: 12,
        color: COLORS.text,
        fontSize: 15,
        fontWeight: "800",
    },

    errorMessage: {
        marginTop: 5,
        maxWidth: 320,
        textAlign: "center",
        color: COLORS.muted,
        fontSize: 11,
        lineHeight: 17,
    },

    retryButton: {
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        borderRadius: 11,
        backgroundColor: COLORS.primary,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },

    retryButtonText: {
        color: "#FFFFFF",
        fontSize: 11,
        fontWeight: "800",
    },

    centerState: {
        flex: 1,
        minHeight: 300,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.background,
    },

    loadingText: {
        marginTop: 10,
        color: COLORS.muted,
        fontSize: 11,
        fontWeight: "600",
    },

    errorContainer: {
        flexGrow: 1,
        padding: 16,
        justifyContent: "center",
    },

    performanceGrid: {
        gap: 16,
    },

    performanceItem: {
        gap: 7,
    },

    performanceHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    performanceLabel: {
        color: COLORS.secondaryText,
        fontSize: 11,
        fontWeight: "700",
    },

    performanceValue: {
        color: COLORS.text,
        fontSize: 11,
        fontWeight: "800",
    },

    performanceTrack: {
        height: 8,
        overflow: "hidden",
        borderRadius: 99,
        backgroundColor: "#EEF2F7",
    },

    performanceFill: {
        height: "100%",
        borderRadius: 99,
        backgroundColor: COLORS.primary,
    },
});

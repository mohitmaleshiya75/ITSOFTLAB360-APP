// import useCurrentUser from "@/features/auth/hooks/useCurrentUser";
// import useGetActiveAnnouncements from "@/features/announcements/hooks/useGetActiveAnnouncements";
// import useGetBirthday from "@/features/birthdays/hooks/useGetBirthdays";
// import useGetDashboardStats from "@/features/dashboard/hooks/useGetDashboardStats";
// import useGetHolidays from "@/features/holidays/hooks/useGetHolidays";
// import useGetPerformanceAnalytics from "@/features/dashboard/hooks/performace";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View
} from "react-native";
// import DashboardSkeleton from "../skelaton/DashboardSkelaton";

/**
 * ============================================================
 * FAKE DATA MODE
 * ============================================================
 *
 * true  = Dashboard uses dummy data
 * false = Dashboard uses real API data
 *
 * Change this to false when you are ready to connect the API.
 */
const USE_FAKE_DATA = true;

/**
 * ============================================================
 * FAKE USER
 * ============================================================
 */
const FAKE_USER = {
    id: 1,
    first_name: "Rahul",
    last_name: "Ahirwal",
    username: "rahul.ahirwal",
    email: "rahul.ahirwal@itsoftlab.com",
    profile_image_url:
        "https://ui-avatars.com/api/?name=Rahul+Ahirwal&background=10b981&color=fff&size=200",
};

/**
 * ============================================================
 * FAKE DASHBOARD STATS
 * ============================================================
 */
const FAKE_ADMIN_STATS = {
    employee_count: 48,
    present_count: 41,
    absent_count: 7,
    pending_leave_requests: 5,
};

/**
 * ============================================================
 * FAKE PERFORMANCE DATA
 * ============================================================
 */
const FAKE_PERFORMANCE = {
    employee_name: "Rahul Ahirwal",
    performance_score: 87.5,
    grade: "A",
    total_tasks: 40,
    completed_tasks: 35,
    on_time_tasks: 32,
    rework_tasks: 3,
    blocked_tasks: 2,
    daily_updates: 28,
};

/**
 * ============================================================
 * FAKE ANNOUNCEMENTS
 * ============================================================
 */
const FAKE_ANNOUNCEMENTS = [
    {
        id: 1,
        title: "Monthly Town Hall Meeting",
        message:
            "The monthly company town hall meeting will be held this Friday at 4:00 PM.",
        created_by_name: "HR Department",
    },
    {
        id: 2,
        title: "New Attendance Policy",
        message:
            "Please make sure to mark your attendance from the HRMS mobile application.",
        created_by_name: "Rahul Ahirwal",
    },
    {
        id: 3,
        title: "Performance Review",
        message:
            "Quarterly performance reviews are now available. Please review your goals.",
        created_by_name: "HR Department",
    },
];

/**
 * ============================================================
 * FAKE BIRTHDAYS
 * ============================================================
 */
const FAKE_BIRTHDAYS = [
    {
        id: 1,
        first_name: "Aman",
        last_name: "Sharma",
        date_of_birth: "September 16",
        profile_image_url:
            "https://ui-avatars.com/api/?name=Aman+Sharma&background=10b981&color=fff",
    },
    {
        id: 2,
        first_name: "Priya",
        last_name: "Verma",
        date_of_birth: "September 19",
        profile_image_url:
            "https://ui-avatars.com/api/?name=Priya+Verma&background=10b981&color=fff",
    },
    {
        id: 3,
        first_name: "Vikas",
        last_name: "Kumar",
        date_of_birth: "September 24",
        profile_image_url:
            "https://ui-avatars.com/api/?name=Vikas+Kumar&background=10b981&color=fff",
    },
];

/**
 * ============================================================
 * FAKE HOLIDAYS
 * ============================================================
 */
const FAKE_HOLIDAYS = [
    {
        id: 1,
        occasion: "Gandhi Jayanti",
        date: "October 2, 2026",
    },
    {
        id: 2,
        occasion: "Dussehra",
        date: "October 20, 2026",
    },
    {
        id: 3,
        occasion: "Diwali",
        date: "November 8, 2026",
    },
];

/**
 * ============================================================
 * DASHBOARD
 * ============================================================
 */
export default function DashboardScreen() {
    const theme = useColorScheme();
    const router = useRouter();

    const isDark = theme === "dark";

    /**
     * ============================================================
     * REAL API HOOKS
     * ============================================================
     *
     * These are still called so you can simply turn fake mode off
     * later without changing the component structure.
     */

    // const  apiUser = FAKE_USER

    // const birthdays  = FAKE_BIRTHDAYS

    // const data = FAKE_ANNOUNCEMENTS 

    // const  apiAdminStats = FAKE_ADMIN_STATS

    // const {
    //     holidays: apiHolidays = [],
    //     isLoading: LoadingHolidays,
    // } = useGetHolidays();

    // const {
    //     performance: apiPerformance,
    //     isLoading: LoadingPerformance,
    // } = useGetPerformanceAnalytics(Number(apiUser?.id) || 0);

    /**
     * ============================================================
     * DATA SELECTION
     * ============================================================
     *
     * If USE_FAKE_DATA is true:
     *
     * fake data is displayed.
     *
     * Otherwise:
     *
     * API data is displayed.
     */

    const user = FAKE_USER

    const upcomingEvents = FAKE_BIRTHDAYS

    const announcements = FAKE_ANNOUNCEMENTS

    const AdminStats = FAKE_ADMIN_STATS
    const holidays = FAKE_HOLIDAYS

    const performance = FAKE_PERFORMANCE

    /**
     * ============================================================
     * REFRESH
     * ============================================================
     */

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    }, []);

    /**
     * ============================================================
     * ATTENDANCE
     * ============================================================
     */

    const attendancePercentage = Math.round(
        ((AdminStats?.present_count || 0) /
            (AdminStats?.employee_count || 1)) *
        100
    );

    /**
     * ============================================================
     * PERFORMANCE
     * ============================================================
     */

    const performanceScore =
        performance?.performance_score || 0;

    const completionRate = useMemo(() => {
        const total = performance?.total_tasks || 0;
        const completed = performance?.completed_tasks || 0;

        return total > 0
            ? Math.round((completed / total) * 100)
            : 0;
    }, [
        performance?.completed_tasks,
        performance?.total_tasks,
    ]);

    const onTimeRate = useMemo(() => {
        const completed = performance?.completed_tasks || 0;
        const onTime = performance?.on_time_tasks || 0;

        return completed > 0
            ? Math.round((onTime / completed) * 100)
            : 0;
    }, [
        performance?.completed_tasks,
        performance?.on_time_tasks,
    ]);

    const reworkRate = useMemo(() => {
        const total = performance?.total_tasks || 0;
        const rework = performance?.rework_tasks || 0;

        return total > 0
            ? Math.round((rework / total) * 100)
            : 0;
    }, [
        performance?.rework_tasks,
        performance?.total_tasks,
    ]);

    const blockedRate = useMemo(() => {
        const total = performance?.total_tasks || 0;
        const blocked = performance?.blocked_tasks || 0;

        return total > 0
            ? Math.round((blocked / total) * 100)
            : 0;
    }, [
        performance?.blocked_tasks,
        performance?.total_tasks,
    ]);

    /**
     * ============================================================
     * PERFORMANCE MESSAGE
     * ============================================================
     */

    const performanceMessage = useMemo(() => {
        if (!performance) {
            return "Your performance summary will appear here.";
        }

        if (performanceScore >= 90) {
            return "Excellent work — you are performing at a very high level.";
        }

        if (performanceScore >= 75) {
            return "Strong performance — keep pushing for consistency.";
        }

        if (performanceScore >= 60) {
            return "Solid progress — focus on improving completion and timing.";
        }

        return "Performance needs attention — review blocked tasks and late deliveries.";
    }, [performance, performanceScore]);

    /**
     * ============================================================
     * LOADING
     * ============================================================
     *
     * IMPORTANT:
     *
     * In fake mode we DO NOT show the skeleton.
     *
     * Otherwise the fake data would still appear to be loading
     * because the real API hooks may be loading.
     */

    // if (
    //     !USE_FAKE_DATA &&
    //     (
    //         LoadingDashboardStats ||
    //         LoadingAnnouncements ||
    //         LoadingBirthday ||
    //         LoadingHolidays ||
    //         LoadingPerformance
    //     )
    // ) {
    //     return <DashboardSkeleton />;
    // }

    /**
     * ============================================================
     * STATS
     * ============================================================
     */

    // const stats: Array<{
    //     title: string;
    //     value: number;
    //     icon: keyof typeof Ionicons.glyphMap;
    //     color: string;
    //     onPress?: () => void;
    // }> = [
    //         {
    //             title: "Total Employees",
    //             value: AdminStats?.employee_count || 0,
    //             icon: "people-outline",
    //             color: "#10b981",
    //             onPress: () =>
    //                 router.push("/screens/AllEmployees"),
    //         },
    //         {
    //             title: "Present Today",
    //             value: AdminStats?.present_count || 0,
    //             icon: "checkmark-circle-outline",
    //             color: "#10b981",
    //             onPress: () =>
    //                 router.push("/screens/PresentToday"),
    //         },
    //         {
    //             title: "Absent Today",
    //             value: AdminStats?.absent_count || 0,
    //             icon: "close-circle-outline",
    //             color: "#ef4444",
    //             onPress: () =>
    //                 router.push("/screens/AbsentToday"),
    //         },
    //         {
    //             title: "Pending Leaves",
    //             value: AdminStats?.pending_leave_requests || 0,
    //             icon: "document-text-outline",
    //             color: "#f59e0b",
    //             onPress: () =>
    //                 router.push("/screens/Leaves"),
    //         },
    //     ];

    /**
     * ============================================================
     * QUICK ACCESS
     * ============================================================
     */

    const features: Array<{
        title: string;
        description: string;
        icon: keyof typeof Ionicons.glyphMap;
        link: string;
    }> = [
            {
                title: "Mark Attendance",
                description: "Mark your attendance",
                icon: "location-outline",
                link: "/screens/Attendance",
            },
            {
                title: "Attendance",
                description: "Track your attendance",
                icon: "calendar-outline",
                link: "/screens/View Attendance",
            },
            {
                title: "Apply Leave",
                description: "Apply for leave",
                icon: "calendar-outline",
                link: "/screens/ApplyLeave",
            },
            {
                title: "Leave Requests",
                description: "Handle leave requests",
                icon: "calendar-number-outline",
                link: "/screens/Leaves",
            },
            {
                title: "Projects",
                description: "Check your tasks",
                icon: "calendar-number-outline",
                link: "/screens/Projects",
            },
        ];

    /**
     * ============================================================
     * DATE
     * ============================================================
     */

    const getFormattedDate = () => {
        return new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
        });
    };

    /**
     * ============================================================
     * PERFORMANCE BARS
     * ============================================================
     */

    const performanceBars = [
        {
            label: "Completion Rate",
            value: `${completionRate}%`,
            percent: completionRate,
            color: "#10b981",
        },
        {
            label: "On-Time Delivery",
            value: `${onTimeRate}%`,
            percent: onTimeRate,
            color: "#3b82f6",
        },
        {
            label: "Rework Rate",
            value: `${reworkRate}%`,
            percent: reworkRate,
            color: "#f59e0b",
        },
        {
            label: "Blocked Rate",
            value: `${blockedRate}%`,
            percent: blockedRate,
            color: "#ef4444",
        },
    ];

    /**
     * ============================================================
     * UI
     * ============================================================
     */

    return (
        <ScrollView
            style={[
                styles.container,
                {
                    backgroundColor: isDark
                        ? "#0f172a"
                        : "#f3f4f6",
                },
            ]}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            {/* =====================================================
          WELCOME HEADER
      ====================================================== */}

            <View
                style={[
                    styles.welcomeHeader,
                    {
                        backgroundColor: isDark
                            ? "#1e293b"
                            : "#fff",
                        borderColor: isDark
                            ? "#374151"
                            : "#dbeafe",
                    },
                ]}
            >
                <View style={styles.headerContent}>
                    <Text
                        style={[
                            styles.welcomeTitle,
                            {
                                color: isDark
                                    ? "#fff"
                                    : "#111",
                            },
                        ]}
                    >
                        Welcome Back 👋
                    </Text>

                    <Text
                        style={[
                            styles.dateText,
                            {
                                color: isDark
                                    ? "#9ca3af"
                                    : "#6b7280",
                            },
                        ]}
                    >
                        {getFormattedDate()}
                    </Text>

                    <Text
                        style={[
                            styles.subtitleText,
                            {
                                color: isDark
                                    ? "#9ca3af"
                                    : "#6b7280",
                            },
                        ]}
                    >
                        Here&apos;s what&apos;s happening in your organization today
                    </Text>
                </View>
            </View>

            {/* =====================================================
          PERFORMANCE BANNER
      ====================================================== */}

            <View
                style={[
                    styles.performanceBanner,
                    {
                        backgroundColor: isDark
                            ? "#0f766e"
                            : "#10b981",
                    },
                ]}
            >
                <View style={styles.performanceBannerTop}>
                    <View style={styles.performanceBannerIcon}>
                        <MaterialCommunityIcons
                            name="chart-box-outline"
                            size={22}
                            color="#fff"
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={styles.performanceBannerLabel}>
                            Performance
                        </Text>

                        <Text style={styles.performanceBannerTitle}>
                            {performance?.employee_name ||
                                user?.first_name ||
                                "Employee"}{" "}
                            {performance?.grade
                                ? `• Grade ${performance.grade}`
                                : ""}
                        </Text>
                    </View>
                </View>

                <Text style={styles.performanceBannerText}>
                    {performanceMessage}
                </Text>

                <View style={styles.performanceBannerStats}>
                    <View style={styles.performanceMiniStat}>
                        <Text style={styles.performanceMiniStatLabel}>
                            Score
                        </Text>

                        <Text style={styles.performanceMiniStatValue}>
                            {performanceScore.toFixed(1)}%
                        </Text>
                    </View>

                    <View style={styles.performanceMiniStat}>
                        <Text style={styles.performanceMiniStatLabel}>
                            Tasks
                        </Text>

                        <Text style={styles.performanceMiniStatValue}>
                            {performance?.completed_tasks || 0}/
                            {performance?.total_tasks || 0}
                        </Text>
                    </View>

                    <View style={styles.performanceMiniStat}>
                        <Text style={styles.performanceMiniStatLabel}>
                            Updates
                        </Text>

                        <Text style={styles.performanceMiniStatValue}>
                            {performance?.daily_updates || 0}
                        </Text>
                    </View>

                    <View
                        style={[
                            styles.performanceMiniStat,
                            styles.performanceMiniStatSecondRow,
                        ]}
                    >
                        <Text style={styles.performanceMiniStatLabel}>
                            Completed
                        </Text>

                        <Text style={styles.performanceMiniStatValue}>
                            {performance?.completed_tasks || 0}
                        </Text>
                    </View>

                    <View
                        style={[
                            styles.performanceMiniStat,
                            styles.performanceMiniStatSecondRow,
                        ]}
                    >
                        <Text style={styles.performanceMiniStatLabel}>
                            On Time
                        </Text>

                        <Text style={styles.performanceMiniStatValue}>
                            {performance?.on_time_tasks || 0}
                        </Text>
                    </View>
                </View>
            </View>

            {/* =====================================================
          STATS CARDS
      ====================================================== */}

            {/* <View style={styles.statsContainer}>
                {stats.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.7}
                        onPress={item.onPress}
                        style={[
                            styles.statCard,
                            {
                                backgroundColor: isDark
                                    ? "#1e293b"
                                    : "#fff",
                                borderColor: isDark
                                    ? "#374151"
                                    : "#e5e7eb",
                            },
                        ]}
                    >
                        <View style={styles.statContent}>
                            <View style={styles.statLeftSection}>
                                <View
                                    style={[
                                        styles.iconCircle,
                                        {
                                            backgroundColor: item.color,
                                        },
                                    ]}
                                >
                                    <Ionicons
                                        name={item.icon}
                                        size={24}
                                        color="#fff"
                                    />
                                </View>

                                <View>
                                    <Text
                                        style={[
                                            styles.statLabel,
                                            {
                                                color: isDark
                                                    ? "#9ca3af"
                                                    : "#6b7280",
                                            },
                                        ]}
                                    >
                                        {item.title}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.statValue,
                                            {
                                                color: isDark
                                                    ? "#fff"
                                                    : "#111",
                                            },
                                        ]}
                                    >
                                        {item.value}
                                    </Text>
                                </View>
                            </View>

                            <Ionicons
                                name="chevron-forward"
                                size={18}
                                color={
                                    isDark
                                        ? "#4b5563"
                                        : "#cbd5e1"
                                }
                            />
                        </View>
                    </TouchableOpacity>
                ))}
            </View> */}

            {/* =====================================================
          PERFORMANCE OVERVIEW
      ====================================================== */}

            <View
                style={[
                    styles.bigCard,
                    {
                        backgroundColor: isDark
                            ? "#1e293b"
                            : "#fff",
                        borderColor: isDark
                            ? "#374151"
                            : "#e5e7eb",
                    },
                ]}
            >
                <View style={styles.cardHeader}>
                    <MaterialCommunityIcons
                        name="chart-line"
                        size={20}
                        color="#10b981"
                        style={{ marginRight: 8 }}
                    />

                    <Text
                        style={[
                            styles.sectionTitle,
                            {
                                color: isDark
                                    ? "#fff"
                                    : "#111",
                                marginVertical: 0,
                            },
                        ]}
                    >
                        Performance Overview
                    </Text>
                </View>

                <View style={styles.performanceTopRow}>
                    <View
                        style={[
                            styles.performanceGradeCard,
                            {
                                backgroundColor: isDark
                                    ? "rgba(16, 185, 129, 0.15)"
                                    : "rgba(16, 185, 129, 0.08)",
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.performanceGradeLabel,
                                {
                                    color: isDark
                                        ? "#9ca3af"
                                        : "#6b7280",
                                },
                            ]}
                        >
                            Grade
                        </Text>

                        <Text
                            style={[
                                styles.performanceGradeValue,
                                {
                                    color: isDark
                                        ? "#fff"
                                        : "#111",
                                },
                            ]}
                        >
                            {performance?.grade || "-"}
                        </Text>
                    </View>

                    <View
                        style={[
                            styles.performanceScoreCard,
                            {
                                backgroundColor: isDark
                                    ? "#111827"
                                    : "#f8fafc",
                                borderColor: isDark
                                    ? "#374151"
                                    : "#e5e7eb",
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.performanceScoreLabel,
                                {
                                    color: isDark
                                        ? "#9ca3af"
                                        : "#6b7280",
                                },
                            ]}
                        >
                            Performance Score
                        </Text>

                        <Text
                            style={[
                                styles.performanceScoreValue,
                                {
                                    color: isDark
                                        ? "#fff"
                                        : "#111",
                                },
                            ]}
                        >
                            {performanceScore.toFixed(1)}%
                        </Text>

                        <View style={styles.performanceScoreBar}>
                            <View
                                style={[
                                    styles.performanceScoreFill,
                                    {
                                        width: `${Math.max(
                                            0,
                                            Math.min(
                                                100,
                                                performanceScore
                                            )
                                        )}%`,
                                        backgroundColor:
                                            performanceScore >= 75
                                                ? "#10b981"
                                                : performanceScore >= 60
                                                    ? "#f59e0b"
                                                    : "#ef4444",
                                    },
                                ]}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.performanceBarsList}>
                    {performanceBars.map((bar) => (
                        <View
                            key={bar.label}
                            style={styles.performanceBarItem}
                        >
                            <View
                                style={styles.performanceBarHeader}
                            >
                                <Text
                                    style={[
                                        styles.performanceBarLabel,
                                        {
                                            color: isDark
                                                ? "#fff"
                                                : "#111",
                                        },
                                    ]}
                                >
                                    {bar.label}
                                </Text>

                                <Text
                                    style={[
                                        styles.performanceBarValue,
                                        {
                                            color: isDark
                                                ? "#9ca3af"
                                                : "#6b7280",
                                        },
                                    ]}
                                >
                                    {bar.value}
                                </Text>
                            </View>

                            <View
                                style={[
                                    styles.performanceBarTrack,
                                    {
                                        backgroundColor: isDark
                                            ? "#334155"
                                            : "#e5e7eb",
                                    },
                                ]}
                            >
                                <View
                                    style={[
                                        styles.performanceBarFill,
                                        {
                                            width: `${Math.max(
                                                0,
                                                Math.min(
                                                    100,
                                                    bar.percent
                                                )
                                            )}%`,
                                            backgroundColor:
                                                bar.color,
                                        },
                                    ]}
                                />
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            {/* =====================================================
          QUICK ACCESS
      ====================================================== */}

            {/* <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDark
                            ? "#fff"
                            : "#111",
                    },
                ]}
            >
                Quick Access
            </Text>

            <View style={styles.featuresContainer}>
                {features.map((item, index) => (
                    <TouchableOpacity
                        onPress={() =>
                            router.replace(
                                item.link as any
                            )
                        }
                        key={index}
                        activeOpacity={0.8}
                        style={[
                            styles.featureCard,
                            {
                                backgroundColor: isDark
                                    ? "rgba(16, 185, 129, 0.2)"
                                    : "rgba(16, 185, 129, 0.1)",
                            },
                        ]}
                    >
                        <View
                            style={
                                styles.featureIconContainer
                            }
                        >
                            <View
                                style={
                                    styles.featureIconBackground
                                }
                            >
                                <Ionicons
                                    name={item.icon}
                                    size={28}
                                    color="#10b981"
                                />
                            </View>
                        </View>

                        <View
                            style={styles.featureTextContainer}
                        >
                            <Text
                                style={[
                                    styles.featureTitle,
                                    {
                                        color: isDark
                                            ? "#fff"
                                            : "#111",
                                    },
                                ]}
                            >
                                {item.title}
                            </Text>

                            <Text
                                style={[
                                    styles.featureDesc,
                                    {
                                        color: isDark
                                            ? "#9ca3af"
                                            : "#6b7280",
                                    },
                                ]}
                            >
                                {item.description}
                            </Text>
                        </View>

                        <Ionicons
                            name="chevron-forward-outline"
                            size={20}
                            color={
                                isDark
                                    ? "#6b7280"
                                    : "#9ca3af"
                            }
                            style={styles.chevron}
                        />
                    </TouchableOpacity>
                ))}
            </View> */}

            {/* =====================================================
          ATTENDANCE OVERVIEW
      ====================================================== */}

            <View
                style={[
                    styles.bigCard,
                    {
                        backgroundColor: isDark
                            ? "#1e293b"
                            : "#fff",
                        borderColor: isDark
                            ? "#374151"
                            : "#e5e7eb",
                    },
                ]}
            >
                <View style={styles.cardHeader}>
                    <Ionicons
                        name="bar-chart-outline"
                        size={20}
                        color="#10b981"
                        style={{ marginRight: 8 }}
                    />

                    <Text
                        style={[
                            styles.sectionTitle,
                            {
                                color: isDark
                                    ? "#fff"
                                    : "#111",
                                marginVertical: 0,
                            },
                        ]}
                    >
                        Attendance Overview
                    </Text>
                </View>

                <View style={styles.progressSection}>
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                {
                                    width: `${attendancePercentage}%`,
                                },
                            ]}
                        />
                    </View>

                    <Text
                        style={[
                            styles.progressText,
                            {
                                color: isDark
                                    ? "#9ca3af"
                                    : "#6b7280",
                            },
                        ]}
                    >
                        {attendancePercentage}% attendance today
                    </Text>
                </View>
            </View>

            {/* =====================================================
          ANNOUNCEMENTS
      ====================================================== */}

            <View
                style={[
                    styles.bigCard,
                    {
                        backgroundColor: isDark
                            ? "#1e293b"
                            : "#fff",
                        borderColor: isDark
                            ? "#374151"
                            : "#e5e7eb",
                    },
                ]}
            >
                <View style={styles.cardHeader}>
                    <Ionicons
                        name="megaphone-outline"
                        size={20}
                        color="#10b981"
                        style={{ marginRight: 8 }}
                    />

                    <Text
                        style={[
                            styles.sectionTitle,
                            {
                                color: isDark
                                    ? "#fff"
                                    : "#111",
                                marginVertical: 0,
                            },
                        ]}
                    >
                        Announcements
                    </Text>
                </View>

                <View style={styles.announcementsList}>
                    {announcements.length === 0 && (
                        <Text
                            style={[
                                styles.eventTitle,
                                {
                                    color: isDark
                                        ? "#fff"
                                        : "#111",
                                },
                            ]}
                        >
                            No announcements yet
                        </Text>
                    )}

                    {announcements.map(
                        (announcement, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.announcementItem,
                                    {
                                        backgroundColor: isDark
                                            ? "rgba(16, 185, 129, 0.1)"
                                            : "rgba(16, 185, 129, 0.05)",
                                        borderColor: isDark
                                            ? "#374151"
                                            : "#e5e7eb",
                                    },
                                ]}
                            >
                                <View
                                    style={
                                        styles.announcementBadge
                                    }
                                >
                                    <MaterialCommunityIcons
                                        name="bell-outline"
                                        size={16}
                                        color="#10b981"
                                    />
                                </View>

                                <View
                                    style={{ flex: 1 }}
                                >
                                    <Text
                                        style={[
                                            styles.announcementTitle,
                                            {
                                                color: isDark
                                                    ? "#fff"
                                                    : "#111",
                                            },
                                        ]}
                                    >
                                        {announcement.title}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.announcementDesc,
                                            {
                                                color: isDark
                                                    ? "#9ca3af"
                                                    : "#6b7280",
                                            },
                                        ]}
                                    >
                                        {announcement.message}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.announcementTime,
                                            {
                                                color: isDark
                                                    ? "#6b7280"
                                                    : "#9ca3af",
                                            },
                                        ]}
                                    >
                                        {announcement.created_by_name}
                                    </Text>
                                </View>
                            </View>
                        )
                    )}
                </View>
            </View>

            {/* =====================================================
          UPCOMING BIRTHDAYS
      ====================================================== */}

            <View
                style={[
                    styles.bigCard,
                    {
                        backgroundColor: isDark
                            ? "#1e293b"
                            : "#fff",
                        borderColor: isDark
                            ? "#374151"
                            : "#e5e7eb",
                    },
                ]}
            >
                <View style={styles.cardHeader}>
                    <MaterialCommunityIcons
                        name="calendar-month-outline"
                        size={20}
                        color="#10b981"
                        style={{ marginRight: 8 }}
                    />

                    <Text
                        style={[
                            styles.sectionTitle,
                            {
                                color: isDark
                                    ? "#fff"
                                    : "#111",
                                marginVertical: 0,
                            },
                        ]}
                    >
                        Upcoming Birthdays
                    </Text>
                </View>

                <View style={styles.eventsList}>
                    {upcomingEvents.length === 0 && (
                        <Text
                            style={[
                                styles.eventTitle,
                                {
                                    color: isDark
                                        ? "#fff"
                                        : "#111",
                                },
                            ]}
                        >
                            No more birthdays this month
                        </Text>
                    )}

                    {upcomingEvents.map(
                        (event, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.eventItem,
                                    {
                                        borderBottomColor:
                                            isDark
                                                ? "#374151"
                                                : "#e5e7eb",
                                        borderBottomWidth:
                                            index <
                                                upcomingEvents.length - 1
                                                ? 1
                                                : 0,
                                    },
                                ]}
                            >
                                <View
                                    style={styles.eventIcon}
                                >
                                    <Image
                                        source={{
                                            uri:
                                                event?.profile_image_url ||
                                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                    `${event.first_name || ""} ${event.last_name || ""
                                                        }`.trim() ||
                                                    "User"
                                                )}&background=10b981&color=fff`,
                                        }}
                                        style={{
                                            height: 40,
                                            width: 40,
                                            borderRadius: 10,
                                        }}
                                    />
                                </View>

                                <View
                                    style={styles.eventContent}
                                >
                                    <Text
                                        style={[
                                            styles.eventTitle,
                                            {
                                                color: isDark
                                                    ? "#fff"
                                                    : "#111",
                                            },
                                        ]}
                                    >
                                        {event.first_name}{" "}
                                        {event.last_name}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.eventDate,
                                            {
                                                color: isDark
                                                    ? "#9ca3af"
                                                    : "#6b7280",
                                            },
                                        ]}
                                    >
                                        {event.date_of_birth}
                                    </Text>
                                </View>
                            </View>
                        )
                    )}
                </View>
            </View>

            {/* =====================================================
          HOLIDAYS
      ====================================================== */}

            <View
                style={[
                    styles.bigCard,
                    {
                        backgroundColor: isDark
                            ? "#1e293b"
                            : "#fff",
                        borderColor: isDark
                            ? "#374151"
                            : "#e5e7eb",
                    },
                ]}
            >
                <View style={styles.cardHeader}>
                    <MaterialCommunityIcons
                        name="beach"
                        size={20}
                        color="#10b981"
                        style={{ marginRight: 8 }}
                    />

                    <Text
                        style={[
                            styles.sectionTitle,
                            {
                                color: isDark
                                    ? "#fff"
                                    : "#111",
                                marginVertical: 0,
                            },
                        ]}
                    >
                        Upcoming Holidays
                    </Text>
                </View>

                {holidays.length > 0 ? (
                    holidays.map(
                        (holiday, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.eventItem,
                                    {
                                        borderBottomColor:
                                            isDark
                                                ? "#374151"
                                                : "#e5e7eb",
                                        borderBottomWidth:
                                            index <
                                                holidays.length - 1
                                                ? 1
                                                : 0,
                                    },
                                ]}
                            >
                                <View
                                    style={styles.eventContent}
                                >
                                    <Text
                                        style={[
                                            styles.eventTitle,
                                            {
                                                color: isDark
                                                    ? "#fff"
                                                    : "#111",
                                            },
                                        ]}
                                    >
                                        {holiday.occasion}
                                    </Text>

                                    <Text
                                        style={[
                                            styles.eventDate,
                                            {
                                                color: isDark
                                                    ? "#9ca3af"
                                                    : "#6b7280",
                                            },
                                        ]}
                                    >
                                        {holiday.date}
                                    </Text>
                                </View>
                            </View>
                        )
                    )
                ) : (
                    <Text
                        style={[
                            styles.emptyText,
                            {
                                color: isDark
                                    ? "#9ca3af"
                                    : "#6b7280",
                            },
                        ]}
                    >
                        No holidays scheduled
                    </Text>
                )}
            </View>

            <View style={{ height: 20 }} />
        </ScrollView>
    );
}

/**
 * ============================================================
 * STYLES
 * ============================================================
 */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 12,
    },

    welcomeHeader: {
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
    },

    headerContent: {
        gap: 8,
    },

    welcomeTitle: {
        fontSize: 24,
        fontWeight: "700",
        letterSpacing: -0.5,
    },

    dateText: {
        fontSize: 14,
        fontWeight: "500",
    },

    subtitleText: {
        fontSize: 12,
        fontWeight: "400",
        marginTop: 4,
    },

    performanceBanner: {
        borderRadius: 18,
        padding: 18,
        marginBottom: 24,
    },

    performanceBannerTop: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 12,
    },

    performanceBannerIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor:
            "rgba(255,255,255,0.15)",
        justifyContent: "center",
        alignItems: "center",
    },

    performanceBannerLabel: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 12,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 0.8,
    },

    performanceBannerTitle: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "800",
        marginTop: 2,
    },

    performanceBannerText: {
        color: "rgba(255,255,255,0.9)",
        fontSize: 13,
        lineHeight: 19,
        marginBottom: 14,
    },

    performanceBannerStats: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    performanceMiniStat: {
        width: "31%",
        backgroundColor:
            "rgba(255,255,255,0.12)",
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginBottom: 10,
    },

    performanceMiniStatSecondRow: {
        width: "48%",
    },

    performanceMiniStatLabel: {
        color: "rgba(255,255,255,0.75)",
        fontSize: 11,
        marginBottom: 4,
        fontWeight: "500",
    },

    performanceMiniStatValue: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "800",
    },

    statsContainer: {
        marginBottom: 24,
        gap: 12,
    },

    statCard: {
        borderRadius: 14,
        padding: 16,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },

    statContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    statLeftSection: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    iconCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
    },

    statLabel: {
        fontSize: 12,
        fontWeight: "500",
        marginBottom: 6,
    },

    statValue: {
        fontSize: 28,
        fontWeight: "800",
        letterSpacing: -0.5,
    },

    performanceTopRow: {
        gap: 12,
        marginBottom: 16,
    },

    performanceGradeCard: {
        borderRadius: 16,
        padding: 16,
    },

    performanceGradeLabel: {
        fontSize: 12,
        fontWeight: "500",
        marginBottom: 4,
    },

    performanceGradeValue: {
        fontSize: 34,
        fontWeight: "900",
        letterSpacing: -0.8,
    },

    performanceScoreCard: {
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
    },

    performanceScoreLabel: {
        fontSize: 12,
        fontWeight: "500",
        marginBottom: 4,
    },

    performanceScoreValue: {
        fontSize: 26,
        fontWeight: "800",
        marginBottom: 12,
    },

    performanceScoreBar: {
        height: 10,
        backgroundColor: "#e5e7eb",
        borderRadius: 999,
        overflow: "hidden",
    },

    performanceScoreFill: {
        height: "100%",
        borderRadius: 999,
    },

    performanceBarsList: {
        gap: 12,
    },

    performanceBarItem: {
        gap: 8,
    },

    performanceBarHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    performanceBarLabel: {
        fontSize: 13,
        fontWeight: "600",
    },

    performanceBarValue: {
        fontSize: 12,
        fontWeight: "500",
    },

    performanceBarTrack: {
        height: 10,
        borderRadius: 999,
        overflow: "hidden",
    },

    performanceBarFill: {
        height: "100%",
        borderRadius: 999,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginVertical: 16,
        letterSpacing: -0.3,
    },

    featuresContainer: {
        marginBottom: 24,
        gap: 12,
    },

    featureCard: {
        borderRadius: 14,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    featureIconContainer: {
        width: 48,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
    },

    featureIconBackground: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: "#f0fdf4",
        justifyContent: "center",
        alignItems: "center",
    },

    featureTextContainer: {
        flex: 1,
    },

    featureTitle: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 4,
    },

    featureDesc: {
        fontSize: 11,
        fontWeight: "400",
    },

    chevron: {
        opacity: 0.6,
    },

    bigCard: {
        borderRadius: 14,
        padding: 18,
        marginBottom: 16,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },

    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },

    progressSection: {
        gap: 10,
    },

    progressBar: {
        height: 8,
        backgroundColor: "#e5e7eb",
        borderRadius: 10,
        overflow: "hidden",
    },

    progressFill: {
        height: "100%",
        backgroundColor: "#10b981",
    },

    progressText: {
        fontSize: 12,
        fontWeight: "500",
    },

    announcementsList: {
        gap: 12,
    },

    announcementItem: {
        borderRadius: 12,
        padding: 14,
        flexDirection: "row",
        gap: 12,
        borderWidth: 1,
    },

    announcementBadge: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor:
            "rgba(16, 185, 129, 0.2)",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
    },

    announcementTitle: {
        fontSize: 13,
        fontWeight: "600",
        marginBottom: 4,
    },

    announcementDesc: {
        fontSize: 11,
        fontWeight: "400",
        marginBottom: 6,
    },

    announcementTime: {
        fontSize: 10,
        fontWeight: "400",
    },

    eventsList: {
        gap: 0,
    },

    eventItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        gap: 12,
    },

    eventIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor:
            "rgba(16, 185, 129, 0.1)",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },

    eventContent: {
        flex: 1,
    },

    eventTitle: {
        fontSize: 13,
        fontWeight: "600",
        marginBottom: 4,
    },

    eventDate: {
        fontSize: 11,
        fontWeight: "400",
    },

    emptyText: {
        fontSize: 13,
        fontWeight: "400",
        paddingVertical: 8,
    },
});
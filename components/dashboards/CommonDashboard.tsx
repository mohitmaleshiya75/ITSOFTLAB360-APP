import React, { useMemo } from "react";
import {
    Dimensions,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from "react-native";
import ApiDataLoader from "@/components/ui/ApiDataLoader";
import { useApiSimulation } from "@/hooks/useApiSimulation";

import {
    Activity,
    AlertCircle,
    ArrowDownRight,
    ArrowUpRight,
    BarChart3,
    CheckCircle2,
    Clock,
    Clock3,
    Database,
    FileText,
    IndianRupee,
    ListChecks,
    Package,
    Settings,
    // ShieldCheck,
    ShoppingCart,
    TrendingUp,
    UserCheck,
    Users,
} from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
// import { TouchableOpacity } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

/* ============================================================
   TYPES
============================================================ */

export type Application = {
    id: string;
    name: string;
    shortName: string;
    description: string;
    color: string;
    background: string;
};

type Metric = {
    title: string;
    value: string;
    change: string;
    positive: boolean;
    icon: React.ComponentType<any>;
};

type ActivityItem = {
    title: string;
    description: string;
    time: string;
    type: "success" | "warning" | "info";
};

type ApplicationDashboardProps = {
    application: Application;
};

/* ============================================================
   DUMMY APPLICATION DATA
============================================================ */

const APPLICATION_DATA: Record<
    string,
    {
        welcome: string;
        description: string;
        metrics: Metric[];
        activities: ActivityItem[];
        chart: number[];
        chartLabels: string[];
    }
> = {
    hrms: {
        welcome: "Human Resource Overview",
        description:
            "Monitor employees, attendance, leave and workforce operations.",
        metrics: [
            {
                title: "Total Employees",
                value: "248",
                change: "+12.4%",
                positive: true,
                icon: Users,
            },
            {
                title: "Present Today",
                value: "221",
                change: "+5.2%",
                positive: true,
                icon: CheckCircle2,
            },
            {
                title: "Leave Requests",
                value: "14",
                change: "-8.1%",
                positive: true,
                icon: Clock3,
            },
            {
                title: "Payroll",
                value: "₹18.4L",
                change: "+7.3%",
                positive: true,
                icon: BarChart3,
            },
        ],
        chart: [45, 62, 51, 75, 68, 86, 92],
        chartLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        activities: [
            {
                title: "Attendance Updated",
                description: "221 employees marked attendance today.",
                time: "10 min ago",
                type: "success",
            },
            {
                title: "Leave Requests",
                description: "14 leave requests are waiting for approval.",
                time: "35 min ago",
                type: "warning",
            },
            {
                title: "Payroll Processed",
                description: "Monthly payroll processing completed.",
                time: "2 hrs ago",
                type: "success",
            },
        ],
    },

    erp: {
        welcome: "Enterprise Resource Overview",
        description:
            "Get a complete overview of business operations and transactions.",
        metrics: [
            {
                title: "Organizations",
                value: "18",
                change: "+4.8%",
                positive: true,
                icon: Database,
            },
            {
                title: "Transactions",
                value: "12,840",
                change: "+14.2%",
                positive: true,
                icon: Activity,
            },
            {
                title: "Inventory",
                value: "8,420",
                change: "+6.7%",
                positive: true,
                icon: Package,
            },
            {
                title: "Revenue",
                value: "₹42.8L",
                change: "+18.6%",
                positive: true,
                icon: TrendingUp,
            },
        ],
        chart: [42, 55, 48, 72, 66, 81, 94],
        chartLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        activities: [
            {
                title: "Inventory Updated",
                description: "342 inventory records updated.",
                time: "15 min ago",
                type: "success",
            },
            {
                title: "Transaction Review",
                description: "28 transactions require review.",
                time: "42 min ago",
                type: "warning",
            },
            {
                title: "Revenue Sync",
                description: "Financial data synchronized successfully.",
                time: "1 hr ago",
                type: "success",
            },
        ],
    },

    crm: {
        welcome: "Customer Relationship Overview",
        description:
            "Track customers, leads, opportunities and sales performance.",
        metrics: [
            {
                title: "Customers",
                value: "1,284",
                change: "+9.8%",
                positive: true,
                icon: Users,
            },
            {
                title: "Active Leads",
                value: "342",
                change: "+16.4%",
                positive: true,
                icon: Activity,
            },
            {
                title: "Opportunities",
                value: "86",
                change: "+11.2%",
                positive: true,
                icon: TrendingUp,
            },
            {
                title: "Revenue",
                value: "₹28.6L",
                change: "+21.3%",
                positive: true,
                icon: BarChart3,
            },
        ],
        chart: [35, 52, 48, 63, 71, 79, 91],
        chartLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        activities: [
            {
                title: "New Customer Added",
                description: "Customer Acme Industries was created.",
                time: "8 min ago",
                type: "success",
            },
            {
                title: "Lead Follow-up",
                description: "18 leads require follow-up.",
                time: "27 min ago",
                type: "warning",
            },
            {
                title: "Opportunity Updated",
                description: "Opportunity value increased by ₹2.4L.",
                time: "1 hr ago",
                type: "info",
            },
        ],
    },

    pos: {
        welcome: "Point of Sale Overview",
        description:
            "Monitor sales, transactions, products and store performance.",
        metrics: [
            {
                title: "Today's Sales",
                value: "₹4.82L",
                change: "+12.8%",
                positive: true,
                icon: TrendingUp,
            },
            {
                title: "Orders",
                value: "486",
                change: "+8.4%",
                positive: true,
                icon: Package,
            },
            {
                title: "Products",
                value: "2,840",
                change: "+3.2%",
                positive: true,
                icon: Database,
            },
            {
                title: "Customers",
                value: "1,248",
                change: "+10.6%",
                positive: true,
                icon: Users,
            },
        ],
        chart: [40, 58, 55, 69, 74, 82, 96],
        chartLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        activities: [
            {
                title: "Sale Completed",
                description: "Order #POS-48291 completed successfully.",
                time: "5 min ago",
                type: "success",
            },
            {
                title: "Low Stock",
                description: "12 products are below minimum stock.",
                time: "20 min ago",
                type: "warning",
            },
            {
                title: "Daily Report",
                description: "Today's sales report is ready.",
                time: "1 hr ago",
                type: "info",
            },
        ],
    },

    qms: {
        welcome: "Queue Management Overview",

        description:
            "Monitor queues, waiting customers, service counters and customer flow.",

        metrics: [
            {
                title: "Active Queues",
                value: "24",
                change: "+8.2%",
                positive: true,
                icon: ListChecks,
            },
            {
                title: "Waiting Customers",
                value: "86",
                change: "-12.4%",
                positive: true,
                icon: Users,
            },
            {
                title: "Customers Served",
                value: "1,284",
                change: "+14.6%",
                positive: true,
                icon: CheckCircle2,
            },
            {
                title: "Avg. Wait Time",
                value: "08:42",
                change: "-9.8%",
                positive: true,
                icon: Clock,
            },
        ],

        chart: [58, 64, 61, 72, 78, 85, 91],

        chartLabels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
        ],

        activities: [
            {
                title: "Queue Completed",
                description:
                    "Counter C-04 completed service for 126 customers.",
                time: "8 min ago",
                type: "success",
            },
            {
                title: "Customers Waiting",
                description:
                    "18 customers are currently waiting at the OPD counter.",
                time: "24 min ago",
                type: "warning",
            },
            {
                title: "Counter Opened",
                description:
                    "Counter C-07 is now active and accepting customers.",
                time: "1 hr ago",
                type: "info",
            },
            {
                title: "Token Called",
                description:
                    "Token QMS-1048 has been called at Counter C-03.",
                time: "1 hr ago",
                type: "info",
            },
        ],
    },

    ai: {
        welcome: "AI Automation Overview",
        description:
            "Monitor AI workflows, automations and intelligent processes.",
        metrics: [
            {
                title: "Automations",
                value: "84",
                change: "+18.4%",
                positive: true,
                icon: Activity,
            },
            {
                title: "Runs Today",
                value: "4,286",
                change: "+22.1%",
                positive: true,
                icon: TrendingUp,
            },
            {
                title: "Tasks Completed",
                value: "3,984",
                change: "+19.7%",
                positive: true,
                icon: CheckCircle2,
            },
            {
                title: "Success Rate",
                value: "98.6%",
                change: "+1.8%",
                positive: true,
                icon: BarChart3,
            },
        ],
        chart: [48, 61, 68, 74, 80, 88, 97],
        chartLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        activities: [
            {
                title: "Automation Completed",
                description: "Invoice processing automation completed.",
                time: "4 min ago",
                type: "success",
            },
            {
                title: "Workflow Warning",
                description: "One automation requires attention.",
                time: "25 min ago",
                type: "warning",
            },
            {
                title: "AI Model Activity",
                description: "1,284 AI tasks processed today.",
                time: "1 hr ago",
                type: "info",
            },
        ],
    },

    sfa: {
        welcome: "Sales Force Overview",
        description:
            "Monitor field sales, visits, customers, orders and revenue.",
        metrics: [
            {
                title: "Sales Reps",
                value: "84",
                change: "+5.6%",
                positive: true,
                icon: Users,
            },
            {
                title: "Today's Visits",
                value: "286",
                change: "+12.4%",
                positive: true,
                icon: Activity,
            },
            {
                title: "Sales Orders",
                value: "128",
                change: "+18.2%",
                positive: true,
                icon: Package,
            },
            {
                title: "Revenue",
                value: "₹12.6L",
                change: "+24.8%",
                positive: true,
                icon: TrendingUp,
            },
        ],
        chart: [42, 56, 61, 68, 74, 83, 94],
        chartLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        activities: [
            {
                title: "Visit Completed",
                description: "Sales representative completed customer visit.",
                time: "7 min ago",
                type: "success",
            },
            {
                title: "Order Pending",
                description: "18 sales orders are awaiting approval.",
                time: "32 min ago",
                type: "warning",
            },
            {
                title: "Revenue Updated",
                description: "Today's revenue reached ₹12.6L.",
                time: "1 hr ago",
                type: "success",
            },
        ],
    },

    "supply-chain": {
        welcome: "Supply Chain Overview",
        description:
            "Monitor shipments, inventory, vendors and logistics.",
        metrics: [
            {
                title: "Shipments",
                value: "642",
                change: "+8.2%",
                positive: true,
                icon: Package,
            },
            {
                title: "Inventory",
                value: "12,480",
                change: "+4.6%",
                positive: true,
                icon: Database,
            },
            {
                title: "Vendors",
                value: "186",
                change: "+7.8%",
                positive: true,
                icon: Users,
            },
            {
                title: "Orders",
                value: "2,840",
                change: "+13.4%",
                positive: true,
                icon: TrendingUp,
            },
        ],
        chart: [44, 53, 62, 69, 73, 85, 91],
        chartLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        activities: [
            {
                title: "Shipment Delivered",
                description: "Shipment #SHP-48291 delivered.",
                time: "14 min ago",
                type: "success",
            },
            {
                title: "Inventory Warning",
                description: "8 products are below reorder level.",
                time: "40 min ago",
                type: "warning",
            },
            {
                title: "Vendor Added",
                description: "New vendor successfully registered.",
                time: "2 hrs ago",
                type: "info",
            },
        ],
    },

    vms: {
        welcome: "Vendor Management Overview",
        description:
            "Manage vendors, contracts, requests and payments.",
        metrics: [
            {
                title: "Vendors",
                value: "286",
                change: "+6.8%",
                positive: true,
                icon: Users,
            },
            {
                title: "Active Contracts",
                value: "184",
                change: "+8.2%",
                positive: true,
                icon: FileText,
            },
            {
                title: "Requests",
                value: "42",
                change: "-5.4%",
                positive: true,
                icon: Activity,
            },
            {
                title: "Payments",
                value: "₹28.4L",
                change: "+14.2%",
                positive: true,
                icon: TrendingUp,
            },
        ],
        chart: [48, 54, 65, 71, 77, 84, 92],
        chartLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        activities: [
            {
                title: "Vendor Approved",
                description: "New vendor has been approved.",
                time: "9 min ago",
                type: "success",
            },
            {
                title: "Contract Expiring",
                description: "5 vendor contracts expire this month.",
                time: "38 min ago",
                type: "warning",
            },
            {
                title: "Payment Processed",
                description: "Vendor payment successfully processed.",
                time: "2 hrs ago",
                type: "success",
            },
        ],
    },

    lms: {
        welcome: "Learning Management Overview",
        description:
            "Track learners, courses, enrollments and learning progress.",
        metrics: [
            {
                title: "Students",
                value: "1,842",
                change: "+12.8%",
                positive: true,
                icon: Users,
            },
            {
                title: "Courses",
                value: "128",
                change: "+7.4%",
                positive: true,
                icon: FileText,
            },
            {
                title: "Enrollments",
                value: "4,820",
                change: "+18.6%",
                positive: true,
                icon: Activity,
            },
            {
                title: "Completion",
                value: "86.4%",
                change: "+5.8%",
                positive: true,
                icon: CheckCircle2,
            },
        ],
        chart: [40, 48, 59, 67, 73, 82, 90],
        chartLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        activities: [
            {
                title: "Course Completed",
                description: "42 students completed a course.",
                time: "12 min ago",
                type: "success",
            },
            {
                title: "New Enrollment",
                description: "86 new students enrolled.",
                time: "28 min ago",
                type: "info",
            },
            {
                title: "Course Updated",
                description: "Advanced Sales course updated.",
                time: "1 hr ago",
                type: "success",
            },
        ],
    },

    doms: {
        welcome: "Document Management Overview",
        description:
            "Manage documents, folders, sharing and digital records.",
        metrics: [
            {
                title: "Documents",
                value: "18,420",
                change: "+14.2%",
                positive: true,
                icon: FileText,
            },
            {
                title: "Folders",
                value: "842",
                change: "+6.4%",
                positive: true,
                icon: Database,
            },
            {
                title: "Shared",
                value: "3,284",
                change: "+18.2%",
                positive: true,
                icon: Users,
            },
            {
                title: "Storage",
                value: "68%",
                change: "+4.1%",
                positive: true,
                icon: Package,
            },
        ],
        chart: [38, 51, 58, 64, 73, 80, 91],
        chartLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        activities: [
            {
                title: "Document Uploaded",
                description: "Quarterly report uploaded.",
                time: "6 min ago",
                type: "success",
            },
            {
                title: "Storage Warning",
                description: "Storage usage has crossed 65%.",
                time: "30 min ago",
                type: "warning",
            },
            {
                title: "Document Shared",
                description: "12 documents shared with team members.",
                time: "1 hr ago",
                type: "info",
            },
        ],
    },

    dms: {
        welcome: "Dealer Management Overview",

        description:
            "Monitor dealers, orders, sales performance, payments and dealer network activity.",

        metrics: [
            {
                title: "Total Dealers",
                value: "428",
                change: "+8.6%",
                positive: true,
                icon: Users,
            },
            {
                title: "Active Dealers",
                value: "394",
                change: "+6.2%",
                positive: true,
                icon: UserCheck,
            },
            {
                title: "Dealer Orders",
                value: "1,284",
                change: "+14.8%",
                positive: true,
                icon: ShoppingCart,
            },
            {
                title: "Dealer Sales",
                value: "₹48.6L",
                change: "+11.4%",
                positive: true,
                icon: IndianRupee,
            },
        ],

        chart: [42, 48, 55, 61, 68, 76, 84],

        chartLabels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
        ],

        activities: [
            {
                title: "New Dealer Registered",
                description:
                    "ABC Distributors has been added to the dealer network.",
                time: "12 min ago",
                type: "success",
            },
            {
                title: "Dealer Order Created",
                description:
                    "Dealer order #DMS-4821 worth ₹1,24,500 was created.",
                time: "38 min ago",
                type: "info",
            },
            {
                title: "Dealer Payment Received",
                description:
                    "Payment of ₹2,48,000 received from XYZ Enterprises.",
                time: "1 hr ago",
                type: "success",
            },
            {
                title: "Dealer Target Alert",
                description:
                    "12 dealers are below 50% of their monthly sales target.",
                time: "2 hrs ago",
                type: "warning",
            },
        ],
    },
};

/* ============================================================
COMMON DASHBOARD
============================================================ */

export default function CommonApplicationDashboard({
    application,
}: ApplicationDashboardProps) {
    const router = useRouter();
    const { isLoading, isRefreshing, handleRefresh } = useApiSimulation(2000);

    const data = useMemo(() => {
        return (
            APPLICATION_DATA[application.id] ||
            APPLICATION_DATA.erp
        );
    }, [application.id]);

    if (isLoading) {
        return (
            <ApiDataLoader
                title={`Loading ${application.name}...`}
                subtitle={`Connecting to ${application.name} microservices and streaming live data...`}
                accentColor={application.color}
            />
        );
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh}
                    colors={[application.color]}
                    tintColor={application.color}
                />
            }
        >
            {/* ====================================================
                HEADER
            ==================================================== */}

            <View
                style={[
                    styles.header,
                    {
                        borderColor: application.color,
                    },
                ]}
            >
                <View style={styles.headerTop}>
                    <View
                        style={[
                            styles.appIcon,
                            {
                                backgroundColor:
                                    application.background,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.appIconText,
                                {
                                    color: application.color,
                                },
                            ]}
                        >
                            {application.shortName}
                        </Text>
                    </View>

                    <View style={styles.headerInfo}>
                        <Text style={styles.appName}>
                            {application.name}
                        </Text>

                        <Text style={styles.appDescription}>
                            {application.description}
                        </Text>
                    </View>

                    <Pressable style={styles.settingsButton}>
                        <TouchableOpacity onPress={() => router.push("/")} style={{ paddingHorizontal: 10 }}> <Ionicons name="arrow-back" size={24} color="green" /> </TouchableOpacity>
                    </Pressable>
                </View>

                <View style={styles.headerDivider} />

                <Text style={styles.welcome}>
                    {data.welcome}
                </Text>

                <Text style={styles.welcomeDescription}>
                    {data.description}
                </Text>
            </View>

            {/* ====================================================
                KPI CARDS
            ==================================================== */}

            <View style={styles.metricsGrid}>
                {data.metrics.map((metric, index) => (
                    <MetricCard
                        key={metric.title}
                        metric={metric}
                        accentColor={application.color}
                        index={index}
                    />
                ))}
            </View>

            {/* ====================================================
                PERFORMANCE
            ==================================================== */}

            <DashboardCard
                title="Performance Overview"
                subtitle={`Recent ${application.name} activity`}
            >
                <SimpleChart
                    values={data.chart}
                    labels={data.chartLabels}
                    color={application.color}
                />
            </DashboardCard>

            {/* ====================================================
                QUICK SUMMARY
            ==================================================== */}

            <View style={styles.twoColumn}>
                <SummaryCard
                    title="System Health"
                    value="98.6%"
                    label="All systems operational"
                    icon={CheckCircle2}
                    color="#059669"
                    background="#ECFDF5"
                />

                <SummaryCard
                    title="Active Users"
                    value="1,248"
                    label="Users active today"
                    icon={Users}
                    color="#2563EB"
                    background="#EFF6FF"
                />
            </View>

            {/* ====================================================
                RECENT ACTIVITY
            ==================================================== */}

            <DashboardCard
                title="Recent Activity"
                subtitle="Latest activity across the application"
            >
                <View style={styles.activityList}>
                    {data.activities.map(
                        (activity, index) => (
                            <ActivityRow
                                key={`${activity.title}-${index}`}
                                activity={activity}
                                color={application.color}
                                isLast={
                                    index ===
                                    data.activities.length - 1
                                }
                            />
                        )
                    )}
                </View>
            </DashboardCard>

            {/* ====================================================
                QUICK ACTIONS
            ==================================================== */}

            <DashboardCard
                title="Quick Actions"
                subtitle="Common actions for this application"
            >
                <View style={styles.quickActions}>
                    <QuickAction
                        title="View Reports"
                        icon={BarChart3}
                        color={application.color}
                    />

                    <QuickAction
                        title="Manage Users"
                        icon={Users}
                        color={application.color}
                    />

                    <QuickAction
                        title="Documents"
                        icon={FileText}
                        color={application.color}
                    />

                    <QuickAction
                        title="Settings"
                        icon={Settings}
                        color={application.color}
                    />
                </View>
            </DashboardCard>

            {/* ====================================================
                FOOTER
            ==================================================== */}

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    ITSOFTLAB360
                </Text>

                <Text style={styles.footerSubText}>
                    {application.name} • Enterprise Dashboard
                </Text>
            </View>
        </ScrollView>
    );
}

/* ============================================================
   METRIC CARD
============================================================ */

function MetricCard({
    metric,
    accentColor,
}: {
    metric: Metric;
    accentColor: string;
    index: number;
}) {
    const Icon = metric.icon;

    return (
        <View style={styles.metricCard}>
            <View style={styles.metricTop}>
                <View
                    style={[
                        styles.metricIcon,
                        {
                            backgroundColor:
                                `${accentColor}15`,
                        },
                    ]}
                >
                    <Icon
                        size={19}
                        color={accentColor}
                    />
                </View>

                <View
                    style={[
                        styles.changeBadge,
                        {
                            backgroundColor:
                                metric.positive
                                    ? "#ECFDF5"
                                    : "#FEF2F2",
                        },
                    ]}
                >
                    {metric.positive ? (
                        <ArrowUpRight
                            size={11}
                            color="#059669"
                        />
                    ) : (
                        <ArrowDownRight
                            size={11}
                            color="#DC2626"
                        />
                    )}

                    <Text
                        style={[
                            styles.changeText,
                            {
                                color: metric.positive
                                    ? "#059669"
                                    : "#DC2626",
                            },
                        ]}
                    >
                        {metric.change}
                    </Text>
                </View>
            </View>

            <Text style={styles.metricTitle}>
                {metric.title}
            </Text>

            <Text style={styles.metricValue}>
                {metric.value}
            </Text>
        </View>
    );
}

/* ============================================================
   DASHBOARD CARD
============================================================ */

function DashboardCard({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}) {
    return (
        <View style={styles.dashboardCard}>
            <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>
                        {title}
                    </Text>

                    <Text style={styles.cardSubtitle}>
                        {subtitle}
                    </Text>
                </View>
            </View>

            {children}
        </View>
    );
}

/* ============================================================
   SIMPLE CHART
============================================================ */

function SimpleChart({
    values,
    labels,
    color,
}: {
    values: number[];
    labels: string[];
    color: string;
}) {
    const max = Math.max(...values, 1);

    return (
        <View style={styles.chartContainer}>
            <View style={styles.chart}>
                {values.map((value, index) => {
                    const height =
                        (value / max) * 130;

                    return (
                        <View
                            key={index}
                            style={styles.barWrapper}
                        >
                            <View
                                style={[
                                    styles.bar,
                                    {
                                        height,
                                        backgroundColor:
                                            color,
                                    },
                                ]}
                            />

                            <Text
                                style={
                                    styles.barLabel
                                }
                            >
                                {labels[index]}
                            </Text>
                        </View>
                    );
                })}
            </View>

            <View style={styles.chartBottom}>
                <View>
                    <Text
                        style={
                            styles.chartBottomLabel
                        }
                    >
                        Overall Performance
                    </Text>

                    <Text
                        style={
                            styles.chartBottomValue
                        }
                    >
                        {values[values.length - 1]}%
                    </Text>
                </View>

                <View
                    style={[
                        styles.trendBadge,
                        {
                            backgroundColor:
                                `${color}15`,
                        },
                    ]}
                >
                    <TrendingUp
                        size={14}
                        color={color}
                    />

                    <Text
                        style={[
                            styles.trendText,
                            {
                                color,
                            },
                        ]}
                    >
                        Growing
                    </Text>
                </View>
            </View>
        </View>
    );
}

/* ============================================================
   SUMMARY CARD
============================================================ */

function SummaryCard({
    title,
    value,
    label,
    icon,
    color,
    background,
}: {
    title: string;
    value: string;
    label: string;
    icon: React.ComponentType<any>;
    color: string;
    background: string;
}) {
    const Icon = icon;

    return (
        <View style={styles.summaryCard}>
            <View
                style={[
                    styles.summaryIcon,
                    {
                        backgroundColor: background,
                    },
                ]}
            >
                <Icon
                    size={18}
                    color={color}
                />
            </View>

            <Text style={styles.summaryTitle}>
                {title}
            </Text>

            <Text style={styles.summaryValue}>
                {value}
            </Text>

            <Text style={styles.summaryLabel}>
                {label}
            </Text>
        </View>
    );
}

/* ============================================================
   ACTIVITY ROW
============================================================ */

function ActivityRow({
    activity,
    color,
    isLast,
}: {
    activity: ActivityItem;
    color: string;
    isLast: boolean;
}) {
    const iconColor =
        activity.type === "success"
            ? "#059669"
            : activity.type === "warning"
                ? "#D97706"
                : color;

    const Icon =
        activity.type === "success"
            ? CheckCircle2
            : activity.type === "warning"
                ? AlertCircle
                : Activity;

    return (
        <View
            style={[
                styles.activityRow,
                !isLast && styles.activityBorder,
            ]}
        >
            <View
                style={[
                    styles.activityIcon,
                    {
                        backgroundColor:
                            `${iconColor}15`,
                    },
                ]}
            >
                <Icon
                    size={17}
                    color={iconColor}
                />
            </View>

            <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>
                    {activity.title}
                </Text>

                <Text
                    style={
                        styles.activityDescription
                    }
                >
                    {activity.description}
                </Text>
            </View>

            <Text style={styles.activityTime}>
                {activity.time}
            </Text>
        </View>
    );
}

/* ============================================================
   QUICK ACTION
============================================================ */

function QuickAction({
    title,
    icon,
    color,
}: {
    title: string;
    icon: React.ComponentType<any>;
    color: string;
}) {
    const Icon = icon;

    return (
        <Pressable
            style={({ pressed }) => [
                styles.quickAction,
                pressed && styles.quickActionPressed,
            ]}
        >
            <View
                style={[
                    styles.quickActionIcon,
                    {
                        backgroundColor:
                            `${color}15`,
                    },
                ]}
            >
                <Icon
                    size={18}
                    color={color}
                />
            </View>

            <Text style={styles.quickActionText}>
                {title}
            </Text>
        </Pressable>
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

    content: {
        padding: 16,
        paddingBottom: 40,
    },

    /* Header */

    header: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 18,
        borderWidth: 1.5,
        marginBottom: 16,
    },

    headerTop: {
        flexDirection: "row",
        alignItems: "center",
    },

    appIcon: {
        width: 54,
        height: 54,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
    },

    appIconText: {
        fontSize: 16,
        fontWeight: "900",
    },

    headerInfo: {
        flex: 1,
        marginLeft: 12,
    },

    appName: {
        color: "#0F172A",
        fontSize: 18,
        fontWeight: "900",
    },

    appDescription: {
        color: "#64748B",
        fontSize: 11,
        marginTop: 3,
    },

    settingsButton: {
        width: 38,
        height: 38,
        borderRadius: 11,
        backgroundColor: "#F8FAFC",
        alignItems: "center",
        justifyContent: "center",
    },

    headerDivider: {
        height: 1,
        backgroundColor: "#E2E8F0",
        marginVertical: 16,
    },

    welcome: {
        color: "#0F172A",
        fontSize: 22,
        fontWeight: "900",
    },

    welcomeDescription: {
        color: "#64748B",
        fontSize: 12,
        lineHeight: 18,
        marginTop: 5,
    },

    /* Metrics */

    metricsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 16,
    },

    metricCard: {
        width:
            SCREEN_WIDTH > 600
                ? "23.5%"
                : "48%",
        backgroundColor: "#FFFFFF",
        borderRadius: 17,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    metricTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    metricIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },

    changeBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderRadius: 8,
    },

    changeText: {
        fontSize: 9,
        fontWeight: "800",
        marginLeft: 2,
    },

    metricTitle: {
        color: "#64748B",
        fontSize: 10,
        fontWeight: "700",
        marginTop: 14,
    },

    metricValue: {
        color: "#0F172A",
        fontSize: 23,
        fontWeight: "900",
        marginTop: 4,
    },

    /* Dashboard card */

    dashboardCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        padding: 16,
        marginBottom: 16,
    },

    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },

    cardTitle: {
        color: "#0F172A",
        fontSize: 16,
        fontWeight: "800",
    },

    cardSubtitle: {
        color: "#64748B",
        fontSize: 10,
        marginTop: 3,
    },

    /* Chart */

    chartContainer: {
        width: "100%",
    },

    chart: {
        height: 170,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-around",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },

    barWrapper: {
        height: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
        flex: 1,
    },

    bar: {
        width: 20,
        maxHeight: 135,
        borderRadius: 6,
        minHeight: 8,
    },

    barLabel: {
        color: "#94A3B8",
        fontSize: 8,
        marginTop: 7,
        marginBottom: 5,
    },

    chartBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 14,
    },

    chartBottomLabel: {
        color: "#64748B",
        fontSize: 10,
        fontWeight: "600",
    },

    chartBottomValue: {
        color: "#0F172A",
        fontSize: 22,
        fontWeight: "900",
        marginTop: 2,
    },

    trendBadge: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 12,
    },

    trendText: {
        fontSize: 10,
        fontWeight: "800",
        marginLeft: 5,
    },

    /* Summary */

    twoColumn: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },

    summaryCard: {
        width: "48.5%",
        backgroundColor: "#FFFFFF",
        borderRadius: 17,
        padding: 15,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    summaryIcon: {
        width: 38,
        height: 38,
        borderRadius: 11,
        alignItems: "center",
        justifyContent: "center",
    },

    summaryTitle: {
        color: "#64748B",
        fontSize: 10,
        fontWeight: "700",
        marginTop: 11,
    },

    summaryValue: {
        color: "#0F172A",
        fontSize: 21,
        fontWeight: "900",
        marginTop: 3,
    },

    summaryLabel: {
        color: "#94A3B8",
        fontSize: 9,
        marginTop: 3,
    },

    /* Activity */

    activityList: {
        marginTop: -3,
    },

    activityRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 13,
    },

    activityBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },

    activityIcon: {
        width: 38,
        height: 38,
        borderRadius: 11,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
    },

    activityContent: {
        flex: 1,
    },

    activityTitle: {
        color: "#1E293B",
        fontSize: 12,
        fontWeight: "800",
    },

    activityDescription: {
        color: "#64748B",
        fontSize: 10,
        lineHeight: 15,
        marginTop: 3,
    },

    activityTime: {
        color: "#94A3B8",
        fontSize: 8,
        marginLeft: 8,
    },

    /* Quick actions */

    quickActions: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    quickAction: {
        width: "48.5%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        borderRadius: 13,
        padding: 11,
        marginBottom: 9,
    },

    quickActionPressed: {
        opacity: 0.7,
        transform: [{ scale: 0.98 }],
    },

    quickActionIcon: {
        width: 34,
        height: 34,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },

    quickActionText: {
        color: "#334155",
        fontSize: 10,
        fontWeight: "800",
    },

    /* Footer */

    footer: {
        alignItems: "center",
        paddingTop: 10,
    },

    footerText: {
        color: "#475569",
        fontSize: 11,
        fontWeight: "800",
    },

    footerSubText: {
        color: "#94A3B8",
        fontSize: 9,
        marginTop: 3,
    },
});

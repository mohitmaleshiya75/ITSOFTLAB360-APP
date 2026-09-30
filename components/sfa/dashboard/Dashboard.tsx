import dayjs from "dayjs";
import {
  AlertTriangle,
  Briefcase,
  Building2,
  CheckCircle2,
  GitBranch,
  Layers,
  Shield,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
} from "react-native-svg";

import {
  LicenseQuota,
  MonthlyRevenueItem,
  OrganizationOverview,
  RecentOrder,
  useSuperAdminDashboard,
} from "./hooks";

/* ============================================================
   SUB-COMPONENTS (ALL DEFINED IN THIS FILE)
============================================================ */

/**
 * Section Header Component
 */
export const SectionHeader = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) => (
  <View style={styles.sectionHeaderContainer}>
    <View style={styles.sectionHeaderLeft}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle ? (
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      ) : null}
    </View>
    {children}
  </View>
);

/**
 * Section Card Container
 */
const SectionCard = ({
  title,
  subtitle,
  headerRight,
  children,
}: {
  title: string;
  subtitle?: string;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <View style={styles.sectionCard}>
    <View style={styles.sectionCardHeader}>
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionCardTitle}>{title}</Text>
        {subtitle ? (
          <Text style={styles.sectionCardSubtitle}>{subtitle}</Text>
        ) : null}
      </View>
      {headerRight}
    </View>
    {children}
  </View>
);

/**
 * License Quota Card
 */
const LicenseQuotaCard = ({ quota }: { quota?: LicenseQuota }) => {
  const max = quota?.maxLicenses ?? 0;
  const consumed = quota?.consumedLicenses ?? 0;
  const available = quota?.availableLicenses ?? Math.max(0, max - consumed);
  const isLimitReached = quota?.isLimitReached ?? (consumed >= max && max > 0);

  const percentUsed =
    max > 0 ? Math.min(100, Math.round((consumed / max) * 100)) : 0;

  const isWarning = !isLimitReached && (available <= 5 || percentUsed >= 85);

  const badgeBg = isLimitReached
    ? "#FEE2E2"
    : isWarning
      ? "#FEF3C7"
      : "#DCFCE7";
  const badgeText = isLimitReached
    ? "#991B1B"
    : isWarning
      ? "#92400E"
      : "#166534";
  const iconColor = isLimitReached
    ? "#DC2626"
    : isWarning
      ? "#D97706"
      : "#4F46E5";
  const progressColor = isLimitReached
    ? "#EF4444"
    : isWarning
      ? "#F59E0B"
      : "#4F46E5";

  return (
    <View
      style={[
        styles.licenseCard,
        isLimitReached && styles.licenseCardDanger,
        isWarning && styles.licenseCardWarning,
      ]}
    >
      <View style={styles.licenseTopRow}>
        <View
          style={[
            styles.licenseIconCircle,
            {
              backgroundColor: isLimitReached
                ? "#FEE2E2"
                : isWarning
                  ? "#FEF3C7"
                  : "#EEF2FF",
            },
          ]}
        >
          <Shield size={22} color={iconColor} />
        </View>

        <View style={styles.licenseDetails}>
          <View style={styles.licenseBadgeRow}>
            <Text style={styles.licenseTagText}>ORGANIZATION LICENSE QUOTA</Text>
            <View style={[styles.licenseBadge, { backgroundColor: badgeBg }]}>
              <Text style={[styles.licenseBadgeText, { color: badgeText }]}>
                {isLimitReached
                  ? "Limit Reached"
                  : `${available} Seats Available`}
              </Text>
            </View>
          </View>

          <Text style={styles.licenseCountText}>
            {consumed} of {max} License Consumed
          </Text>
          <Text style={styles.licenseHintText}>1 user = 1 license</Text>
        </View>
      </View>

      {isLimitReached ? (
        <View style={styles.licenseWarningBox}>
          <AlertTriangle size={14} color="#B91C1C" />
          <Text style={styles.licenseWarningBoxText}>
            All licenses consumed. Contact your Franchise Administrator to upgrade.
          </Text>
        </View>
      ) : (
        <Text style={styles.licenseDescriptionText}>
          Every created role and active user counts as 1 license.
        </Text>
      )}

      {/* Progress Bar */}
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${percentUsed}%`,
              backgroundColor: progressColor,
            },
          ]}
        />
      </View>
    </View>
  );
};

/**
 * Organization Overview Card (2-Column Responsive Grid)
 */
const OrganizationOverviewCard = ({
  overview,
}: {
  overview?: OrganizationOverview;
}) => {
  const items = [
    /*
    {
      label: "Organizations",
      value: overview?.organizations ?? 0,
      icon: Building2,
      color: "#2563EB",
      bg: "#EFF6FF",
    },
    */
    {
      label: "Branches",
      value: overview?.branches ?? 0,
      icon: GitBranch,
      color: "#0891B2",
      bg: "#ECFEFF",
    },
    {
      label: "Departments",
      value: overview?.departments ?? 0,
      icon: Layers,
      color: "#D97706",
      bg: "#FFFBEB",
    },
    {
      label: "Teams",
      value: overview?.teams ?? 0,
      icon: Briefcase,
      color: "#059669",
      bg: "#ECFDF5",
    },
    {
      label: "Total Users",
      value: overview?.users ?? 0,
      icon: Users,
      color: "#4F46E5",
      bg: "#EEF2FF",
    },
  ];

  return (
    <SectionCard
      title="Organization Overview & Hierarchy"
      subtitle="Live enterprise structure, branches, departments, and user totals"
    >
      <View style={styles.orgGrid}>
        {/*
        <View
          style={[
            styles.orgCard,
            { backgroundColor: "#EFF6FF", borderColor: "#2563EB30" },
          ]}
        >
          <View style={styles.orgCardHeader}>
            <Text style={styles.orgCardLabel} numberOfLines={2}>
              Organizations
            </Text>
            <View
              style={[
                styles.orgIconWrap,
                { backgroundColor: "#2563EB15" },
              ]}
            >
              <Building2 size={16} color="#2563EB" />
            </View>
          </View>
          <Text style={styles.orgCardValue}>{overview?.organizations ?? 0}</Text>
        </View>
        */}
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <View
              key={item.label}
              style={[
                styles.orgCard,
                { backgroundColor: item.bg, borderColor: `${item.color}30` },
              ]}
            >
              <View style={styles.orgCardHeader}>
                <Text style={styles.orgCardLabel} numberOfLines={2}>
                  {item.label}
                </Text>
                <View
                  style={[
                    styles.orgIconWrap,
                    { backgroundColor: `${item.color}15` },
                  ]}
                >
                  <Icon size={16} color={item.color} />
                </View>
              </View>
              <Text style={styles.orgCardValue}>{item.value}</Text>
            </View>
          );
        })}
      </View>
    </SectionCard>
  );
};

/**
 * Business Metric Card (2-Column Responsive Grid, Multi-Line Title)
 */
const MetricCard = ({
  label,
  value,
  icon: Icon,
  accentColor,
  backgroundColor,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ size: number; color: string }>;
  accentColor: string;
  backgroundColor: string;
}) => (
  <View style={[styles.metricCard, { borderColor: `${accentColor}25` }]}>
    <View style={styles.metricCardTop}>
      <View style={[styles.metricIconWrap, { backgroundColor }]}>
        <Icon size={20} color={accentColor} />
      </View>
    </View>

    <View style={styles.metricCardBottom}>
      <Text style={styles.metricCardLabel} numberOfLines={2}>
        {label}
      </Text>
      <Text
        style={styles.metricCardValue}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {value}
      </Text>
    </View>
  </View>
);

/**
 * Revenue Area Chart (Full Width Responsive SVG)
 */
const RevenueChart = ({ data }: { data: MonthlyRevenueItem[] }) => {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const { width: windowWidth } = useWindowDimensions();

  // Dynamically resolve inner chart width; fallback to calculated inner card space
  const chartWidth =
    containerWidth > 0 ? containerWidth : Math.max(windowWidth - 64, 280);
  const chartHeight = 210;

  const values = data.map((d) => Number(d.revenue) || 0);
  const maxRevenue = Math.max(...values, 1);

  const points = data.map((item, index) => {
    const x =
      data.length > 1
        ? (index / (data.length - 1)) * (chartWidth - 28) + 14
        : chartWidth / 2;

    const y =
      chartHeight -
      28 -
      ((Number(item.revenue) || 0) / maxRevenue) * (chartHeight - 65);

    return { x, y, value: item.revenue };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const areaPath = `
    ${linePath}
    L ${(chartWidth - 14).toFixed(1)} ${(chartHeight - 28).toFixed(1)}
    L 14 ${(chartHeight - 28).toFixed(1)}
    Z
  `;

  // Determine current month revenue
  const currentMonthIndex = dayjs().month();
  const currentMonthRevenue = data[currentMonthIndex]?.revenue ?? 0;

  return (
    <View
      style={styles.chartContainer}
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        if (w > 0 && Math.abs(w - containerWidth) > 2) {
          setContainerWidth(w);
        }
      }}
    >
      <Svg width={chartWidth} height={chartHeight}>
        <Defs>
          <LinearGradient id="revenueFillGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#3B82F6" stopOpacity="0.32" />
            <Stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
          </LinearGradient>
        </Defs>

        {/* Horizontal grid guide lines */}
        {[0, 1, 2, 3].map((step) => {
          const y = 20 + step * ((chartHeight - 50) / 3);
          return (
            <Path
              key={`grid-${step}`}
              d={`M 10 ${y} L ${chartWidth - 10} ${y}`}
              stroke="#F1F5F9"
              strokeWidth={1}
            />
          );
        })}

        {/* Gradient fill area */}
        <Path d={areaPath} fill="url(#revenueFillGradient)" />

        {/* Line */}
        <Path
          d={linePath}
          fill="none"
          stroke="#2563EB"
          strokeWidth={2.5}
        />

        {/* Data points */}
        {points.map((pt, idx) => (
          <Circle
            key={`pt-${idx}`}
            cx={pt.x}
            cy={pt.y}
            r={pt.value > 0 ? 3.5 : 2}
            fill="#FFFFFF"
            stroke="#2563EB"
            strokeWidth={1.5}
          />
        ))}
      </Svg>

      {/* Month Labels */}
      <View style={styles.chartMonthsRow}>
        {data.map((item, idx) => (
          <Text key={`${item.month}-${idx}`} style={styles.chartMonthText}>
            {item.month}
          </Text>
        ))}
      </View>

      {/* Current Month Revenue Footer */}
      <View style={styles.chartFooterRow}>
        <Text style={styles.chartFooterLabel}>Current Month Revenue</Text>
        <Text style={styles.chartFooterValue}>
          ₹{Number(currentMonthRevenue).toLocaleString("en-IN")}
        </Text>
      </View>
    </View>
  );
};

/**
 * Activity Item Component
 */
const ActivityItem = ({ order }: { order: RecentOrder }) => {
  const status = (order.status || "CONFIRMED").toUpperCase();

  let statusBg = "#F1F5F9";
  let statusColor = "#475569";

  if (status === "APPROVED" || status === "COMPLETED" || status === "DELIVERED") {
    statusBg = "#DCFCE7";
    statusColor = "#166534";
  } else if (status === "PENDING" || status === "DRAFT") {
    statusBg = "#FEF3C7";
    statusColor = "#92400E";
  } else if (status === "CANCELLED" || status === "REJECTED") {
    statusBg = "#FEE2E2";
    statusColor = "#991B1B";
  }

  const formattedDate = order.createdAt
    ? dayjs(order.createdAt).format("MMM D, h:mm A")
    : "Recently";

  return (
    <View style={styles.activityCard}>
      <View style={styles.activityMain}>
        <View style={styles.activityHeader}>
          <Text style={styles.activityOrderNumber} numberOfLines={1}>
            Sales Order #{order.orderNumber || order.id?.slice(0, 8) || "N/A"}
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: statusBg }]}>
            <Text style={[styles.statusBadgeText, { color: statusColor }]}>
              {status}
            </Text>
          </View>
        </View>

        <View style={styles.activityDetailRow}>
          <Text style={styles.activityCustomerName} numberOfLines={1}>
            {order.customer?.name || "Customer"}
          </Text>
          <Text style={styles.activityAmount}>
            ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
          </Text>
        </View>

        <Text style={styles.activityTime}>{formattedDate}</Text>
      </View>
    </View>
  );
};

/**
 * Loading View
 */
const LoadingView = () => (
  <View style={styles.centeredState}>
    <ActivityIndicator size="large" color="#4F46E5" />
    <Text style={styles.loadingStateText}>Loading Super Admin dashboard...</Text>
  </View>
);

/**
 * Error View
 */
const ErrorView = ({
  error,
  onRetry,
}: {
  error: string | null;
  onRetry: () => void;
}) => (
  <View style={styles.centeredState}>
    <View style={styles.errorIconWrap}>
      <AlertTriangle size={36} color="#DC2626" />
    </View>
    <Text style={styles.errorStateTitle}>Failed to load dashboard</Text>
    <Text style={styles.errorStateSubtitle}>
      {error || "Unable to connect to SFA backend."}
    </Text>
    <Pressable
      onPress={onRetry}
      style={({ pressed }) => [
        styles.retryButton,
        pressed && styles.retryButtonPressed,
      ]}
    >
      <Text style={styles.retryButtonText}>Try Again</Text>
    </Pressable>
  </View>
);

/**
 * Empty Data View
 */
const EmptyView = ({ onRefresh }: { onRefresh: () => void }) => (
  <View style={styles.centeredState}>
    <View style={[styles.errorIconWrap, { backgroundColor: "#EEF2FF" }]}>
      <Building2 size={36} color="#4F46E5" />
    </View>
    <Text style={styles.errorStateTitle}>No Dashboard Data</Text>
    <Text style={styles.errorStateSubtitle}>
      Dashboard data is currently empty. Record transactions to view live metrics.
    </Text>
    <Pressable
      onPress={onRefresh}
      style={({ pressed }) => [
        styles.retryButton,
        pressed && styles.retryButtonPressed,
      ]}
    >
      <Text style={styles.retryButtonText}>Refresh</Text>
    </Pressable>
  </View>
);

/* ============================================================
   MAIN DASHBOARD COMPONENT
============================================================ */

export default function Dashboard() {
  const { dashboard, loading, error, refreshing, refresh } =
    useSuperAdminDashboard();
  console.log("dashboard", JSON.stringify(dashboard, null, 2));

  // Full 12-month normalized revenue data
  const normalizedMonthlyRevenue = useMemo<MonthlyRevenueItem[]>(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const source = dashboard?.monthlyRevenue;
    if (Array.isArray(source) && source.length > 0) {
      const revMap: Record<string, number> = {};
      source.forEach((item) => {
        if (item?.month) {
          revMap[item.month] = Number(item.revenue) || 0;
        }
      });

      return months.map((month) => ({
        month,
        revenue: revMap[month] ?? 0,
      }));
    }

    return months.map((month) => ({ month, revenue: 0 }));
  }, [dashboard?.monthlyRevenue]);

  // Revenue growth badge calculation
  const growthInfo = useMemo(() => {
    const currentMonth = dayjs().month();
    const current = normalizedMonthlyRevenue[currentMonth]?.revenue || 0;
    const previous =
      currentMonth > 0
        ? normalizedMonthlyRevenue[currentMonth - 1]?.revenue || 0
        : 0;

    if (previous === 0 && current > 0) {
      return { text: "+100% MoM Growth", isPositive: true };
    }
    if (previous > 0 && current >= 0) {
      const diff = ((current - previous) / previous) * 100;
      const isPositive = diff >= 0;
      return {
        text: `${isPositive ? "+" : ""}${diff.toFixed(1)}% MoM Growth`,
        isPositive,
      };
    }
    return { text: "0.0% MoM Growth", isPositive: true };
  }, [normalizedMonthlyRevenue]);

  // Handle loading initial state
  if (loading && !dashboard) {
    return <LoadingView />;
  }

  // Handle error state
  if (error && !dashboard) {
    return <ErrorView error={error} onRetry={refresh} />;
  }

  // Handle empty state
  if (!dashboard) {
    return <EmptyView onRefresh={refresh} />;
  }

  const organizationName =
    dashboard.organizationInfo?.name ||
    dashboard.recentOrganizations?.[0]?.name ||
    "";

  const cards = dashboard.cards || {};
  const overview = dashboard.organizationOverview || {};
  const recentOrders = dashboard.recentOrders || [];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
          colors={["#4F46E5"]}
          tintColor="#4F46E5"
        />
      }
    >
      {/* =====================================================
          1. SUPER ADMIN HEADER
      ====================================================== */}
      <View style={styles.headerCard}>
        <View style={styles.headerBadgesRow}>
          {/* Organization Badge */}
          {organizationName ? (
            <View style={styles.organizationBadge}>
              <Building2 size={13} color="#C7D2FE" />
              <Text style={styles.organizationBadgeText} numberOfLines={1}>
                {organizationName}
              </Text>
            </View>
          ) : null}

          {/* Control Center Badge */}
          <View style={styles.adminBadge}>
            <CheckCircle2 size={13} color="#6EE7B7" />
            <Text style={styles.adminBadgeText}>
              Super Admin Control Center
            </Text>
          </View>
        </View>

        <Text style={styles.headerTitle}>
          Super Admin Executive Dashboard
        </Text>

        <Text style={styles.headerSubtitle}>
          Welcome back 👋, <Text style={styles.headerName}>Super Admin</Text>
          {organizationName ? (
            <>
              {" — Live enterprise metrics for "}
              <Text style={styles.headerOrgHighlight}>{organizationName}</Text>
            </>
          ) : (
            " — Live enterprise metrics"
          )}
        </Text>

        <Pressable
          onPress={refresh}
          disabled={refreshing}
          style={({ pressed }) => [
            styles.headerRefreshButton,
            pressed && styles.headerRefreshButtonPressed,
          ]}
        >
          {refreshing ? (
            <ActivityIndicator size="small" color="#FCD34D" />
          ) : (
            <Sparkles size={16} color="#FCD34D" />
          )}
          <Text style={styles.headerRefreshText}>
            {refreshing ? "Refreshing..." : "Refresh Data"}
          </Text>
        </Pressable>
      </View>

      {/* =====================================================
          2. ORGANIZATION LICENSE QUOTA
      ====================================================== */}
      <LicenseQuotaCard quota={dashboard.licenseQuota || dashboard.license} />

      {/* =====================================================
          3. ORGANIZATION OVERVIEW
      ====================================================== */}
      <OrganizationOverviewCard overview={overview} />

      {/* =====================================================
          4. BUSINESS METRICS
      ====================================================== */}
      <SectionCard
        title="Business Metrics"
        subtitle="Active enterprise commercial and revenue performance"
      >
        <View style={styles.metricsGrid}>
          <MetricCard
            label="Assigned Customers"
            value={cards.totalCustomers ?? 0}
            icon={UserCheck}
            accentColor="#2563EB"
            backgroundColor="#EFF6FF"
          />

          <MetricCard
            label="Total Sales Orders"
            value={cards.totalSalesOrders ?? 0}
            icon={ShoppingCart}
            accentColor="#0891B2"
            backgroundColor="#ECFEFF"
          />

          <MetricCard
            label="Today's Revenue"
            value={`₹${Number(cards.todaysRevenue ?? 0).toLocaleString(
              "en-IN"
            )}`}
            icon={TrendingUp}
            accentColor="#D97706"
            backgroundColor="#FFFBEB"
          />

          <MetricCard
            label="Total Revenue"
            value={`₹${Number(cards.totalRevenue ?? 0).toLocaleString(
              "en-IN"
            )}`}
            icon={TrendingUp}
            accentColor="#059669"
            backgroundColor="#ECFDF5"
          />
        </View>
      </SectionCard>

      {/* =====================================================
          5. SYSTEM REVENUE ANALYTICS
      ====================================================== */}
      <SectionCard
        title="System Revenue Analytics"
        subtitle="Real-time monthly revenue trajectory across all organizations"
        headerRight={
          <View
            style={[
              styles.growthBadge,
              {
                backgroundColor: growthInfo.isPositive ? "#ECFDF5" : "#FEF2F2",
                borderColor: growthInfo.isPositive ? "#A7F3D0" : "#FECACA",
              },
            ]}
          >
            <TrendingUp
              size={13}
              color={growthInfo.isPositive ? "#047857" : "#DC2626"}
            />
            <Text
              style={[
                styles.growthBadgeText,
                {
                  color: growthInfo.isPositive ? "#047857" : "#DC2626",
                },
              ]}
            >
              {growthInfo.text}
            </Text>
          </View>
        }
      >
        <RevenueChart data={normalizedMonthlyRevenue} />
      </SectionCard>

      {/* =====================================================
          6. SYSTEM ACTIVITY FEED
      ====================================================== */}
      <SectionCard
        title="System Activity Feed"
        subtitle="Real-time sales orders and transaction log across organizations"
      >
        {recentOrders.length > 0 ? (
          <View style={styles.activityList}>
            {recentOrders.map((order) => (
              <ActivityItem key={order.id} order={order} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyFeedBox}>
            <Text style={styles.emptyFeedText}>No recent sales activity</Text>
          </View>
        )}
      </SectionCard>

      {/* =====================================================
          7. ENTERPRISE FOOTER
      ====================================================== */}
      <View style={styles.footer}>
        <Text style={styles.footerBrandText}>
          © 2026 IT360 Sales Force Automation Platform
        </Text>
        <Text style={styles.footerSubText}>
          Enterprise Super Admin Management System
        </Text>
      </View>
    </ScrollView>
  );
}

/* ============================================================
   STYLESHEET
============================================================ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 96,
    gap: 20,
  },

  /* Centered States */
  centeredState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F8FAFC",
  },
  loadingStateText: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
  },
  errorIconWrap: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#FEE2E2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  errorStateTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E293B",
    marginBottom: 6,
    textAlign: "center",
  },
  errorStateSubtitle: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 20,
    maxWidth: 280,
  },
  retryButton: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonPressed: {
    backgroundColor: "#4338CA",
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  /* Section Card & Headers */
  sectionHeaderContainer: {
    marginBottom: 10,
  },
  sectionHeaderLeft: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.2,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
    lineHeight: 17,
  },
  sectionCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionCardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 8,
  },
  sectionCardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.2,
  },
  sectionCardSubtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 3,
    lineHeight: 17,
  },

  /* Header Hero Card */
  headerCard: {
    width: "100%",
    backgroundColor: "#1E1B4B",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#4338CA",
    shadowColor: "#1E1B4B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  headerBadgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
  },
  organizationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(99, 102, 241, 0.25)",
    borderWidth: 1,
    borderColor: "rgba(165, 180, 252, 0.35)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  organizationBadgeText: {
    color: "#C7D2FE",
    fontSize: 11,
    fontWeight: "700",
  },
  adminBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(16, 185, 129, 0.20)",
    borderWidth: 1,
    borderColor: "rgba(110, 231, 183, 0.35)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  adminBadgeText: {
    color: "#6EE7B7",
    fontSize: 11,
    fontWeight: "700",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: -0.5,
    lineHeight: 28,
    marginBottom: 8,
  },
  headerSubtitle: {
    color: "#C7D2FE",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 18,
  },
  headerName: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  headerOrgHighlight: {
    color: "#FCD34D",
    fontWeight: "800",
  },
  headerRefreshButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.22)",
  },
  headerRefreshButtonPressed: {
    backgroundColor: "rgba(255, 255, 255, 0.22)",
  },
  headerRefreshText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  /* License Quota */
  licenseCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  licenseCardDanger: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
  },
  licenseCardWarning: {
    backgroundColor: "#FFFBEB",
    borderColor: "#FDE68A",
  },
  licenseTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12,
  },
  licenseIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  licenseDetails: {
    flex: 1,
  },
  licenseBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 4,
  },
  licenseTagText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
    color: "#64748B",
  },
  licenseBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  licenseBadgeText: {
    fontSize: 10,
    fontWeight: "800",
  },
  licenseCountText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },
  licenseHintText: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },
  licenseWarningBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  licenseWarningBoxText: {
    flex: 1,
    fontSize: 11,
    color: "#991B1B",
    fontWeight: "600",
  },
  licenseDescriptionText: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 12,
    lineHeight: 16,
  },
  progressBarBackground: {
    width: "100%",
    height: 8,
    borderRadius: 8,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 8,
  },

  /* Organization Overview Grid (2 Columns, Equal Height) */
  orgGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  orgCard: {
    width: "48.5%",
    minHeight: 104,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "space-between",
  },
  orgCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
    marginBottom: 8,
  },
  orgCardLabel: {
    flex: 1,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    color: "#475569",
    lineHeight: 15,
  },
  orgIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  orgCardValue: {
    fontSize: 24,
    fontWeight: "900",
    color: "#0F172A",
  },

  /* Business Metrics Grid (2 Columns, Full Width, No Truncation) */
  metricsGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  metricCard: {
    width: "48.5%",
    minHeight: 146,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 15,
    borderWidth: 1,
    justifyContent: "space-between",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  metricCardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  metricIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  metricCardBottom: {
    gap: 4,
  },
  metricCardLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.3,
    lineHeight: 15,
  },
  metricCardValue: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0F172A",
  },

  /* Revenue Chart */
  growthBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
  },
  growthBadgeText: {
    fontSize: 11,
    fontWeight: "800",
  },
  chartContainer: {
    width: "100%",
    marginTop: 8,
  },
  chartMonthsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginTop: 8,
  },
  chartMonthText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#64748B",
  },
  chartFooterRow: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chartFooterLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },
  chartFooterValue: {
    fontSize: 17,
    fontWeight: "900",
    color: "#0F172A",
  },

  /* Activity Feed */
  activityList: {
    width: "100%",
    gap: 10,
  },
  activityCard: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  activityMain: {
    gap: 8,
  },
  activityHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  activityOrderNumber: {
    flex: 1,
    fontSize: 13,
    fontWeight: "800",
    color: "#0F172A",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: "800",
  },
  activityDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  activityCustomerName: {
    flex: 1,
    fontSize: 13,
    color: "#475569",
    fontWeight: "600",
  },
  activityAmount: {
    fontSize: 14,
    fontWeight: "900",
    color: "#0F172A",
  },
  activityTime: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "500",
  },
  emptyFeedBox: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyFeedText: {
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "500",
  },

  /* Footer */
  footer: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    gap: 4,
    marginTop: 8,
  },
  footerBrandText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    textAlign: "center",
  },
  footerSubText: {
    fontSize: 11,
    color: "#94A3B8",
    textAlign: "center",
  },
});



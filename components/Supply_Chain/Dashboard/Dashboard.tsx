import React, { useMemo, useState, useEffect } from "react";
import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Boxes,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Filter,
  Flame,
  Gauge,
  Layers,
  MapPin,
  Package,
  PieChart,
  Plus,
  RefreshCw,
  Search,
  Shield,
  ShieldCheck,
  ShoppingCart,
  TrendingUp,
  Truck,
  UserCheck,
  UserPlus,
  Users,
  Warehouse,
  X,
  Zap,
} from "lucide-react-native";
import Svg, { Circle, G, Path, Line, Rect } from "react-native-svg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSupplyChainDashboard } from "./hooksks";

dayjs.extend(relativeTime);

export default function SupplyChainDashboard() {
  const { dashboard, loading, error, refreshing, refresh } =
    useSupplyChainDashboard();
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  // UI Interactive States
  const [activeTab, setActiveTab] = useState<"overview" | "logistics" | "activity">("overview");
  const [analyticsView, setAnalyticsView] = useState<"trend" | "shipment" | "status">("shipment");
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(dayjs()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute metrics from live dashboard data
  const licenses = dashboard?.licenses || { total: 500, used: 12, remaining: 488 };
  const cards = dashboard?.cards || {};
  const usersByRole = dashboard?.usersByRole || [];
  const recentActivities = dashboard?.recentActivities || [];

  const licensePercent = Math.min(
    100,
    Math.round(((licenses.used || 0) / (licenses.total || 500)) * 100)
  );

  const totalManagers = useMemo(() => {
    const managerRoles = [
      "ORDER_MANAGER",
      "ORDER_PROCUREMENT_MANAGER",
      "PROCUREMENT_MANAGER",
      "LOGISTICS_MANAGER",
      "INVENTORY_WAREHOUSE_MANAGER",
      "INVENTORY_MANAGER",
      "WAREHOUSE_MANAGER",
      "ACCOUNTANT",
      "GLOBAL_ACCOUNTANT",
    ];
    return (
      usersByRole
        .filter((r) => managerRoles.includes(r.role || r.code || ""))
        .reduce((acc, curr) => acc + (curr.count || 0), 0) || 7
    );
  }, [usersByRole]);

  const activeCustomers = useMemo(() => {
    const cust = usersByRole.find((r) => (r.role || r.code) === "CUSTOMER");
    return cust?.count || 1;
  }, [usersByRole]);

  const orderManagerCount = useMemo(() => {
    const role = usersByRole.find((r) =>
      ["ORDER_MANAGER", "ORDER_PROCUREMENT_MANAGER"].includes(r.role || r.code || "")
    );
    return role?.count || 1;
  }, [usersByRole]);

  const logisticsManagerCount = useMemo(() => {
    const role = usersByRole.find(
      (r) => (r.role || r.code || "") === "LOGISTICS_MANAGER"
    );
    return role?.count || 1;
  }, [usersByRole]);

  const warehouseManagerCount = useMemo(() => {
    const role = usersByRole.find((r) =>
      ["INVENTORY_WAREHOUSE_MANAGER", "WAREHOUSE_MANAGER", "INVENTORY_MANAGER"].includes(
        r.role || r.code || ""
      )
    );
    return role?.count || 1;
  }, [usersByRole]);

  const accountantCount = useMemo(() => {
    const role = usersByRole.find((r) =>
      ["ACCOUNTANT", "GLOBAL_ACCOUNTANT"].includes(r.role || r.code || "")
    );
    return role?.count || 1;
  }, [usersByRole]);

  // Operations Status Percentages
  const purchaseOrders = cards.purchaseOrders || 6;
  const pendingOrders = cards.pendingPurchaseOrders || 4;
  const orderProcessingPct = Math.round(
    ((purchaseOrders - pendingOrders) / (purchaseOrders || 1)) * 100
  );

  const activeShipments = cards.activeShipments || 1;
  const deliveredShipments = cards.deliveredShipments || 1;
  const shipmentCompletionPct = Math.round(
    (deliveredShipments / ((activeShipments + deliveredShipments) || 1)) * 100
  );

  const totalStock = cards.inventory?.totalQuantity || 5608;
  const availableStock = cards.inventory?.availableQuantity || 5408;
  const inventoryAvailabilityPct = Math.round(
    (availableStock / (totalStock || 1)) * 100
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
          tintColor="#0FA4AF"
          colors={["#0FA4AF"]}
        />
      }
    >
      {/* 1. ULTRA-COMPACT MOBILE HERO & QUICK METRICS HEADER */}
      <View style={styles.heroCard}>
        <View style={styles.heroGlowCircle} />
        
        {/* Top Header Row */}
        <View style={styles.heroTopRow}>
          <View style={styles.heroIdentity}>
            <View style={styles.heroOrgBadge}>
              <ShieldCheck size={14} color="#0FA4AF" />
              <Text style={styles.heroOrgBadgeText}>SCLM ENTERPRISE</Text>
            </View>
            <Text style={styles.heroTitle}>Org Operations</Text>
          </View>

          <View style={styles.heroLiveStatus}>
            <View style={styles.livePulseDot} />
            <Text style={styles.heroLiveTime}>
              {currentTime.format("hh:mm A")}
            </Text>
            <TouchableOpacity style={styles.heroRefreshBtn} onPress={refresh}>
              <RefreshCw size={13} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Dense Hero Stat Bar */}
        <View style={styles.heroStatBar}>
          <View style={styles.heroStatItem}>
            <Text style={styles.heroStatNum}>{totalManagers}</Text>
            <Text style={styles.heroStatLabel}>Managers</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStatItem}>
            <Text style={styles.heroStatNum}>{cards.warehouses ?? 7}</Text>
            <Text style={styles.heroStatLabel}>Warehouses</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStatItem}>
            <Text style={styles.heroStatNum}>{cards.products ?? 16}</Text>
            <Text style={styles.heroStatLabel}>Catalog</Text>
          </View>
          <View style={styles.heroStatDivider} />
          <View style={styles.heroStatItem}>
            <Text style={[styles.heroStatNum, { color: "#38bdf8" }]}>
              {cards.activeShipments ?? 1}
            </Text>
            <Text style={styles.heroStatLabel}>In Transit</Text>
          </View>
        </View>
      </View>

      {/* 2. DENSE LICENSE POOL STRIP */}
      <View style={styles.licenseStrip}>
        <View style={styles.licenseStripLeft}>
          <View style={styles.licenseIconWrap}>
            <Layers size={16} color="#0FA4AF" />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.licenseInlineRow}>
              <Text style={styles.licenseUsedText}>
                {licenses.used ?? 12} / {licenses.total ?? 500}
              </Text>
              <Text style={styles.licenseUsedSub}>Licenses Used ({licensePercent}%)</Text>
              <View style={styles.licenseGreenPill}>
                <Text style={styles.licenseGreenPillText}>
                  +{licenses.remaining ?? 488} Left
                </Text>
              </View>
            </View>
            {/* Micro Progress Bar */}
            <View style={styles.microProgressBg}>
              <View
                style={[
                  styles.microProgressFill,
                  { width: `${Math.max(licensePercent, 2)}%` },
                ]}
              />
            </View>
          </View>
        </View>
      </View>

      {/* 4. PRIMARY 2x4 HIGH-DENSITY KPI MATRIX */}
      <View style={styles.denseGrid}>
        {/* Row 1 */}
        <View style={styles.denseCard}>
          <View style={styles.denseCardHeader}>
            <View style={[styles.denseIconBox, { backgroundColor: "#E8F7F8" }]}>
              <Users size={16} color="#0FA4AF" />
            </View>
            <Text style={styles.denseBadge}>7 Active</Text>
          </View>
          <Text style={styles.denseCount}>{totalManagers}</Text>
          <Text style={styles.denseTitle}>Total Managers</Text>
          <Text style={styles.denseSub}>Across op teams</Text>
        </View>

        <View style={styles.denseCard}>
          <View style={styles.denseCardHeader}>
            <View style={[styles.denseIconBox, { backgroundColor: "#ECFDF5" }]}>
              <UserCheck size={16} color="#059669" />
            </View>
            <Text style={[styles.denseBadge, { backgroundColor: "#ECFDF5", color: "#059669" }]}>Retail</Text>
          </View>
          <Text style={styles.denseCount}>{activeCustomers}</Text>
          <Text style={styles.denseTitle}>Active Customers</Text>
          <Text style={styles.denseSub}>Org accounts</Text>
        </View>

        {/* Row 2 */}
        <View style={styles.denseCard}>
          <View style={styles.denseCardHeader}>
            <View style={[styles.denseIconBox, { backgroundColor: "#FEF3C7" }]}>
              <Boxes size={16} color="#D97706" />
            </View>
            <Text style={[styles.denseBadge, { backgroundColor: "#FEF3C7", color: "#D97706" }]}>
              {cards.pendingPurchaseOrders ?? 4} Pend
            </Text>
          </View>
          <Text style={styles.denseCount}>{cards.purchaseOrders ?? 6}</Text>
          <Text style={styles.denseTitle}>Purchase Orders</Text>
          <Text style={styles.denseSub}>4 awaiting review</Text>
        </View>

        <View style={styles.denseCard}>
          <View style={styles.denseCardHeader}>
            <View style={[styles.denseIconBox, { backgroundColor: "#EFF6FF" }]}>
              <Truck size={16} color="#2563EB" />
            </View>
            <Text style={[styles.denseBadge, { backgroundColor: "#EFF6FF", color: "#2563EB" }]}>Live</Text>
          </View>
          <Text style={styles.denseCount}>{cards.activeShipments ?? 1}</Text>
          <Text style={styles.denseTitle}>Active Shipments</Text>
          <Text style={styles.denseSub}>1 delivered</Text>
        </View>

        {/* Row 3 */}
        <View style={styles.denseCard}>
          <View style={styles.denseCardHeader}>
            <View style={[styles.denseIconBox, { backgroundColor: "#FDF2F8" }]}>
              <Package size={16} color="#DB2777" />
            </View>
            <Text style={[styles.denseBadge, { backgroundColor: "#FDF2F8", color: "#DB2777" }]}>
              {cards.lowStock ?? 3} Low
            </Text>
          </View>
          <Text style={styles.denseCount}>{cards.products ?? 16}</Text>
          <Text style={styles.denseTitle}>Catalog Products</Text>
          <Text style={styles.denseSub}>In active catalog</Text>
        </View>

        <View style={styles.denseCard}>
          <View style={styles.denseCardHeader}>
            <View style={[styles.denseIconBox, { backgroundColor: "#F3E8FF" }]}>
              <Warehouse size={16} color="#9333EA" />
            </View>
            <Text style={[styles.denseBadge, { backgroundColor: "#F3E8FF", color: "#9333EA" }]}>5.6k U</Text>
          </View>
          <Text style={styles.denseCount}>{cards.warehouses ?? 7}</Text>
          <Text style={styles.denseTitle}>Warehouses</Text>
          <Text style={styles.denseSub}>{totalStock} stock units</Text>
        </View>

        {/* Row 4 */}
        <View style={styles.denseCard}>
          <View style={styles.denseCardHeader}>
            <View style={[styles.denseIconBox, { backgroundColor: "#E0F2FE" }]}>
              <Truck size={16} color="#0284C7" />
            </View>
            <Text style={[styles.denseBadge, { backgroundColor: "#E0F2FE", color: "#0284C7" }]}>6 Driv</Text>
          </View>
          <Text style={styles.denseCount}>{cards.availableVehicles ?? 10}</Text>
          <Text style={styles.denseTitle}>Available Fleet</Text>
          <Text style={styles.denseSub}>10 tracked vehicles</Text>
        </View>

        <View style={styles.denseCard}>
          <View style={styles.denseCardHeader}>
            <View style={[styles.denseIconBox, { backgroundColor: "#F1F5F9" }]}>
              <ClipboardCheck size={16} color="#475569" />
            </View>
            <Text style={styles.denseBadge}>0 Pend</Text>
          </View>
          <Text style={styles.denseCount}>0</Text>
          <Text style={styles.denseTitle}>Pending Approvals</Text>
          <Text style={styles.denseSub}>Queue all clear</Text>
        </View>
      </View>

      {/* 5. INTERACTIVE 3-IN-1 ANALYTICS SEGMENTED CARD */}
      <View style={styles.denseSectionCard}>
        {/* Segmented Controller Tab Header */}
        <View style={styles.segmentedControl}>
          <TouchableOpacity
            style={[
              styles.segmentBtn,
              analyticsView === "shipment" && styles.segmentBtnActive,
            ]}
            onPress={() => setAnalyticsView("shipment")}
          >
            <PieChart
              size={13}
              color={analyticsView === "shipment" ? "#0FA4AF" : "#64748B"}
              style={{ marginRight: 4 }}
            />
            <Text
              style={[
                styles.segmentBtnText,
                analyticsView === "shipment" && styles.segmentBtnTextActive,
              ]}
            >
              Shipment Status
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentBtn,
              analyticsView === "status" && styles.segmentBtnActive,
            ]}
            onPress={() => setAnalyticsView("status")}
          >
            <Gauge
              size={13}
              color={analyticsView === "status" ? "#0FA4AF" : "#64748B"}
              style={{ marginRight: 4 }}
            />
            <Text
              style={[
                styles.segmentBtnText,
                analyticsView === "status" && styles.segmentBtnTextActive,
              ]}
            >
              Ops Status
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentBtn,
              analyticsView === "trend" && styles.segmentBtnActive,
            ]}
            onPress={() => setAnalyticsView("trend")}
          >
            <BarChart3
              size={13}
              color={analyticsView === "trend" ? "#0FA4AF" : "#64748B"}
              style={{ marginRight: 4 }}
            />
            <Text
              style={[
                styles.segmentBtnText,
                analyticsView === "trend" && styles.segmentBtnTextActive,
              ]}
            >
              Delivery Trend
            </Text>
          </TouchableOpacity>
        </View>

        {/* View A: Shipment Status Donut */}
        {analyticsView === "shipment" && (
          <View style={styles.donutRowMobile}>
            <View style={styles.donutContainer}>
              <Svg height="110" width="110" viewBox="0 0 100 100">
                <Circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="#0284c7"
                  strokeWidth="14"
                  fill="transparent"
                  strokeDasharray="60 180"
                  strokeDashoffset="0"
                />
                <Circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="#0FA4AF"
                  strokeWidth="14"
                  fill="transparent"
                  strokeDasharray="80 160"
                  strokeDashoffset="-65"
                />
                <Circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="#16a34a"
                  strokeWidth="14"
                  fill="transparent"
                  strokeDasharray="50 190"
                  strokeDashoffset="-150"
                />
                <Circle
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="#e11d48"
                  strokeWidth="14"
                  fill="transparent"
                  strokeDasharray="40 200"
                  strokeDashoffset="-205"
                />
              </Svg>
            </View>

            <View style={styles.donutLegendMobile}>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: "#0284c7" }]} />
                <Text style={styles.legendText}>IN TRANSIT</Text>
                <Text style={styles.legendNum}>1</Text>
              </View>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: "#e11d48" }]} />
                <Text style={styles.legendText}>FAILED</Text>
                <Text style={styles.legendNum}>1</Text>
              </View>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: "#0FA4AF" }]} />
                <Text style={styles.legendText}>PICKUP REACHED</Text>
                <Text style={styles.legendNum}>2</Text>
              </View>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: "#16a34a" }]} />
                <Text style={styles.legendText}>DELIVERED</Text>
                <Text style={styles.legendNum}>1</Text>
              </View>
            </View>
          </View>
        )}

        {/* View B: Operations Status Gauges */}
        {analyticsView === "status" && (
          <View style={styles.opsStatusContainer}>
            <View style={styles.statusBarItem}>
              <View style={styles.statusLabelRow}>
                <Text style={styles.statusName}>Order Processing</Text>
                <Text style={styles.statusValue}>{orderProcessingPct}%</Text>
              </View>
              <View style={styles.statusBarBg}>
                <View style={[styles.statusBarFill, { width: `${Math.max(orderProcessingPct, 5)}%` }]} />
              </View>
            </View>

            <View style={styles.statusBarItem}>
              <View style={styles.statusLabelRow}>
                <Text style={styles.statusName}>Shipment Completion</Text>
                <Text style={styles.statusValue}>{shipmentCompletionPct}%</Text>
              </View>
              <View style={styles.statusBarBg}>
                <View style={[styles.statusBarFill, { width: `${Math.max(shipmentCompletionPct, 5)}%`, backgroundColor: "#0284c7" }]} />
              </View>
            </View>

            <View style={styles.statusBarItem}>
              <View style={styles.statusLabelRow}>
                <Text style={styles.statusName}>Vehicle Availability</Text>
                <Text style={styles.statusValue}>100%</Text>
              </View>
              <View style={styles.statusBarBg}>
                <View style={[styles.statusBarFill, { width: "100%", backgroundColor: "#16a34a" }]} />
              </View>
            </View>

            <View style={styles.statusBarItem}>
              <View style={styles.statusLabelRow}>
                <Text style={styles.statusName}>Inventory Availability</Text>
                <Text style={styles.statusValue}>{inventoryAvailabilityPct}%</Text>
              </View>
              <View style={styles.statusBarBg}>
                <View style={[styles.statusBarFill, { width: `${Math.max(inventoryAvailabilityPct, 5)}%`, backgroundColor: "#9333ea" }]} />
              </View>
            </View>
          </View>
        )}

        {/* View C: Delivery Trend Chart */}
        {analyticsView === "trend" && (
          <View style={styles.chartBoxMobile}>
            <Svg height="120" width="100%" viewBox="0 0 320 120">
              <Line x1="20" y1="20" x2="300" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <Line x1="20" y1="60" x2="300" y2="60" stroke="#f1f5f9" strokeWidth="1" />
              <Line x1="20" y1="100" x2="300" y2="100" stroke="#e2e8f0" strokeWidth="1" />
              <Path
                d="M 40 100 Q 120 80, 180 60 T 280 40"
                fill="none"
                stroke="#0FA4AF"
                strokeWidth="3"
              />
              <Circle cx="180" cy="60" r="4" fill="#0FA4AF" stroke="#ffffff" strokeWidth="2" />
              <Circle cx="280" cy="40" r="4" fill="#0FA4AF" stroke="#ffffff" strokeWidth="2" />
            </Svg>
            <View style={styles.chartXAxisMobile}>
              <Text style={styles.chartXLabelMobile}>Period: 2026-09 (Completed: 1)</Text>
            </View>
          </View>
        )}
      </View>

      {/* 6. OPERATIONAL MANAGERS BREAKDOWN (2x2 RESPONSIVE GRID) */}
      <View style={styles.denseSectionCard}>
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionHeading}>Managers Breakdown</Text>
          <Text style={styles.sectionSubHeading}>4 Roles Assigned</Text>
        </View>

        <View style={styles.managerPillGrid}>
          {/* Order Manager */}
          <View style={styles.managerPill}>
            <View style={[styles.managerPillIconWrap, { backgroundColor: "#E8F7F8" }]}>
              <Boxes size={18} color="#0FA4AF" />
            </View>
            <View style={styles.managerPillInfo}>
              <Text style={styles.managerPillTitle}>Order Mgr</Text>
              <Text style={styles.managerPillSub} numberOfLines={1}>Pipeline & orders</Text>
            </View>
            <View style={[styles.managerPillCount, { backgroundColor: "#E8F7F8" }]}>
              <Text style={[styles.managerPillCountText, { color: "#0FA4AF" }]}>{orderManagerCount}</Text>
            </View>
          </View>

          {/* Logistics Manager */}
          <View style={styles.managerPill}>
            <View style={[styles.managerPillIconWrap, { backgroundColor: "#E0F2FE" }]}>
              <Truck size={18} color="#0284c7" />
            </View>
            <View style={styles.managerPillInfo}>
              <Text style={styles.managerPillTitle}>Logistics Mgr</Text>
              <Text style={styles.managerPillSub} numberOfLines={1}>Fleet & dispatch</Text>
            </View>
            <View style={[styles.managerPillCount, { backgroundColor: "#E0F2FE" }]}>
              <Text style={[styles.managerPillCountText, { color: "#0284c7" }]}>{logisticsManagerCount}</Text>
            </View>
          </View>

          {/* Warehouse Manager */}
          <View style={styles.managerPill}>
            <View style={[styles.managerPillIconWrap, { backgroundColor: "#F3E8FF" }]}>
              <Warehouse size={18} color="#9333ea" />
            </View>
            <View style={styles.managerPillInfo}>
              <Text style={styles.managerPillTitle}>Warehouse</Text>
              <Text style={styles.managerPillSub} numberOfLines={1}>Stock & facilities</Text>
            </View>
            <View style={[styles.managerPillCount, { backgroundColor: "#F3E8FF" }]}>
              <Text style={[styles.managerPillCountText, { color: "#9333ea" }]}>{warehouseManagerCount}</Text>
            </View>
          </View>

          {/* Accountant */}
          <View style={styles.managerPill}>
            <View style={[styles.managerPillIconWrap, { backgroundColor: "#ECFDF5" }]}>
              <BarChart3 size={18} color="#059669" />
            </View>
            <View style={styles.managerPillInfo}>
              <Text style={styles.managerPillTitle}>Accountant</Text>
              <Text style={styles.managerPillSub} numberOfLines={1}>Billing & audits</Text>
            </View>
            <View style={[styles.managerPillCount, { backgroundColor: "#ECFDF5" }]}>
              <Text style={[styles.managerPillCountText, { color: "#059669" }]}>{accountantCount}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  contentContainer: {
    padding: 12,
    paddingBottom: 40,
    gap: 12,
  },

  /* 1. Ultra-Compact Hero */
  heroCard: {
    backgroundColor: "#003135",
    borderRadius: 16,
    padding: 16,
    position: "relative",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  heroGlowCircle: {
    position: "absolute",
    right: -30,
    top: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(15, 164, 175, 0.3)",
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroIdentity: {
    gap: 2,
  },
  heroOrgBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 164, 175, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: "flex-start",
    gap: 4,
  },
  heroOrgBadgeText: {
    color: "#0FA4AF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.3,
  },
  heroLiveStatus: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
  },
  livePulseDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: "#10B981",
  },
  heroLiveTime: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  heroRefreshBtn: {
    marginLeft: 4,
    padding: 2,
  },
  heroStatBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 12,
    paddingVertical: 10,
    marginTop: 14,
  },
  heroStatItem: {
    alignItems: "center",
    flex: 1,
  },
  heroStatNum: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  heroStatLabel: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 1,
    fontWeight: "600",
  },
  heroStatDivider: {
    width: 1,
    height: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },

  /* 2. License Strip */
  licenseStrip: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  licenseStripLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  licenseIconWrap: {
    backgroundColor: "#E8F7F8",
    padding: 8,
    borderRadius: 8,
  },
  licenseInlineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  licenseUsedText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
  },
  licenseUsedSub: {
    fontSize: 11,
    color: "#64748B",
    marginLeft: 6,
    flex: 1,
  },
  licenseGreenPill: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  licenseGreenPillText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#16A34A",
  },
  microProgressBg: {
    height: 5,
    backgroundColor: "#E2E8F0",
    borderRadius: 3,
    marginTop: 6,
    overflow: "hidden",
  },
  microProgressFill: {
    height: "100%",
    backgroundColor: "#0FA4AF",
    borderRadius: 3,
  },

  /* 3. Fast Action Chips */
  quickChipsContainer: {
    gap: 8,
    paddingVertical: 2,
  },
  actionChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    gap: 6,
  },
  actionChipText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#334155",
  },

  /* 4. Dense 2x4 Metric Grid */
  denseGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  denseCard: {
    width: "48.7%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  denseCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  denseIconBox: {
    padding: 6,
    borderRadius: 6,
  },
  denseBadge: {
    fontSize: 10,
    fontWeight: "700",
    backgroundColor: "#F1F5F9",
    color: "#64748B",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  denseCount: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    marginTop: 8,
    letterSpacing: -0.3,
  },
  denseTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 1,
  },
  denseSub: {
    fontSize: 10,
    color: "#64748B",
    marginTop: 1,
  },

  /* 5. Dense Segmented Analytics Card */
  denseSectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    padding: 3,
    marginBottom: 12,
  },
  segmentBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 7,
    borderRadius: 8,
  },
  segmentBtnActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  segmentBtnText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },
  segmentBtnTextActive: {
    color: "#0FA4AF",
    fontWeight: "800",
  },

  /* Donut Layout */
  donutRowMobile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  donutContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  donutLegendMobile: {
    flex: 1,
    marginLeft: 14,
    gap: 8,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  legendText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#475569",
    flex: 1,
  },
  legendNum: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0F172A",
  },

  /* Ops Status */
  opsStatusContainer: {
    gap: 10,
    paddingVertical: 4,
  },
  statusBarItem: {
    gap: 3,
  },
  statusLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusName: {
    fontSize: 11,
    fontWeight: "600",
    color: "#334155",
  },
  statusValue: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0FA4AF",
  },
  statusBarBg: {
    height: 6,
    backgroundColor: "#F1F5F9",
    borderRadius: 3,
    overflow: "hidden",
  },
  statusBarFill: {
    height: "100%",
    backgroundColor: "#0FA4AF",
    borderRadius: 3,
  },

  /* Trend Chart */
  chartBoxMobile: {
    alignItems: "center",
  },
  chartXAxisMobile: {
    marginTop: 4,
  },
  chartXLabelMobile: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
  },

  /* 6. Manager Pills Grid */
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
  },
  sectionSubHeading: {
    fontSize: 11,
    color: "#64748B",
    fontWeight: "500",
  },
  managerPillGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 8,
  },
  managerPill: {
    width: "48.5%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 8,
  },
  managerPillIconWrap: {
    padding: 8,
    borderRadius: 8,
  },
  managerPillInfo: {
    flex: 1,
    minWidth: 0,
  },
  managerPillTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0F172A",
  },
  managerPillSub: {
    fontSize: 10,
    color: "#64748B",
    marginTop: 1,
  },
  managerPillCount: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
  },
  managerPillCountText: {
    fontSize: 11,
    fontWeight: "800",
  },

  /* 7. Live Activity Feed */
  activityFeedList: {
    gap: 10,
  },
  activityFeedItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  activityFeedDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginTop: 4,
  },
  activityFeedContent: {
    flex: 1,
  },
  activityFeedTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activityFeedAction: {
    fontSize: 11,
    fontWeight: "800",
    color: "#0F172A",
  },
  activityFeedTime: {
    fontSize: 10,
    color: "#94A3B8",
    fontWeight: "500",
  },
  activityFeedUser: {
    fontSize: 10,
    color: "#64748B",
    marginTop: 1,
  },
});

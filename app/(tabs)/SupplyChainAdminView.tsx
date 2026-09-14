// import React, { useMemo } from "react";
// import {
//     ScrollView,
//     StyleSheet,
//     Text,
//     View,
//     Pressable,
//     useWindowDimensions,
// } from "react-native";
// import {
//     ArrowRight,
//     BarChart3,
//     Boxes,
//     CalendarDays,
//     CheckCircle2,
//     ClipboardCheck,
//     Clock3,
//     Gauge,
//     Package,
//     Truck,
//     Users,
//     Warehouse,
// } from "lucide-react-native";

// type RoleCount = {
//     role: string;
//     count: number;
// };

// type Approval = {
//     id: string;
//     name: string;
//     approvalType: "Driver" | "Vehicle";
// };

// type Activity = {
//     id: string;
//     title: string;
//     user: string;
//     createdAt: string;
// };

// const COLORS = {
//     primary: "#0FA4AF",
//     primaryDark: "#003135",
//     primaryLight: "#E8F7F8",
//     text: "#0F172A",
//     muted: "#64748B",
//     border: "#E2E8F0",
//     card: "#FFFFFF",
//     background: "#F8FAFC",
//     green: "#16A34A",
//     amber: "#D97706",
//     rose: "#E11D48",
// };

// const dummyData = {
//     user: { name: "Rahul Ahirwal" },

//     licenses: {
//         total: 25,
//         used: 18,
//         remaining: 7,
//     },

//     cards: {
//         customers: 42,
//         purchaseOrders: 128,
//         pendingPurchaseOrders: 14,
//         activeShipments: 36,
//         deliveredShipments: 214,
//         delayedShipments: 8,
//         products: 864,
//         lowStock: 27,
//         warehouses: 8,
//         availableVehicles: 19,
//     },

//     usersByRole: [
//         { role: "ORDER_MANAGER", count: 5 },
//         { role: "LOGISTICS_MANAGER", count: 4 },
//         { role: "INVENTORY_WAREHOUSE_MANAGER", count: 6 },
//         { role: "ACCOUNTANT", count: 3 },
//         { role: "CUSTOMER", count: 42 },
//     ] as RoleCount[],

//     inventory: {
//         totalQuantity: 12840,
//         availableQuantity: 9360,
//     },

//     vehicleStatus: [
//         { status: "AVAILABLE", count: 19 },
//         { status: "IN_TRANSIT", count: 12 },
//         { status: "MAINTENANCE", count: 5 },
//     ],

//     deliveryTrend: [
//         { period: "Apr", total: 32 },
//         { period: "May", total: 46 },
//         { period: "Jun", total: 41 },
//         { period: "Jul", total: 59 },
//         { period: "Aug", total: 71 },
//         { period: "Sep", total: 64 },
//     ],

//     shipmentStatus: [
//         { status: "DELIVERED", value: 214 },
//         { status: "IN_TRANSIT", value: 36 },
//         { status: "DELAYED", value: 8 },
//         { status: "PROCESSING", value: 17 },
//     ],

//     approvals: [
//         { id: "a1", name: "Amit Sharma", approvalType: "Driver" },
//         { id: "a2", name: "MP09 AB 4521", approvalType: "Vehicle" },
//         { id: "a3", name: "Vikram Singh", approvalType: "Driver" },
//         { id: "a4", name: "MP09 CD 7812", approvalType: "Vehicle" },
//     ] as Approval[],

//     activities: [
//         {
//             id: "1",
//             title: "Purchase order PO-1048 was approved",
//             user: "Rahul",
//             createdAt: "Today, 10:42 AM",
//         },
//         {
//             id: "2",
//             title: "New vehicle MP09 EF 2210 was added",
//             user: "Logistics Manager",
//             createdAt: "Today, 09:18 AM",
//         },
//         {
//             id: "3",
//             title: "Shipment SH-2031 marked as delivered",
//             user: "Dispatch Team",
//             createdAt: "Yesterday, 06:35 PM",
//         },
//         {
//             id: "4",
//             title: "Inventory quantity updated for SKU-882",
//             user: "Warehouse Manager",
//             createdAt: "Yesterday, 04:12 PM",
//         },
//         {
//             id: "5",
//             title: "New customer account was created",
//             user: "Accountant",
//             createdAt: "Yesterday, 01:26 PM",
//         },
//         {
//             id: "6",
//             title: "Driver document submitted for approval",
//             user: "Amit Sharma",
//             createdAt: "Sep 12, 11:05 AM",
//         },
//     ] as Activity[],
// };

// const managerRoles = [
//     {
//         role: "ORDER_MANAGER",
//         label: "Order Manager",
//         description: "Order pipeline & processing",
//         icon: Boxes,
//     },
//     {
//         role: "LOGISTICS_MANAGER",
//         label: "Logistics Manager",
//         description: "Fleet, routes & dispatch",
//         icon: Truck,
//     },
//     {
//         role: "INVENTORY_WAREHOUSE_MANAGER",
//         label: "Inv & Warehouse Manager",
//         description: "Stock & facility oversight",
//         icon: Warehouse,
//     },
//     {
//         role: "ACCOUNTANT",
//         label: "Accountant",
//         description: "Invoices & transactions",
//         icon: BarChart3,
//     },
// ];

// const quickActions = [
//     { label: "Add Manager", icon: Users },
//     { label: "View Approvals", icon: ClipboardCheck },
//     { label: "View Orders", icon: Boxes },
//     { label: "View Shipments", icon: Truck },
//     { label: "View Warehouses", icon: Warehouse },
//     { label: "View Drivers", icon: Users },
// ];

// function formatNumber(value: number) {
//     return value.toLocaleString();
// }

// function ProgressRow({
//     label,
//     value,
// }: {
//     label: string;
//     value: number;
// }) {
//     const percentage = Math.max(0, Math.min(100, Math.round(value)));

//     return (
//         <View style={styles.progressBlock}>
//             <View style={styles.progressHeader}>
//                 <Text style={styles.progressLabel}>{label}</Text>
//                 <Text style={styles.progressValue}>{percentage}%</Text>
//             </View>
//             <View style={styles.progressTrack}>
//                 <View style={[styles.progressFill, { width: `${percentage}%` }]} />
//             </View>
//         </View>
//     );
// }

// function KpiCard({
//     label,
//     value,
//     helper,
//     icon: Icon,
// }: {
//     label: string;
//     value: number;
//     helper: string;
//     icon: React.ComponentType<any>;
// }) {
//     return (
//         <View style={styles.kpiCard}>
//             <View style={styles.kpiTop}>
//                 <View style={styles.iconBox}>
//                     <Icon size={20} color={COLORS.primary} />
//                 </View>
//                 <ArrowRight size={17} color="#CBD5E1" />
//             </View>

//             <Text style={styles.kpiValue}>{formatNumber(value)}</Text>
//             <Text style={styles.kpiLabel}>{label}</Text>
//             <Text style={styles.kpiHelper}>{helper}</Text>
//         </View>
//     );
// }

// function SectionHeader({
//     title,
//     subtitle,
//     action,
// }: {
//     title: string;
//     subtitle?: string;
//     action?: string;
// }) {
//     return (
//         <View style={styles.sectionHeader}>
//             <View style={{ flex: 1 }}>
//                 <Text style={styles.sectionTitle}>{title}</Text>
//                 {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
//             </View>
//             {action ? (
//                 <Pressable>
//                     <Text style={styles.actionText}>{action}</Text>
//                 </Pressable>
//             ) : null}
//         </View>
//     );
// }

// export default function AdminDashboard() {
//     const { width } = useWindowDimensions();

//     const isTablet = width >= 700;
//     const isWide = width >= 1000;

//     const data = dummyData;

//     const managerCount = useMemo(
//         () =>
//             data.usersByRole
//                 .filter((item) => item.role.includes("MANAGER"))
//                 .reduce((total, item) => total + item.count, 0),
//         []
//     );

//     const customerCount =
//         data.usersByRole.find((item) => item.role === "CUSTOMER")?.count ??
//         data.cards.customers;

//     const totalVehicles = data.vehicleStatus.reduce(
//         (total, item) => total + item.count,
//         0
//     );

//     const availableVehicles = data.vehicleStatus.find(
//         (item) => item.status === "AVAILABLE"
//     )?.count ?? 0;

//     const shipmentTotal =
//         data.cards.activeShipments +
//         data.cards.deliveredShipments +
//         data.cards.delayedShipments;

//     const licensePercentage = Math.min(
//         100,
//         Math.round((data.licenses.used / data.licenses.total) * 100)
//     );

//     const operations = [
//         {
//             label: "Order Processing",
//             value:
//                 ((data.cards.purchaseOrders - data.cards.pendingPurchaseOrders) /
//                     data.cards.purchaseOrders) *
//                 100,
//         },
//         {
//             label: "Shipment Completion",
//             value: (data.cards.deliveredShipments / shipmentTotal) * 100,
//         },
//         {
//             label: "Vehicle Availability",
//             value: (availableVehicles / totalVehicles) * 100,
//         },
//         {
//             label: "Inventory Availability",
//             value:
//                 (data.inventory.availableQuantity / data.inventory.totalQuantity) *
//                 100,
//         },
//     ];

//     const now = new Date();
//     const greeting =
//         now.getHours() < 12
//             ? "Good morning"
//             : now.getHours() < 18
//                 ? "Good afternoon"
//                 : "Good evening";

//     const dateLabel = now.toLocaleDateString(undefined, {
//         month: "long",
//         day: "numeric",
//         year: "numeric",
//     });

//     const weekday = now.toLocaleDateString(undefined, {
//         weekday: "long",
//     });

//     const timeLabel = now.toLocaleTimeString(undefined, {
//         hour: "2-digit",
//         minute: "2-digit",
//     });

//     const kpis = [
//         {
//             label: "Total Managers",
//             value: managerCount,
//             helper: "Across operational teams",
//             icon: Users,
//         },
//         {
//             label: "Active Customers",
//             value: customerCount,
//             helper: "Organization customers",
//             icon: Users,
//         },
//         {
//             label: "Purchase Orders",
//             value: data.cards.purchaseOrders,
//             helper: `${data.cards.pendingPurchaseOrders} pending`,
//             icon: Boxes,
//         },
//         {
//             label: "Active Shipments",
//             value: data.cards.activeShipments,
//             helper: `${data.cards.deliveredShipments} delivered`,
//             icon: Truck,
//         },
//         {
//             label: "Products",
//             value: data.cards.products,
//             helper: `${data.cards.lowStock} low stock`,
//             icon: Package,
//         },
//         {
//             label: "Warehouses",
//             value: data.cards.warehouses,
//             helper: `${formatNumber(data.inventory.totalQuantity)} inventory units`,
//             icon: Warehouse,
//         },
//         {
//             label: "Available Vehicles",
//             value: data.cards.availableVehicles,
//             helper: `${totalVehicles} tracked`,
//             icon: Truck,
//         },
//         {
//             label: "Pending Approvals",
//             value: data.approvals.length,
//             helper: "Drivers and vehicles",
//             icon: ClipboardCheck,
//         },
//     ];

//     const chartMax = Math.max(...data.deliveryTrend.map((item) => item.total));

//     return (
//         <ScrollView
//             style={styles.screen}
//             contentContainerStyle={[
//                 styles.content,
//                 { paddingHorizontal: isTablet ? 24 : 16 },
//             ]}
//             showsVerticalScrollIndicator={false}
//         >
//             {/* Hero + date */}
//             <View
//                 style={[
//                     styles.heroRow,
//                     isWide ? styles.heroRowWide : undefined,
//                 ]}
//             >
//                 <View style={styles.heroCard}>
//                     <View style={styles.heroCircle} />

//                     <View style={styles.heroContent}>
//                         <Text style={styles.heroGreeting}>{greeting},</Text>
//                         <Text style={styles.heroName}>{data.user.name}</Text>
//                         <Text style={styles.heroDescription}>
//                             Manage your organization&apos;s orders, warehouses, shipments,
//                             drivers, and approvals from one connected operations dashboard.
//                         </Text>

//                         <View style={styles.onlinePill}>
//                             <CheckCircle2 size={15} color="#FFFFFF" />
//                             <Text style={styles.onlineText}>Operations center online</Text>
//                         </View>
//                     </View>
//                 </View>

//                 <View style={[styles.dateCard, isWide ? { flex: 0.8 } : undefined]}>
//                     <View style={styles.dateTop}>
//                         <View style={styles.dateIcon}>
//                             <CalendarDays size={22} color={COLORS.primary} />
//                         </View>
//                         <View style={styles.livePill}>
//                             <Text style={styles.liveText}>Live</Text>
//                         </View>
//                     </View>

//                     <View>
//                         <Text style={styles.dateText}>{dateLabel}</Text>
//                         <Text style={styles.weekday}>{weekday}</Text>
//                     </View>

//                     <View style={styles.timeRow}>
//                         <Clock3 size={17} color={COLORS.primary} />
//                         <Text style={styles.timeText}>{timeLabel}</Text>
//                     </View>
//                 </View>
//             </View>

//             {/* License pool */}
//             <View style={styles.card}>
//                 <View style={styles.licenseTop}>
//                     <View style={{ flex: 1 }}>
//                         <View style={styles.licenseLabelRow}>
//                             <Text style={styles.licenseBadge}>LICENSE POOL</Text>
//                             <Text style={styles.smallMuted}>Active User Allocation</Text>
//                         </View>

//                         <Text style={styles.licenseTitle}>
//                             {data.licenses.used} / {data.licenses.total}{" "}
//                             <Text style={styles.licenseTitleMuted}>Licenses Used</Text>
//                         </Text>

//                         <Text style={styles.licenseDescription}>
//                             Each active manager account consumes 1 license. Deactivating an
//                             account immediately returns the license to the available pool.
//                         </Text>
//                     </View>

//                     <View style={styles.licenseStats}>
//                         <View style={styles.licenseStat}>
//                             <Text style={styles.statCaption}>TOTAL</Text>
//                             <Text style={styles.statValue}>{data.licenses.total}</Text>
//                         </View>

//                         <View style={styles.licenseStat}>
//                             <Text style={styles.statCaption}>USED</Text>
//                             <Text style={[styles.statValue, { color: COLORS.primary }]}>
//                                 {data.licenses.used}
//                             </Text>
//                         </View>

//                         <View style={[styles.licenseStat, styles.remainingStat]}>
//                             <Text style={[styles.statCaption, { color: COLORS.green }]}>
//                                 REMAINING
//                             </Text>
//                             <Text style={[styles.statValue, { color: COLORS.green }]}>
//                                 {data.licenses.remaining}
//                             </Text>
//                         </View>

//                         <Pressable style={styles.primaryButton}>
//                             <Text style={styles.primaryButtonText}>Manage Users</Text>
//                             <ArrowRight size={14} color="#FFFFFF" />
//                         </Pressable>
//                     </View>
//                 </View>

//                 <View style={styles.licenseProgressHeader}>
//                     <Text style={styles.progressLabel}>License Utilization</Text>
//                     <Text style={styles.progressValue}>{licensePercentage}%</Text>
//                 </View>

//                 <View style={styles.progressTrack}>
//                     <View
//                         style={[
//                             styles.progressFill,
//                             {
//                                 width: `${licensePercentage}%`,
//                                 backgroundColor:
//                                     licensePercentage >= 100
//                                         ? COLORS.rose
//                                         : licensePercentage >= 80
//                                             ? COLORS.amber
//                                             : COLORS.primary,
//                             },
//                         ]}
//                     />
//                 </View>
//             </View>

//             {/* KPI cards */}
//             <View
//                 style={[
//                     styles.kpiGrid,
//                     isTablet ? styles.kpiGridTablet : undefined,
//                 ]}
//             >
//                 {kpis.map((item) => (
//                     <View
//                         key={item.label}
//                         style={[
//                             styles.kpiWrapper,
//                             isTablet ? { width: "25%" } : { width: "50%" },
//                         ]}
//                     >
//                         <KpiCard {...item} />
//                     </View>
//                 ))}
//             </View>

//             {/* Managers */}
//             <View style={styles.card}>
//                 <SectionHeader
//                     title="Operational Managers Breakdown"
//                     subtitle="Live distribution of active manager roles in this organization"
//                     action="Manage All Managers →"
//                 />

//                 <View style={styles.managerGrid}>
//                     {managerRoles.map((item) => {
//                         const count =
//                             data.usersByRole.find((role) => role.role === item.role)
//                                 ?.count ?? 0;
//                         const Icon = item.icon;

//                         return (
//                             <View key={item.role} style={styles.managerItem}>
//                                 <View style={styles.managerIcon}>
//                                     <Icon size={19} color={COLORS.primary} />
//                                 </View>
//                                 <View style={{ flex: 1 }}>
//                                     <View style={styles.managerTitleRow}>
//                                         <Text style={styles.managerLabel} numberOfLines={1}>
//                                             {item.label}
//                                         </Text>
//                                         <View style={styles.countBadge}>
//                                             <Text style={styles.countText}>{count}</Text>
//                                         </View>
//                                     </View>
//                                     <Text style={styles.managerDescription} numberOfLines={1}>
//                                         {item.description}
//                                     </Text>
//                                 </View>
//                             </View>
//                         );
//                     })}
//                 </View>
//             </View>

//             {/* Charts row */}
//             <View style={[styles.twoColumn, isWide ? styles.twoColumnWide : null]}>
//                 {/* Delivery trend */}
//                 <View style={[styles.card, isWide ? { flex: 1.4 } : null]}>
//                     <SectionHeader
//                         title="Delivery Trend"
//                         subtitle="Completed deliveries by period"
//                     />

//                     <View style={styles.chart}>
//                         <View style={styles.chartGrid}>
//                             {[0, 1, 2, 3].map((line) => (
//                                 <View
//                                     key={line}
//                                     style={[
//                                         styles.chartLine,
//                                         { top: `${line * 33.33}%` },
//                                     ]}
//                                 />
//                             ))}

//                             {data.deliveryTrend.map((item) => {
//                                 const height = (item.total / chartMax) * 100;

//                                 return (
//                                     <View key={item.period} style={styles.barColumn}>
//                                         <Text style={styles.barValue}>{item.total}</Text>
//                                         <View
//                                             style={[
//                                                 styles.bar,
//                                                 { height: `${Math.max(10, height)}%` },
//                                             ]}
//                                         />
//                                         <Text style={styles.barLabel}>{item.period}</Text>
//                                     </View>
//                                 );
//                             })}
//                         </View>
//                     </View>
//                 </View>

//                 {/* Shipment status */}
//                 <View style={[styles.card, isWide ? { flex: 1 } : null]}>
//                     <SectionHeader
//                         title="Shipment Status"
//                         subtitle="Live distribution across shipment stages"
//                     />

//                     <View style={styles.shipmentChartArea}>
//                         <View style={styles.donut}>
//                             <View style={styles.donutInner}>
//                                 <Text style={styles.donutValue}>
//                                     {data.shipmentStatus.reduce(
//                                         (total, item) => total + item.value,
//                                         0
//                                     )}
//                                 </Text>
//                                 <Text style={styles.donutCaption}>TOTAL</Text>
//                             </View>
//                         </View>

//                         <View style={{ flex: 1, gap: 12 }}>
//                             {data.shipmentStatus.map((item) => (
//                                 <View key={item.status} style={styles.legendRow}>
//                                     <View style={styles.legendLeft}>
//                                         <View
//                                             style={[
//                                                 styles.legendDot,
//                                                 {
//                                                     backgroundColor:
//                                                         item.status === "DELIVERED"
//                                                             ? COLORS.green
//                                                             : item.status === "DELAYED"
//                                                                 ? COLORS.rose
//                                                                 : item.status === "IN_TRANSIT"
//                                                                     ? COLORS.primary
//                                                                     : COLORS.amber,
//                                                 },
//                                             ]}
//                                         />
//                                         <Text style={styles.legendText}>
//                                             {item.status.replace("_", " ")}
//                                         </Text>
//                                     </View>
//                                     <Text style={styles.legendValue}>{item.value}</Text>
//                                 </View>
//                             ))}
//                         </View>
//                     </View>
//                 </View>
//             </View>

//             {/* Pending + Activity */}
//             <View style={[styles.twoColumn, isWide ? styles.twoColumnWide : null]}>
//                 <View style={[styles.card, isWide ? { flex: 1 } : null]}>
//                     <SectionHeader
//                         title="Pending Approvals"
//                         subtitle="Drivers and vehicles awaiting review"
//                         action="View all"
//                     />

//                     <View style={{ gap: 8 }}>
//                         {data.approvals.map((item) => {
//                             const Icon = item.approvalType === "Driver" ? Users : Truck;

//                             return (
//                                 <Pressable key={item.id} style={styles.approvalRow}>
//                                     <View style={styles.approvalIcon}>
//                                         <Icon size={17} color={COLORS.primary} />
//                                     </View>

//                                     <View style={{ flex: 1 }}>
//                                         <Text style={styles.approvalName} numberOfLines={1}>
//                                             {item.name}
//                                         </Text>
//                                         <Text style={styles.approvalType}>
//                                             {item.approvalType}
//                                         </Text>
//                                     </View>

//                                     <View style={styles.pendingBadge}>
//                                         <Text style={styles.pendingText}>Pending</Text>
//                                     </View>
//                                 </Pressable>
//                             );
//                         })}
//                     </View>
//                 </View>

//                 <View style={[styles.card, isWide ? { flex: 1.4 } : null]}>
//                     <SectionHeader
//                         title="Recent Activity"
//                         subtitle="Latest organization audit events"
//                     />

//                     <View>
//                         {data.activities.map((item, index) => (
//                             <View
//                                 key={item.id}
//                                 style={[
//                                     styles.activityRow,
//                                     index === data.activities.length - 1
//                                         ? { borderBottomWidth: 0 }
//                                         : null,
//                                 ]}
//                             >
//                                 <View style={styles.activityDot} />
//                                 <View style={{ flex: 1 }}>
//                                     <Text style={styles.activityTitle} numberOfLines={2}>
//                                         {item.title}
//                                     </Text>
//                                     <Text style={styles.activityMeta}>
//                                         {item.user} · {item.createdAt}
//                                     </Text>
//                                 </View>
//                             </View>
//                         ))}
//                     </View>
//                 </View>
//             </View>

//             {/* Quick actions + operations */}
//             <View style={[styles.twoColumn, isWide ? styles.twoColumnWide : null]}>
//                 <View style={[styles.card, isWide ? { flex: 1.4 } : null]}>
//                     <SectionHeader
//                         title="Quick Actions"
//                         subtitle="Open frequently used administration tools"
//                     />

//                     <View style={styles.quickGrid}>
//                         {quickActions.map((item) => {
//                             const Icon = item.icon;

//                             return (
//                                 <Pressable key={item.label} style={styles.quickAction}>
//                                     <View style={styles.quickIcon}>
//                                         <Icon size={18} color={COLORS.muted} />
//                                     </View>
//                                     <Text style={styles.quickLabel} numberOfLines={1}>
//                                         {item.label}
//                                     </Text>
//                                     <ArrowRight size={15} color="#94A3B8" />
//                                 </Pressable>
//                             );
//                         })}
//                     </View>
//                 </View>

//                 <View style={[styles.card, isWide ? { flex: 1 } : null]}>
//                     <SectionHeader
//                         title="Operations Status"
//                         subtitle="Calculated from live operational counts"
//                     />

//                     <View style={styles.operationsHeader}>
//                         <Gauge size={21} color={COLORS.primary} />
//                     </View>

//                     <View style={{ gap: 18 }}>
//                         {operations.map((item) => (
//                             <ProgressRow
//                                 key={item.label}
//                                 label={item.label}
//                                 value={item.value}
//                             />
//                         ))}
//                     </View>
//                 </View>
//             </View>

//             <View style={{ height: 24 }} />
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     screen: {
//         flex: 1,
//         backgroundColor: COLORS.background,
//     },
//     content: {
//         paddingTop: 16,
//         paddingBottom: 30,
//         gap: 16,
//     },

//     heroRow: {
//         gap: 16,
//     },
//     heroRowWide: {
//         flexDirection: "row",
//     },
//     heroCard: {
//         flex: 1.7,
//         minHeight: 210,
//         overflow: "hidden",
//         borderRadius: 24,
//         backgroundColor: COLORS.primaryDark,
//         padding: 24,
//         position: "relative",
//     },
//     heroCircle: {
//         position: "absolute",
//         right: -55,
//         top: -70,
//         width: 190,
//         height: 190,
//         borderRadius: 100,
//         borderWidth: 28,
//         borderColor: "rgba(255,255,255,0.08)",
//     },
//     heroContent: {
//         zIndex: 2,
//     },
//     heroGreeting: {
//         color: "#BCEDEF",
//         fontSize: 14,
//         fontWeight: "700",
//     },
//     heroName: {
//         marginTop: 3,
//         color: "#FFFFFF",
//         fontSize: 32,
//         fontWeight: "800",
//         letterSpacing: -0.5,
//     },
//     heroDescription: {
//         marginTop: 14,
//         maxWidth: 600,
//         color: "#D6F4F5",
//         fontSize: 14,
//         lineHeight: 21,
//     },
//     onlinePill: {
//         alignSelf: "flex-start",
//         marginTop: 20,
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 7,
//         paddingHorizontal: 12,
//         paddingVertical: 8,
//         borderRadius: 999,
//         backgroundColor: "rgba(255,255,255,0.12)",
//         borderWidth: 1,
//         borderColor: "rgba(255,255,255,0.18)",
//     },
//     onlineText: {
//         color: "#FFFFFF",
//         fontSize: 12,
//         fontWeight: "700",
//     },

//     dateCard: {
//         flex: 0.8,
//         minHeight: 210,
//         borderRadius: 24,
//         backgroundColor: COLORS.card,
//         borderWidth: 1,
//         borderColor: "#DDF0F1",
//         padding: 20,
//         justifyContent: "space-between",
//     },
//     dateTop: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "flex-start",
//     },
//     dateIcon: {
//         width: 44,
//         height: 44,
//         borderRadius: 14,
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: COLORS.primaryLight,
//     },
//     livePill: {
//         borderRadius: 999,
//         backgroundColor: "#ECFDF5",
//         paddingHorizontal: 10,
//         paddingVertical: 6,
//     },
//     liveText: {
//         color: "#15803D",
//         fontSize: 11,
//         fontWeight: "800",
//     },
//     dateText: {
//         marginTop: 12,
//         color: COLORS.text,
//         fontSize: 23,
//         fontWeight: "800",
//     },
//     weekday: {
//         marginTop: 3,
//         color: COLORS.muted,
//         fontSize: 13,
//     },
//     timeRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 8,
//         borderTopWidth: 1,
//         borderTopColor: COLORS.border,
//         paddingTop: 14,
//     },
//     timeText: {
//         color: "#334155",
//         fontSize: 14,
//         fontWeight: "700",
//     },

//     card: {
//         borderRadius: 18,
//         backgroundColor: COLORS.card,
//         borderWidth: 1,
//         borderColor: COLORS.border,
//         padding: 18,
//     },

//     licenseTop: {
//         gap: 18,
//     },
//     licenseLabelRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 9,
//         flexWrap: "wrap",
//     },
//     licenseBadge: {
//         color: COLORS.primaryDark,
//         backgroundColor: "#DDF5F6",
//         paddingHorizontal: 9,
//         paddingVertical: 5,
//         borderRadius: 999,
//         fontSize: 10,
//         fontWeight: "900",
//         letterSpacing: 1.2,
//     },
//     smallMuted: {
//         color: COLORS.muted,
//         fontSize: 11,
//         fontWeight: "600",
//     },
//     licenseTitle: {
//         marginTop: 10,
//         color: COLORS.text,
//         fontSize: 21,
//         fontWeight: "800",
//     },
//     licenseTitleMuted: {
//         color: COLORS.muted,
//         fontSize: 13,
//         fontWeight: "400",
//     },
//     licenseDescription: {
//         marginTop: 5,
//         color: COLORS.muted,
//         fontSize: 12,
//         lineHeight: 18,
//         maxWidth: 720,
//     },
//     licenseStats: {
//         flexDirection: "row",
//         flexWrap: "wrap",
//         alignItems: "center",
//         gap: 10,
//     },
//     licenseStat: {
//         minWidth: 76,
//         paddingHorizontal: 12,
//         paddingVertical: 9,
//         alignItems: "center",
//         borderRadius: 12,
//         borderWidth: 1,
//         borderColor: COLORS.border,
//         backgroundColor: "#F8FAFC",
//     },
//     remainingStat: {
//         borderColor: "#BBF7D0",
//         backgroundColor: "#F0FDF4",
//     },
//     statCaption: {
//         color: COLORS.muted,
//         fontSize: 9,
//         fontWeight: "800",
//         letterSpacing: 0.8,
//     },
//     statValue: {
//         marginTop: 3,
//         color: COLORS.text,
//         fontSize: 17,
//         fontWeight: "800",
//     },
//     primaryButton: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 6,
//         borderRadius: 12,
//         backgroundColor: COLORS.primary,
//         paddingHorizontal: 14,
//         paddingVertical: 11,
//     },
//     primaryButtonText: {
//         color: "#FFFFFF",
//         fontSize: 12,
//         fontWeight: "800",
//     },
//     licenseProgressHeader: {
//         marginTop: 18,
//         marginBottom: 6,
//         flexDirection: "row",
//         justifyContent: "space-between",
//     },

//     progressBlock: {
//         gap: 7,
//     },
//     progressHeader: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//     },
//     progressLabel: {
//         color: "#475569",
//         fontSize: 11,
//         fontWeight: "700",
//     },
//     progressValue: {
//         color: COLORS.text,
//         fontSize: 11,
//         fontWeight: "800",
//     },
//     progressTrack: {
//         height: 9,
//         overflow: "hidden",
//         borderRadius: 99,
//         backgroundColor: "#EEF2F7",
//     },
//     progressFill: {
//         height: "100%",
//         borderRadius: 99,
//         backgroundColor: COLORS.primary,
//     },

//     kpiGrid: {
//         flexDirection: "row",
//         flexWrap: "wrap",
//         marginHorizontal: -4,
//     },
//     kpiGridTablet: {
//         marginHorizontal: -5,
//     },
//     kpiWrapper: {
//         padding: 4,
//     },
//     kpiCard: {
//         minHeight: 150,
//         borderRadius: 16,
//         backgroundColor: COLORS.card,
//         borderWidth: 1,
//         borderColor: COLORS.border,
//         padding: 15,
//     },
//     kpiTop: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//     },
//     iconBox: {
//         width: 40,
//         height: 40,
//         borderRadius: 12,
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: COLORS.primaryLight,
//     },
//     kpiValue: {
//         marginTop: 14,
//         color: COLORS.text,
//         fontSize: 23,
//         fontWeight: "800",
//     },
//     kpiLabel: {
//         marginTop: 2,
//         color: "#334155",
//         fontSize: 13,
//         fontWeight: "700",
//     },
//     kpiHelper: {
//         marginTop: 3,
//         color: COLORS.muted,
//         fontSize: 10,
//         lineHeight: 14,
//     },

//     sectionHeader: {
//         flexDirection: "row",
//         alignItems: "flex-start",
//         justifyContent: "space-between",
//         gap: 10,
//         marginBottom: 15,
//     },
//     sectionTitle: {
//         color: COLORS.text,
//         fontSize: 15,
//         fontWeight: "800",
//     },
//     sectionSubtitle: {
//         marginTop: 3,
//         color: COLORS.muted,
//         fontSize: 11,
//         lineHeight: 16,
//     },
//     actionText: {
//         color: COLORS.primary,
//         fontSize: 11,
//         fontWeight: "800",
//     },

//     managerGrid: {
//         flexDirection: "row",
//         flexWrap: "wrap",
//         marginHorizontal: -5,
//     },
//     managerItem: {
//         width: "50%",
//         padding: 5,
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 10,
//     },
//     managerIcon: {
//         width: 40,
//         height: 40,
//         borderRadius: 12,
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "#E8F7F8",
//     },
//     managerTitleRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 6,
//     },
//     managerLabel: {
//         flex: 1,
//         color: COLORS.text,
//         fontSize: 11,
//         fontWeight: "800",
//     },
//     managerDescription: {
//         marginTop: 2,
//         color: COLORS.muted,
//         fontSize: 10,
//     },
//     countBadge: {
//         minWidth: 24,
//         alignItems: "center",
//         borderRadius: 999,
//         paddingHorizontal: 7,
//         paddingVertical: 3,
//         backgroundColor: "#DDF5F6",
//     },
//     countText: {
//         color: COLORS.primaryDark,
//         fontSize: 10,
//         fontWeight: "800",
//     },

//     twoColumn: {
//         gap: 16,
//     },
//     twoColumnWide: {
//         flexDirection: "row",
//         alignItems: "stretch",
//     },

//     chart: {
//         height: 250,
//         paddingTop: 8,
//     },
//     chartGrid: {
//         flex: 1,
//         flexDirection: "row",
//         alignItems: "flex-end",
//         justifyContent: "space-around",
//         position: "relative",
//         paddingHorizontal: 8,
//     },
//     chartLine: {
//         position: "absolute",
//         left: 0,
//         right: 0,
//         height: 1,
//         backgroundColor: "#EEF2F7",
//     },
//     barColumn: {
//         height: "100%",
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "flex-end",
//         paddingHorizontal: 5,
//         zIndex: 2,
//     },
//     barValue: {
//         marginBottom: 5,
//         color: COLORS.muted,
//         fontSize: 9,
//         fontWeight: "700",
//     },
//     bar: {
//         width: "58%",
//         minWidth: 12,
//         maxWidth: 28,
//         borderRadius: 8,
//         backgroundColor: COLORS.primary,
//     },
//     barLabel: {
//         marginTop: 8,
//         color: COLORS.muted,
//         fontSize: 10,
//         fontWeight: "600",
//     },

//     shipmentChartArea: {
//         minHeight: 235,
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 18,
//     },
//     donut: {
//         width: 145,
//         height: 145,
//         borderRadius: 100,
//         borderWidth: 22,
//         borderColor: COLORS.primary,
//         borderRightColor: COLORS.green,
//         borderBottomColor: COLORS.amber,
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     donutInner: {
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     donutValue: {
//         color: COLORS.text,
//         fontSize: 23,
//         fontWeight: "800",
//     },
//     donutCaption: {
//         marginTop: 1,
//         color: COLORS.muted,
//         fontSize: 9,
//         fontWeight: "800",
//         letterSpacing: 0.8,
//     },
//     legendRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "space-between",
//         gap: 8,
//     },
//     legendLeft: {
//         flex: 1,
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 7,
//     },
//     legendDot: {
//         width: 9,
//         height: 9,
//         borderRadius: 99,
//     },
//     legendText: {
//         color: "#475569",
//         fontSize: 10,
//         fontWeight: "600",
//     },
//     legendValue: {
//         color: COLORS.text,
//         fontSize: 11,
//         fontWeight: "800",
//     },

//     approvalRow: {
//         minHeight: 58,
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 10,
//         padding: 10,
//         borderRadius: 12,
//         borderWidth: 1,
//         borderColor: "#F1F5F9",
//     },
//     approvalIcon: {
//         width: 36,
//         height: 36,
//         borderRadius: 10,
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: COLORS.primaryLight,
//     },
//     approvalName: {
//         color: "#334155",
//         fontSize: 12,
//         fontWeight: "800",
//     },
//     approvalType: {
//         marginTop: 2,
//         color: COLORS.muted,
//         fontSize: 10,
//     },
//     pendingBadge: {
//         borderRadius: 999,
//         backgroundColor: "#FFF7ED",
//         paddingHorizontal: 9,
//         paddingVertical: 5,
//     },
//     pendingText: {
//         color: COLORS.amber,
//         fontSize: 9,
//         fontWeight: "800",
//     },

//     activityRow: {
//         flexDirection: "row",
//         alignItems: "flex-start",
//         gap: 10,
//         paddingVertical: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: "#F1F5F9",
//     },
//     activityDot: {
//         width: 9,
//         height: 9,
//         marginTop: 4,
//         borderRadius: 99,
//         backgroundColor: COLORS.primary,
//     },
//     activityTitle: {
//         color: "#334155",
//         fontSize: 11,
//         fontWeight: "700",
//         lineHeight: 16,
//     },
//     activityMeta: {
//         marginTop: 2,
//         color: COLORS.muted,
//         fontSize: 9,
//     },

//     quickGrid: {
//         flexDirection: "row",
//         flexWrap: "wrap",
//         marginHorizontal: -4,
//     },
//     quickAction: {
//         width: "50%",
//         minHeight: 58,
//         padding: 4,
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 8,
//     },
//     quickIcon: {
//         width: 36,
//         height: 36,
//         borderRadius: 10,
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "#F8FAFC",
//         borderWidth: 1,
//         borderColor: COLORS.border,
//     },
//     quickLabel: {
//         flex: 1,
//         color: "#334155",
//         fontSize: 11,
//         fontWeight: "700",
//     },
//     operationsHeader: {
//         position: "absolute",
//         right: 18,
//         top: 20,
//     },
// });

import React, { useEffect, useMemo, useRef } from "react";
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Svg, {
    Circle,
    Defs,
    LinearGradient,
    Path,
    Stop,
} from "react-native-svg";
import {
    Activity,
    AlertTriangle,
    Briefcase,
    Building2,
    CheckCircle2,
    GitBranch,
    IndianRupee,
    Layers,
    ShoppingCart,
    Shield,
    Sparkles,
    TrendingUp,
    UserCheck,
    Users,
} from "lucide-react-native";
import dayjs from "dayjs";
import SectionCard from "@/components/DashboardComponents";

const COLORS = [
    "#10B981",
    "#3B82F6",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
];

const SCREEN_WIDTH = Dimensions.get("window").width;

interface RevenueItem {
    month: string;
    revenue: number;
}

interface ActivityItem {
    title: string;
    description: string;
    time: string;
    completed: boolean;
}

interface Target {
    metric?: string;
    targetValue?: number;
    achievedValue?: number;
}

interface Dashboard {
    organizationOverview?: {
        organizations?: number;
        branches?: number;
        departments?: number;
        teams?: number;
        users?: number;
    };

    cards?: {
        totalOrganizations?: number;
        totalBranches?: number;
        totalUsers?: number;
        totalCustomers?: number;
        totalSalesOrders?: number;
        totalRevenue?: number;
        todaysRevenue?: number;
        completedVisits?: number;
        pendingVisits?: number;
        todayVisits?: number;
        totalVisits?: number;
        presentEmployees?: number;
        absentEmployees?: number;
        leaveRequests?: number;
    };

    visitSummary?: {
        COMPLETED?: number;
        PENDING?: number;
    };

    targets?: Target[];

    attendanceToday?: {
        PRESENT?: number;
        ABSENT?: number;
        LEAVE?: number;
    };

    orders?: {
        APPROVED?: {
            count?: number;
            revenue?: number;
        };
        PENDING?: {
            count?: number;
        };
        CANCELLED?: {
            count?: number;
        };
    };

    monthlyRevenue?: RevenueItem[];

    organizationInfo?: {
        name?: string;
    };

    recentOrganizations?: {
        name?: string;
    }[];

    recentOrders?: {
        id?: string;
        orderNumber?: string;
        customer?: {
            name?: string;
        };
        status?: string;
        totalAmount?: number;
        createdAt?: string;
    }[];

    licenseQuota?: {
        maxLicenses?: number;
        consumedLicenses?: number;
        availableLicenses?: number;
        isLimitReached?: boolean;
    };

    license?: {
        maxLicenses?: number;
        consumedLicenses?: number;
        availableLicenses?: number;
        isLimitReached?: boolean;
    };
}

interface PerformanceMetric {
    label: string;
    value: number;
    suffix: string;
}

/**
 * Simple React Native revenue area chart.
 *
 * This replaces Recharts' ResponsiveContainer + AreaChart.
 */
const RevenueChart = ({
    data,
}: {
    data: RevenueItem[];
}) => {
    const chartWidth = Math.max(SCREEN_WIDTH - 48, 300);
    const chartHeight = 250;

    const values = data.map((item) => Number(item.revenue) || 0);

    const maxValue = Math.max(...values, 1);

    const points = data.map((item, index) => {
        const x =
            data.length > 1
                ? (index / (data.length - 1)) * (chartWidth - 30) + 15
                : chartWidth / 2;

        const y =
            chartHeight -
            30 -
            ((Number(item.revenue) || 0) / maxValue) *
            (chartHeight - 70);

        return {
            x,
            y,
            value: Number(item.revenue) || 0,
        };
    });

    const linePath = points
        .map((point, index) => {
            return `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`;
        })
        .join(" ");

    const areaPath = `
    ${linePath}
    L ${chartWidth - 15} ${chartHeight - 30}
    L 15 ${chartHeight - 30}
    Z
  `;

    return (
        <View style={styles.chartWrapper}>
            <Svg
                width={chartWidth}
                height={chartHeight}
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            >
                <Defs>
                    <LinearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <Stop
                            offset="0"
                            stopColor="#3B82F6"
                            stopOpacity="0.40"
                        />
                        <Stop
                            offset="1"
                            stopColor="#3B82F6"
                            stopOpacity="0"
                        />
                    </LinearGradient>
                </Defs>

                {/* Horizontal grid lines */}
                {[0, 1, 2, 3, 4].map((index) => {
                    const y =
                        25 +
                        index * ((chartHeight - 55) / 4);

                    return (
                        <Path
                            key={index}
                            d={`M 15 ${y} L ${chartWidth - 15} ${y}`}
                            stroke="#E2E8F0"
                            strokeWidth={1}
                        />
                    );
                })}

                {/* Area */}
                <Path
                    d={areaPath}
                    fill="url(#revenueGradient)"
                />

                {/* Revenue line */}
                <Path
                    d={linePath}
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth={3}
                />

                {/* Data points */}
                {points.map((point, index) => (
                    <Circle
                        key={index}
                        cx={point.x}
                        cy={point.y}
                        r={4}
                        fill="#FFFFFF"
                        stroke="#2563EB"
                        strokeWidth={2}
                    />
                ))}
            </Svg>

            {/* X axis labels */}
            <View style={styles.chartLabels}>
                {data.map((item, index) => (
                    <Text
                        key={`${item.month}-${index}`}
                        style={styles.chartLabel}
                    >
                        {item.month}
                    </Text>
                ))}
            </View>

            {/* Current revenue */}
            <View style={styles.chartSummary}>
                <Text style={styles.chartSummaryLabel}>
                    Current Revenue
                </Text>

                <Text style={styles.chartSummaryValue}>
                    ₹
                    {Number(
                        data[dayjs().month()]?.revenue || 0
                    ).toLocaleString("en-IN")}
                </Text>
            </View>
        </View>
    );
};

const OrganizationOverviewCard = ({
    orgOverview,
}: {
    orgOverview: Dashboard["organizationOverview"];
}) => {
    const items = [
        {
            label: "Organizations",
            value: orgOverview?.organizations ?? 0,
            icon: Building2,
            color: "#3B82F6",
            background: "#EFF6FF",
        },
        {
            label: "Branches",
            value: orgOverview?.branches ?? 0,
            icon: GitBranch,
            color: "#0891B2",
            background: "#ECFEFF",
        },
        {
            label: "Departments",
            value: orgOverview?.departments ?? 0,
            icon: Layers,
            color: "#D97706",
            background: "#FFFBEB",
        },
        {
            label: "Teams",
            value: orgOverview?.teams ?? 0,
            icon: Briefcase,
            color: "#059669",
            background: "#ECFDF5",
        },
        {
            label: "Total Users",
            value: orgOverview?.users ?? 0,
            icon: Users,
            color: "#4F46E5",
            background: "#EEF2FF",
        },
    ];

    return (
        <SectionCard
            title="Organization Overview & Hierarchy"
            subtitle="Live organization structure, branches, departments, and user totals"
        // icon={Building2}
        >
            <View style={styles.organizationGrid}>
                {items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <View
                            key={item.label}
                            style={[
                                styles.organizationItem,
                                {
                                    backgroundColor: item.background,
                                    borderColor: `${item.color}40`,
                                },
                            ]}
                        >
                            <View style={styles.organizationHeader}>
                                <Text style={styles.organizationLabel}>
                                    {item.label}
                                </Text>

                                <Icon
                                    size={18}
                                    color={item.color}
                                />
                            </View>

                            <Text style={styles.organizationValue}>
                                {item.value}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </SectionCard>
    );
};

const LicenseQuotaBanner = ({
    licenseQuota,
}: {
    licenseQuota: {
        max: number;
        consumed: number;
        available: number;
        isLimitReached: boolean;
        percentUsed: number;
    };
}) => {
    const danger = licenseQuota.isLimitReached;
    const warning =
        !danger && licenseQuota.available <= 5;

    const backgroundColor = danger
        ? "#FEF2F2"
        : warning
            ? "#FFFBEB"
            : "#F8FAFC";

    const borderColor = danger
        ? "#FECACA"
        : warning
            ? "#FDE68A"
            : "#E2E8F0";

    const iconColor = danger
        ? "#DC2626"
        : warning
            ? "#D97706"
            : "#4F46E5";

    return (
        <View
            style={[
                styles.licenseContainer,
                {
                    backgroundColor,
                    borderColor,
                },
            ]}
        >
            <View style={styles.licenseTop}>
                <View style={styles.licenseInfo}>
                    <View
                        style={[
                            styles.licenseIcon,
                            {
                                backgroundColor: danger
                                    ? "#FEE2E2"
                                    : warning
                                        ? "#FEF3C7"
                                        : "#EEF2FF",
                            },
                        ]}
                    >
                        <Shield
                            size={22}
                            color={iconColor}
                        />
                    </View>

                    <View style={styles.licenseTextContainer}>
                        <View style={styles.licenseTitleRow}>
                            <Text style={styles.licenseTitle}>
                                ORGANIZATION LICENSE QUOTA
                            </Text>

                            <View
                                style={[
                                    styles.seatBadge,
                                    {
                                        backgroundColor: danger
                                            ? "#FECACA"
                                            : warning
                                                ? "#FDE68A"
                                                : "#D1FAE5",
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.seatBadgeText,
                                        {
                                            color: danger
                                                ? "#991B1B"
                                                : warning
                                                    ? "#92400E"
                                                    : "#065F46",
                                        },
                                    ]}
                                >
                                    {danger
                                        ? "Limit Reached"
                                        : `${licenseQuota.available} Seats Available`}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.licenseConsumed}>
                            {licenseQuota.consumed} of{" "}
                            {licenseQuota.max} License Consumed
                        </Text>

                        <Text style={styles.licenseHint}>
                            1 user = 1 license
                        </Text>
                    </View>
                </View>

                {danger ? (
                    <View style={styles.warningMessage}>
                        <AlertTriangle
                            size={14}
                            color="#B91C1C"
                        />

                        <Text style={styles.warningMessageText}>
                            All licenses consumed. Contact your
                            Franchise Administrator to upgrade.
                        </Text>
                    </View>
                ) : (
                    <Text style={styles.licenseDescription}>
                        Every created role counts as 1 license.
                    </Text>
                )}
            </View>

            <View style={styles.progressBackground}>
                <View
                    style={[
                        styles.progressFill,
                        {
                            width: `${licenseQuota.percentUsed}%`,
                            backgroundColor: danger
                                ? "#EF4444"
                                : warning
                                    ? "#F59E0B"
                                    : "#4F46E5",
                        },
                    ]}
                />
            </View>
        </View>
    );
};

export default function SuperAdminDashboard() {
    const user = {
            "id": "d47407f0-4cf5-4fac-9295-351bf69689dc",
            "organizationId": "99fd17c1-bdf4-4d50-88f4-b89d97afe905",
            "branchId": null,
            "departmentId": null,
            "teamId": null,
            "territoryId": null,
            "managerId": null,
            "email": "devendradangi9174@gmail.com",
            "firstName": "Devendra",
            "lastName": "Dangi",
            "phoneNumber": "9876543210",
            "avatarUrl": null,
            "isActive": true,
            "roles": [
                {
                    "userId": "d47407f0-4cf5-4fac-9295-351bf69689dc",
                    "roleId": "be2c9a26-3040-4a15-8cea-139d71d4f328",
                    "assignedAt": "2026-08-24T07:21:46.367Z",
                    "role": {
                        "id": "be2c9a26-3040-4a15-8cea-139d71d4f328",
                        "organizationId": "99fd17c1-bdf4-4d50-88f4-b89d97afe905",
                        "name": "Organization Super Admin",
                        "description": "Full system access and global configuration",
                        "isSystem": true,
                        "level": null,
                        "parentRoleId": null,
                        "createdAt": "2026-08-05T09:08:30.124Z",
                        "updatedAt": "2026-08-05T09:08:30.124Z",
                        "permissions": []
                    }
                }
            ],
            "branch": null,
            "department": null,
            "organization": {
                "id": "99fd17c1-bdf4-4d50-88f4-b89d97afe905",
                "name": "IT SoftLab Pvt ltd",
                "slug": "it-softlab-pvt-ltd"
            },
            "emailVerifiedAt": "2026-08-05T09:08:31.076Z",
            "createdAt": "2026-08-05T07:40:49.756Z",
            "updatedAt": "2026-09-10T05:44:47.463Z"
        }

    const loading = false;
    const error = false;
    const refresh = false;
    const dashboard = {
        "success": true,
        "message": "Super Admin dashboard data retrieved.",
        "timestamp": "2026-09-14T10:47:57.221Z",
        "data": {
            "organizationOverview": {
                "organizations": 1,
                "companies": 0,
                "branches": 9,
                "departments": 8,
                "teams": 8,
                "users": 29
            },
            "cards": {
                "totalOrganizations": 1,
                "totalCompanies": 0,
                "totalBranches": 9,
                "totalDepartments": 8,
                "totalTeams": 8,
                "totalUsers": 29,
                "totalCustomers": 9,
                "totalSalesOrders": 30,
                "totalVisits": 0,
                "todayVisits": 0,
                "pendingVisits": 0,
                "completedVisits": 0,
                "presentEmployees": 0,
                "absentEmployees": 0,
                "leaveRequests": 0,
                "totalRevenue": 638660,
                "todaysRevenue": 0
            },
            "orders": {
                "DRAFT": {
                    "count": 24,
                    "revenue": 538600
                },
                "COMPLETED": {
                    "count": 6,
                    "revenue": 100060
                }
            },
            "monthlyRevenue": [
                {
                    "month": "Jan",
                    "revenue": 0
                },
                {
                    "month": "Feb",
                    "revenue": 0
                },
                {
                    "month": "Mar",
                    "revenue": 0
                },
                {
                    "month": "Apr",
                    "revenue": 0
                },
                {
                    "month": "May",
                    "revenue": 0
                },
                {
                    "month": "Jun",
                    "revenue": 0
                },
                {
                    "month": "Jul",
                    "revenue": 0
                },
                {
                    "month": "Aug",
                    "revenue": 497140
                },
                {
                    "month": "Sep",
                    "revenue": 141520
                },
                {
                    "month": "Oct",
                    "revenue": 0
                },
                {
                    "month": "Nov",
                    "revenue": 0
                },
                {
                    "month": "Dec",
                    "revenue": 0
                }
            ],
            "visitSummary": {},
            "attendanceToday": {},
            "recentOrganizations": [
                {
                    "id": "99fd17c1-bdf4-4d50-88f4-b89d97afe905",
                    "name": "IT SoftLab Pvt ltd",
                    "slug": "it-softlab-pvt-ltd",
                    "createdAt": "2026-08-05T08:43:35.798Z"
                }
            ],
            "recentCompanies": [],
            "recentUsers": [
                {
                    "id": "089c5de3-1056-47c1-9945-d875a0a572d8",
                    "firstName": "shreyansh",
                    "lastName": "verma",
                    "email": "shreyansh123@gmail.com",
                    "createdAt": "2026-09-02T05:19:10.919Z"
                },
                {
                    "id": "bb7a119d-0473-4b4e-934e-a598e5c2434a",
                    "firstName": "Rama",
                    "lastName": "Singh",
                    "email": "ramsingh123@gmail.com",
                    "createdAt": "2026-08-27T09:00:49.380Z"
                },
                {
                    "id": "5a056485-4d5a-452b-8f1d-ab835652f6e9",
                    "firstName": "aashu",
                    "lastName": "ji",
                    "email": "aashu123@gmail.com",
                    "createdAt": "2026-08-27T08:29:48.884Z"
                },
                {
                    "id": "1512bcde-80f7-4df9-a8b8-4fcc84c03ae6",
                    "firstName": "gautam",
                    "lastName": "rajput",
                    "email": "gautamji@gmail.com",
                    "createdAt": "2026-08-27T07:24:34.641Z"
                },
                {
                    "id": "2517d9ad-20a2-47ab-ac08-0dfb5132ff57",
                    "firstName": "jaydeep",
                    "lastName": "seth",
                    "email": "jaydeep321@gmail.cpm",
                    "createdAt": "2026-08-27T07:14:07.044Z"
                }
            ],
            "recentOrders": [
                {
                    "id": "53e8068a-e861-4a08-967b-2f3255c3454c",
                    "orderNumber": "ORD-CRM-408026-5",
                    "status": "DRAFT",
                    "totalAmount": 8520,
                    "createdAt": "2026-09-08T09:23:28.027Z",
                    "customer": {
                        "name": "Customer G"
                    }
                },
                {
                    "id": "fb070ba2-8227-4690-8076-fda9b96fd3cd",
                    "orderNumber": "ORD-CRM-408007-4",
                    "status": "DRAFT",
                    "totalAmount": 2500,
                    "createdAt": "2026-09-08T09:23:28.010Z",
                    "customer": {
                        "name": "Customer F"
                    }
                },
                {
                    "id": "f12d38d5-89c5-47a3-a9c0-8a17e090ffc9",
                    "orderNumber": "ORD-CRM-407936-3",
                    "status": "DRAFT",
                    "totalAmount": 36000,
                    "createdAt": "2026-09-08T09:23:27.937Z",
                    "customer": {
                        "name": "Customer E"
                    }
                },
                {
                    "id": "546ba4e8-c4d4-40b7-a761-ecf496ee973f",
                    "orderNumber": "ORD-CRM-407922-2",
                    "status": "DRAFT",
                    "totalAmount": 22500,
                    "createdAt": "2026-09-08T09:23:27.923Z",
                    "customer": {
                        "name": "Customer B"
                    }
                },
                {
                    "id": "f6b2bb6c-b188-432e-9026-32abf88c1b87",
                    "orderNumber": "ORD-CRM-407807-1",
                    "status": "DRAFT",
                    "totalAmount": 36000,
                    "createdAt": "2026-09-08T09:23:27.902Z",
                    "customer": {
                        "name": "Customer A"
                    }
                },
                {
                    "id": "e164367a-b1cb-446b-9d65-b6f0b56783c9",
                    "orderNumber": "ORD-CRM-666008-1",
                    "status": "DRAFT",
                    "totalAmount": 36000,
                    "createdAt": "2026-09-03T09:44:26.049Z",
                    "customer": {
                        "name": "mangilal palasia"
                    }
                },
                {
                    "id": "1ba41adc-6305-4f91-9f8a-8fab3a2700e3",
                    "orderNumber": "ORD-CRM-014265-1",
                    "status": "COMPLETED",
                    "totalAmount": 36000,
                    "createdAt": "2026-08-27T08:06:54.266Z",
                    "customer": {
                        "name": "Customer A"
                    }
                },
                {
                    "id": "b97f7c32-cf97-452c-9a8e-c4a3f6031522",
                    "orderNumber": "ORD-CRM-973790-1",
                    "status": "DRAFT",
                    "totalAmount": 36000,
                    "createdAt": "2026-08-27T08:06:13.968Z",
                    "customer": {
                        "name": "Customer A"
                    }
                }
            ],
            "licenseQuota": {
                "maxLicenses": 100,
                "consumedLicenses": 29,
                "availableLicenses": 71,
                "isLimitReached": false
            },
            "license": {
                "maxLicenses": 100,
                "consumedLicenses": 29,
                "availableLicenses": 71,
                "isLimitReached": false
            }
        }
    }

    const fadeAnim = useRef(
        new Animated.Value(0)
    ).current;

    const translateY = useRef(
        new Animated.Value(10)
    ).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, translateY]);

    const fullName = useMemo(() => {
        if (!user) return "";

        return `${user.firstName ?? ""} ${user.lastName ?? ""
            }`.trim();
    }, [user]);

    const typedDashboard =
        dashboard as Dashboard | undefined;

    const organizationName = useMemo(() => {
        return (
            user?.organization?.name ||
            user?.organization.name ||
            typedDashboard?.organizationInfo?.name ||
            typedDashboard?.recentOrganizations?.[0]?.name ||
            "Acme Corporation"
        );
    }, [user, typedDashboard]);

    const orgOverview =
        typedDashboard?.organizationOverview || {};

    const cards = typedDashboard?.cards || {};

    const visitSummary =
        typedDashboard?.visitSummary || {};

    const targets = Array.isArray(
        typedDashboard?.targets
    )
        ? typedDashboard.targets
        : [];

    const attendanceToday =
        typedDashboard?.attendanceToday || {};

    const orders = typedDashboard?.orders || {};

    const totalOrganizations =
        cards.totalOrganizations ??
        orgOverview.organizations ??
        0;

    const totalBranches =
        cards.totalBranches ??
        orgOverview.branches ??
        0;

    const totalUsers =
        cards.totalUsers ??
        orgOverview.users ??
        0;

    const totalCustomers =
        cards.totalCustomers ?? 0;

    const totalSalesOrders =
        cards.totalSalesOrders ?? 0;

    const revenue =
        cards.totalRevenue ??
        orders.APPROVED?.revenue ??
        0;

    const todaysRevenue =
        cards.todaysRevenue ?? 0;

    const completedVisits =
        cards.completedVisits ??
        visitSummary.COMPLETED ??
        0;

    const pendingVisits =
        cards.pendingVisits ??
        visitSummary.PENDING ??
        0;

    const todayVisits =
        cards.todayVisits ?? 0;

    const totalVisits =
        cards.totalVisits ??
        completedVisits +
        pendingVisits +
        todayVisits;

    const presentCount =
        cards.presentEmployees ??
        attendanceToday.PRESENT ??
        0;

    const absentCount =
        cards.absentEmployees ??
        attendanceToday.ABSENT ??
        0;

    const leaveCount =
        cards.leaveRequests ??
        attendanceToday.LEAVE ??
        0;

    const approvedOrders =
        orders.APPROVED?.count || 0;

    const pendingOrders =
        orders.PENDING?.count || 0;

    const cancelledOrders =
        orders.CANCELLED?.count || 0;

    const totalOrdersCount =
        totalSalesOrders ||
        approvedOrders +
        pendingOrders +
        cancelledOrders;

    /**
     * Revenue data
     */
    const revenueData = useMemo<RevenueItem[]>(() => {
        const allMonths = [
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

        const monthlyRevenue =
            typedDashboard?.monthlyRevenue;

        if (
            Array.isArray(monthlyRevenue) &&
            monthlyRevenue.length === 12
        ) {
            return monthlyRevenue;
        }

        if (
            Array.isArray(monthlyRevenue) &&
            monthlyRevenue.length > 0
        ) {
            const map: Record<string, number> = {};

            monthlyRevenue.forEach((item) => {
                if (item.month) {
                    map[item.month] =
                        Number(item.revenue) || 0;
                }
            });

            return allMonths.map((month) => ({
                month,
                revenue: map[month] ?? 0,
            }));
        }

        const currentMonth =
            dayjs().month();

        return allMonths.map(
            (month, index) => ({
                month,
                revenue:
                    index === currentMonth
                        ? Number(revenue) || 0
                        : 0,
            })
        );
    }, [
        typedDashboard?.monthlyRevenue,
        revenue,
    ]);

    /**
     * Revenue growth
     */
    const revenueGrowthInfo = useMemo(() => {
        if (revenueData.length < 2) {
            return {
                text: "+18.4% YoY Growth",
                isPositive: true,
            };
        }

        const currentMonth =
            dayjs().month();

        const current =
            revenueData[currentMonth]?.revenue || 0;

        const previous =
            currentMonth > 0
                ? revenueData[currentMonth - 1]
                    ?.revenue || 0
                : 0;

        if (
            previous === 0 &&
            current > 0
        ) {
            return {
                text: "+100% MoM Growth",
                isPositive: true,
            };
        }

        if (
            previous === 0 &&
            current === 0
        ) {
            const nonZero =
                revenueData.filter(
                    (item) => item.revenue > 0
                );

            if (nonZero.length > 0) {
                return {
                    text: "Enterprise Active",
                    isPositive: true,
                };
            }

            return {
                text: "Active Tracking",
                isPositive: true,
            };
        }

        const difference =
            ((current - previous) /
                previous) *
            100;

        const isPositive =
            difference >= 0;

        return {
            text: `${isPositive ? "+" : ""
                }${difference.toFixed(
                    1
                )}% MoM Growth`,
            isPositive,
        };
    }, [revenueData]);

    /**
     * Order data
     */
    const orderData = useMemo(() => {
        return [
            {
                name: "Approved",
                value:
                    totalOrdersCount > 0
                        ? Math.round(
                            (approvedOrders /
                                totalOrdersCount) *
                            100
                        )
                        : 70,
            },
            {
                name: "Pending",
                value:
                    totalOrdersCount > 0
                        ? Math.round(
                            (pendingOrders /
                                totalOrdersCount) *
                            100
                        )
                        : 20,
            },
            {
                name: "Cancelled",
                value:
                    totalOrdersCount > 0
                        ? Math.round(
                            (cancelledOrders /
                                totalOrdersCount) *
                            100
                        )
                        : 10,
            },
        ].filter((item) => item.value > 0);
    }, [
        totalOrdersCount,
        approvedOrders,
        pendingOrders,
        cancelledOrders,
    ]);

    /**
     * Performance metrics
     */
    const performanceMetrics =
        useMemo<PerformanceMetric[]>(() => {
            const list = targets
                .slice(0, 3)
                .map((target) => ({
                    label:
                        target.metric || "Target",
                    value:
                        (target.targetValue || 0) > 0
                            ? Math.round(
                                ((target.achievedValue ||
                                    0) /
                                    (target.targetValue ||
                                        1)) *
                                100
                            )
                            : 0,
                    suffix: "%",
                }));

            if (list.length < 3) {
                const defaultMetrics = [
                    {
                        label:
                            "Visit Completion Rate",
                        value:
                            totalVisits > 0
                                ? Math.round(
                                    (completedVisits /
                                        totalVisits) *
                                    100
                                )
                                : 100,
                        suffix: "%",
                    },
                    {
                        label:
                            "Sales Target Achievement",
                        value:
                            totalSalesOrders > 0
                                ? 100
                                : 85,
                        suffix: "%",
                    },
                    {
                        label:
                            "User Active Engagement",
                        value:
                            totalUsers > 0
                                ? 100
                                : 92,
                        suffix: "%",
                    },
                ];

                for (
                    let i = list.length;
                    i < 3;
                    i++
                ) {
                    list.push(defaultMetrics[i]);
                }
            }

            return list;
        }, [
            targets,
            totalVisits,
            completedVisits,
            totalSalesOrders,
            totalUsers,
        ]);

    /**
     * License quota
     */
    const licenseQuota = useMemo(() => {
        const license =
            typedDashboard?.licenseQuota ||
            typedDashboard?.license;

        const max =
            license?.maxLicenses ??
            20;

        const consumed =
            license?.consumedLicenses ??
            totalUsers ??
            orgOverview.users ??
            0;

        const available =
            license?.availableLicenses ??
            Math.max(
                0,
                max - consumed
            );

        const isLimitReached =
            license?.isLimitReached ??
            consumed >= max;

        const percentUsed =
            max > 0
                ? Math.min(
                    100,
                    Math.round(
                        (consumed / max) *
                        100
                    )
                )
                : 0;

        return {
            max,
            consumed,
            available,
            isLimitReached,
            percentUsed,
        };
    }, [
        typedDashboard,
        user,
        totalUsers,
        orgOverview,
    ]);

    /**
     * Recent activity
     */
    const recentActivities =
        useMemo<ActivityItem[]>(() => {
            const list: ActivityItem[] = [];

            const recentOrders =
                typedDashboard?.recentOrders;

            if (
                Array.isArray(recentOrders) &&
                recentOrders.length > 0
            ) {
                recentOrders.forEach(
                    (order) => {
                        list.push({
                            title: `Sales Order #${order.orderNumber ||
                                order.id?.slice(0, 8) ||
                                ""
                                }`,

                            description: `${order.customer?.name ||
                                "Customer"
                                } — Status: ${order.status ||
                                "CONFIRMED"
                                } — ₹${Number(
                                    order.totalAmount || 0
                                ).toLocaleString(
                                    "en-IN"
                                )}`,

                            time: order.createdAt
                                ? dayjs(
                                    order.createdAt
                                ).format(
                                    "MMM D, h:mm A"
                                )
                                : "Recently",

                            completed:
                                order.status ===
                                "APPROVED" ||
                                order.status ===
                                "COMPLETED" ||
                                order.status ===
                                "DELIVERED",
                        });
                    }
                );
            }

            if (list.length === 0) {
                list.push(
                    {
                        title:
                            "System Operational",
                        description: `Enterprise active with ${totalUsers} users across ${totalOrganizations} organizations`,
                        time: "Just now",
                        completed: true,
                    },
                    {
                        title:
                            "Revenue Sync Active",
                        description: `Total aggregated revenue: ₹${Number(
                            revenue
                        ).toLocaleString(
                            "en-IN"
                        )}`,
                        time: "Today",
                        completed: true,
                    },
                    {
                        title:
                            "Field Operations Active",
                        description: `${presentCount} employees logged in today`,
                        time: dayjs().format(
                            "h:mm A"
                        ),
                        completed: true,
                    }
                );
            }

            return list;
        }, [
            typedDashboard?.recentOrders,
            totalUsers,
            totalOrganizations,
            revenue,
            presentCount,
        ]);

    /**
     * Loading
     */
    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator
                    size="large"
                    color="#4F46E5"
                />

                <Text style={styles.loadingText}>
                    Loading dashboard...
                </Text>
            </View>
        );
    }

    /**
     * Error
     */
    // if (error) {
    //     return (
    //         <ErrorState
    //             title="Failed to load dashboard"
    //             message="Unable to fetch executive dashboard data. Please ensure the backend server is running."
    //             onRetry={refresh}
    //         />
    //     );
    // }

    /**
     * Empty
     */
    // const hasData =
    //     dashboard &&
    //     Object.keys(dashboard).length > 0;

    // if (!hasData) {
    //     return (
    //         <EmptyDashboard
    //             title="No Dashboard Data"
    //             description="The dashboard data is not available yet. Data will appear once activities are recorded."
    //             onAction={refresh}
    //         />
    //     );
    // }

    /**
     * Main dashboard
     */
    return (
        <Animated.View
            style={[
                styles.screen,
                {
                    opacity: fadeAnim,
                    transform: [
                        {
                            translateY,
                        },
                    ],
                },
            ]}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={
                    styles.scrollContent
                }
            >
                {/* =====================================================
            SUPER ADMIN HEADER
        ====================================================== */}
                <View style={styles.headerCard}>
                    <View style={styles.headerContent}>
                        <View style={styles.headerBadges}>
                            <View
                                style={
                                    styles.organizationBadge
                                }
                            >
                                <Building2
                                    size={14}
                                    color="#C7D2FE"
                                />

                                <Text
                                    style={
                                        styles.organizationBadgeText
                                    }
                                    numberOfLines={1}
                                >
                                    {organizationName}
                                </Text>
                            </View>

                            <View
                                style={styles.adminBadge}
                            >
                                <CheckCircle2
                                    size={14}
                                    color="#6EE7B7"
                                />

                                <Text
                                    style={styles.adminBadgeText}
                                >
                                    Super Admin Control
                                    Center
                                </Text>
                            </View>
                        </View>

                        <Text
                            style={styles.headerTitle}
                        >
                            Super Admin Executive
                            Dashboard
                        </Text>

                        <Text
                            style={styles.headerSubtitle}
                        >
                            Welcome back 👋,{" "}
                            <Text
                                style={styles.headerName}
                            >
                                {fullName || "Admin"}
                            </Text>{" "}
                            — Live enterprise metrics
                            for{" "}
                            <Text
                                style={
                                    styles.headerOrganization
                                }
                            >
                                {organizationName}
                            </Text>
                        </Text>
                    </View>

                    <Pressable
                        // onPress={refresh}
                        style={({ pressed }) => [
                            styles.refreshButton,
                            pressed &&
                            styles.refreshButtonPressed,
                        ]}
                    >
                        <Sparkles
                            size={17}
                            color="#FCD34D"
                        />

                        <Text
                            style={styles.refreshText}
                        >
                            Refresh Data
                        </Text>
                    </Pressable>
                </View>

                {/* =====================================================
            LICENSE QUOTA
        ====================================================== */}
                <LicenseQuotaBanner
                    licenseQuota={
                        licenseQuota
                    }
                />

                {/* =====================================================
            ORGANIZATION OVERVIEW
        ====================================================== */}
                <OrganizationOverviewCard
                    orgOverview={orgOverview}
                />

                {/* =====================================================
            KPI STATS
        ====================================================== */}
                {/* <StatsGrid>
                    <StatCard
                        title="Assigned Customers"
                        value={totalCustomers}
                        icon={UserCheck}
                        color="#3B82F6"
                    />

                    <StatCard
                        title="Total Sales Orders"
                        value={totalSalesOrders}
                        icon={ShoppingCart}
                        color="#06B6D4"
                    />

                    <StatCard
                        title="Today's Revenue"
                        value={todaysRevenue}
                        icon={IndianRupee}
                        color="#F59E0B"
                        format="currency"
                    />

                    <StatCard
                        title="Total Revenue"
                        value={revenue}
                        icon={IndianRupee}
                        color="#059669"
                        format="currency"
                    />
                </StatsGrid> */}

                {/* =====================================================
            REVENUE ANALYTICS
        ====================================================== */}
                <SectionCard
                    title="System Revenue Analytics"
                    subtitle="Real-time monthly revenue trajectory across all organizations"
                    // icon={TrendingUp}
                >
                    <View
                        style={
                            styles.growthContainer
                        }
                    >
                        <TrendingUp
                            size={15}
                            color={
                                revenueGrowthInfo.isPositive
                                    ? "#047857"
                                    : "#B45309"
                            }
                        />

                        <Text
                            style={[
                                styles.growthText,
                                {
                                    color:
                                        revenueGrowthInfo.isPositive
                                            ? "#047857"
                                            : "#B45309",
                                },
                            ]}
                        >
                            {revenueGrowthInfo.text}
                        </Text>
                    </View>

                    <RevenueChart
                        data={revenueData}
                    />
                </SectionCard>

                {/* =====================================================
            ACTIVITY
        ====================================================== */}
                {/* <SectionCard
                    title="System Activity Feed"
                    subtitle="Real-time operations & transaction log across organizations"
                    // icon={Activity}
                >
                    <ActivityTimeline
                        activities={
                            recentActivities
                        }
                    />
                </SectionCard> */}

                {/* =====================================================
            FOOTER
        ====================================================== */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        © 2026 IT360 Sales Force
                        Automation Platform
                    </Text>

                    <Text style={styles.footerText}>
                        Enterprise Management
                    </Text>
                </View>
            </ScrollView>
        </Animated.View>
    );
}

/* ============================================================
   STYLES
============================================================ */

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },

    scrollContent: {
        padding: 16,
        paddingBottom: 40,
        gap: 16,
    },

    centerContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F8FAFC",
    },

    loadingText: {
        marginTop: 12,
        color: "#64748B",
        fontSize: 14,
        fontWeight: "500",
    },

    /* Header */

    headerCard: {
        backgroundColor: "#1E1B4B",
        borderRadius: 18,
        padding: 20,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#4338CA",
    },

    headerContent: {
        marginBottom: 16,
    },

    headerBadges: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 12,
    },

    organizationBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "rgba(99,102,241,0.30)",
        borderWidth: 1,
        borderColor: "rgba(165,180,252,0.30)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        maxWidth: "100%",
    },

    organizationBadgeText: {
        color: "#C7D2FE",
        fontSize: 11,
        fontWeight: "700",
        flexShrink: 1,
    },

    adminBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor:
            "rgba(16,185,129,0.20)",
        borderWidth: 1,
        borderColor:
            "rgba(110,231,183,0.30)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },

    adminBadgeText: {
        color: "#6EE7B7",
        fontSize: 11,
        fontWeight: "700",
    },

    headerTitle: {
        color: "#FFFFFF",
        fontSize: 26,
        lineHeight: 32,
        fontWeight: "800",
        marginBottom: 8,
    },

    headerSubtitle: {
        color: "#C7D2FE",
        fontSize: 13,
        lineHeight: 20,
    },

    headerName: {
        color: "#FFFFFF",
        fontWeight: "700",
    },

    headerOrganization: {
        color: "#FCD34D",
        fontWeight: "800",
    },

    refreshButton: {
        alignSelf: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 14,
        paddingVertical: 11,
        borderRadius: 12,
        backgroundColor:
            "rgba(255,255,255,0.10)",
        borderWidth: 1,
        borderColor:
            "rgba(255,255,255,0.20)",
    },

    refreshButtonPressed: {
        backgroundColor:
            "rgba(255,255,255,0.20)",
    },

    refreshText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "600",
    },

    /* License */

    licenseContainer: {
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
    },

    licenseTop: {
        gap: 14,
    },

    licenseInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    licenseIcon: {
        width: 48,
        height: 48,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
    },

    licenseTextContainer: {
        flex: 1,
    },

    licenseTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 7,
        marginBottom: 5,
    },

    licenseTitle: {
        color: "#64748B",
        fontSize: 10,
        fontWeight: "800",
        letterSpacing: 0.6,
    },

    seatBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },

    seatBadgeText: {
        fontSize: 10,
        fontWeight: "800",
    },

    licenseConsumed: {
        color: "#1E293B",
        fontSize: 14,
        fontWeight: "800",
    },

    licenseHint: {
        color: "#64748B",
        fontSize: 11,
        marginTop: 2,
    },

    licenseDescription: {
        color: "#64748B",
        fontSize: 11,
        fontWeight: "500",
        lineHeight: 16,
    },

    warningMessage: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 7,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#FEE2E2",
    },

    warningMessageText: {
        flex: 1,
        color: "#B91C1C",
        fontSize: 11,
        fontWeight: "600",
        lineHeight: 16,
    },

    progressBackground: {
        height: 9,
        borderRadius: 10,
        backgroundColor: "#E2E8F0",
        overflow: "hidden",
        marginTop: 14,
    },

    progressFill: {
        height: "100%",
        borderRadius: 10,
    },

    /* Organization */

    organizationGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },

    organizationItem: {
        width:
            (SCREEN_WIDTH - 32 - 20) / 3,
        minWidth: 100,
        flexGrow: 1,
        minHeight: 100,
        padding: 12,
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: "space-between",
    },

    organizationHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
    },

    organizationLabel: {
        flex: 1,
        color: "#475569",
        fontSize: 9,
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: 0.4,
    },

    organizationValue: {
        color: "#0F172A",
        fontSize: 24,
        fontWeight: "900",
        marginTop: 8,
    },

    /* Revenue */

    growthContainer: {
        alignSelf: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "#ECFDF5",
        borderWidth: 1,
        borderColor: "#A7F3D0",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginBottom: 8,
    },

    growthText: {
        fontSize: 11,
        fontWeight: "800",
    },

    chartWrapper: {
        width: "100%",
        marginTop: 4,
    },

    chartLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 8,
    },

    chartLabel: {
        color: "#64748B",
        fontSize: 9,
        fontWeight: "600",
    },

    chartSummary: {
        marginTop: 16,
        paddingTop: 14,
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    chartSummaryLabel: {
        color: "#64748B",
        fontSize: 12,
        fontWeight: "600",
    },

    chartSummaryValue: {
        color: "#0F172A",
        fontSize: 18,
        fontWeight: "900",
    },

    /* Footer */

    footer: {
        alignItems: "center",
        paddingTop: 20,
        marginTop: 4,
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
    },

    footerText: {
        color: "#64748B",
        fontSize: 10,
        textAlign: "center",
        lineHeight: 17,
    },
});

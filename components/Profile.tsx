import React from "react";
import {
    // Image,
    // Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import {
    // ArrowLeft,
    Briefcase,
    CalendarDays,
    // ChevronRight,
    // Edit3,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
    User,
} from "lucide-react-native";
import LogoutButton from "./login/logout";

const USER = {
    name: "RAHUL AHIRWAL",
    firstName: "Rahul",
    lastName: "Ahirwal",
    designation: "Chief Technology Officer",
    department: "Technology & Innovation",
    employeeId: "ITSL-001",
    email: "rahul@itsoftlab.com",
    phone: "+91 98765 43210",
    dob: "15 August 1995",
    gender: "Male",
    bloodGroup: "B+",
    joiningDate: "01 January 2020",
    location: "Indore, Madhya Pradesh, India",
    reportingTo: "Managing Director",
    employmentType: "Full Time",
    status: "Active",
    bio: "Technology leader focused on building scalable products, modern software architecture and innovative digital solutions.",
};

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                {/* Header */}
                {/* <View style={styles.header}>
                    <Pressable style={styles.backButton}>
                        <ArrowLeft size={20} color="#0F172A" />
                    </Pressable>

                    <Text style={styles.headerTitle}>My Profile</Text>

                    <Pressable style={styles.editButton}>
                        <Edit3 size={18} color="#2563EB" />
                    </Pressable>
                </View> */}

                {/* Profile Hero */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>RA</Text>
                        </View>

                        <View style={styles.onlineDot} />
                    </View>

                    <Text style={styles.name}>{USER.name}</Text>

                    <Text style={styles.designation}>
                        {USER.designation}
                    </Text>

                    <Text style={styles.department}>
                        {USER.department}
                    </Text>

                    <View style={styles.statusBadge}>
                        <View style={styles.statusDot} />
                        <Text style={styles.statusText}>
                            {USER.status}
                        </Text>
                    </View>
                </View>

                {/* Quick Info */}
                <View style={styles.quickInfoCard}>
                    <QuickInfo
                        icon={<Mail size={19} color="#2563EB" />}
                        label="Email"
                        value={USER.email}
                    />

                    <View style={styles.divider} />

                    <QuickInfo
                        icon={<Phone size={19} color="#2563EB" />}
                        label="Phone"
                        value={USER.phone}
                    />

                    <View style={styles.divider} />

                    <QuickInfo
                        icon={<MapPin size={19} color="#2563EB" />}
                        label="Location"
                        value={USER.location}
                    />
                </View>

                {/* About */}
                <Section title="About">
                    <Text style={styles.bio}>{USER.bio}</Text>
                </Section>

                {/* Personal Information */}
                <Section title="Personal Information">
                    <InfoRow
                        icon={<User size={18} color="#64748B" />}
                        label="Full Name"
                        value={USER.name}
                    />

                    <InfoRow
                        icon={
                            <CalendarDays
                                size={18}
                                color="#64748B"
                            />
                        }
                        label="Date of Birth"
                        value={USER.dob}
                    />

                    <InfoRow
                        icon={<User size={18} color="#64748B" />}
                        label="Gender"
                        value={USER.gender}
                    />

                    <InfoRow
                        icon={<ShieldCheck size={18} color="#64748B" />}
                        label="Blood Group"
                        value={USER.bloodGroup}
                        last
                    />
                </Section>

                {/* Work Information */}
                <Section title="Work Information">
                    <InfoRow
                        icon={<Briefcase size={18} color="#64748B" />}
                        label="Employee ID"
                        value={USER.employeeId}
                    />

                    <InfoRow
                        icon={<Briefcase size={18} color="#64748B" />}
                        label="Designation"
                        value={USER.designation}
                    />

                    <InfoRow
                        icon={<Briefcase size={18} color="#64748B" />}
                        label="Department"
                        value={USER.department}
                    />

                    <InfoRow
                        icon={
                            <CalendarDays
                                size={18}
                                color="#64748B"
                            />
                        }
                        label="Joining Date"
                        value={USER.joiningDate}
                    />

                    <InfoRow
                        icon={<User size={18} color="#64748B" />}
                        label="Employment Type"
                        value={USER.employmentType}
                    />

                    <InfoRow
                        icon={<User size={18} color="#64748B" />}
                        label="Reporting To"
                        value={USER.reportingTo}
                        last
                    />
                </Section>

                {/* Contact */}
                <Section title="Contact Information">
                    <InfoRow
                        icon={<Mail size={18} color="#64748B" />}
                        label="Email Address"
                        value={USER.email}
                    />

                    <InfoRow
                        icon={<Phone size={18} color="#64748B" />}
                        label="Phone Number"
                        value={USER.phone}
                        last
                    />
                </Section>

                {/* Account */}
                {/* <Section title="Account">
                    <Pressable style={styles.accountRow}>
                        <View style={styles.accountIcon}>
                            <ShieldCheck
                                size={20}
                                color="#2563EB"
                            />
                        </View>

                        <View style={styles.accountText}>
                            <Text style={styles.accountTitle}>
                                Account & Security
                            </Text>

                            <Text style={styles.accountSubtitle}>
                                Password, authentication and security
                            </Text>
                        </View>

                        <ChevronRight
                            size={20}
                            color="#94A3B8"
                        />
                    </Pressable>

                    <Pressable style={styles.accountRow}>
                        <View style={styles.accountIcon}>
                            <Edit3
                                size={20}
                                color="#2563EB"
                            />
                        </View>

                        <View style={styles.accountText}>
                            <Text style={styles.accountTitle}>
                                Edit Profile
                            </Text>

                            <Text style={styles.accountSubtitle}>
                                Update your personal information
                            </Text>
                        </View>

                        <ChevronRight
                            size={20}
                            color="#94A3B8"
                        />
                    </Pressable>
                </Section> */}
                <LogoutButton/>

                {/* Footer */}
                <Text style={styles.footer}>
                    ITSOFTLAB360 • Profile
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

/* ============================================================
   COMPONENTS
============================================================ */

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>

            <View style={styles.sectionCard}>{children}</View>
        </View>
    );
}

function QuickInfo({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <View style={styles.quickInfoRow}>
            <View style={styles.quickIcon}>{icon}</View>

            <View style={styles.quickText}>
                <Text style={styles.quickLabel}>{label}</Text>
                <Text style={styles.quickValue}>{value}</Text>
            </View>
        </View>
    );
}

function InfoRow({
    icon,
    label,
    value,
    last = false,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    last?: boolean;
}) {
    return (
        <View
            style={[
                styles.infoRow,
                !last && styles.infoRowBorder,
            ]}
        >
            <View style={styles.infoIcon}>{icon}</View>

            <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value}</Text>
            </View>
        </View>
    );
}

/* ============================================================
   STYLES
============================================================ */

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },

    container: {
        padding: 16,
        paddingBottom: 40,
    },

    header: {
        height: 52,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },

    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "800",
        color: "#0F172A",
    },

    editButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#EFF6FF",
        alignItems: "center",
        justifyContent: "center",
    },

    /* Profile */

    profileCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    avatarContainer: {
        position: "relative",
        marginBottom: 14,
    },

    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: "#DBEAFE",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 4,
        borderColor: "#EFF6FF",
    },

    avatarText: {
        fontSize: 30,
        fontWeight: "900",
        color: "#2563EB",
    },

    onlineDot: {
        position: "absolute",
        right: 3,
        bottom: 5,
        width: 19,
        height: 19,
        borderRadius: 10,
        backgroundColor: "#22C55E",
        borderWidth: 3,
        borderColor: "#FFFFFF",
    },

    name: {
        fontSize: 23,
        fontWeight: "900",
        color: "#0F172A",
        textAlign: "center",
    },

    designation: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: "700",
        color: "#2563EB",
        textAlign: "center",
    },

    department: {
        marginTop: 3,
        fontSize: 12,
        color: "#64748B",
        textAlign: "center",
    },

    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
        paddingHorizontal: 11,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: "#ECFDF5",
    },

    statusDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: "#16A34A",
        marginRight: 6,
    },

    statusText: {
        fontSize: 11,
        fontWeight: "800",
        color: "#15803D",
    },

    /* Quick Info */

    quickInfoCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        marginTop: 14,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },

    quickInfoRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4,
    },

    quickIcon: {
        width: 40,
        height: 40,
        borderRadius: 11,
        backgroundColor: "#EFF6FF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    quickText: {
        flex: 1,
    },

    quickLabel: {
        fontSize: 10,
        fontWeight: "700",
        color: "#94A3B8",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },

    quickValue: {
        marginTop: 2,
        fontSize: 13,
        fontWeight: "600",
        color: "#334155",
    },

    divider: {
        height: 1,
        backgroundColor: "#F1F5F9",
        marginVertical: 12,
    },

    /* Sections */

    section: {
        marginTop: 18,
    },

    sectionTitle: {
        marginBottom: 9,
        marginLeft: 3,
        fontSize: 14,
        fontWeight: "800",
        color: "#0F172A",
    },

    sectionCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        overflow: "hidden",
    },

    bio: {
        paddingVertical: 17,
        fontSize: 13,
        lineHeight: 21,
        color: "#64748B",
    },

    /* Info rows */

    infoRow: {
        minHeight: 67,
        flexDirection: "row",
        alignItems: "center",
    },

    infoRowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },

    infoIcon: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: "#F8FAFC",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    infoContent: {
        flex: 1,
    },

    infoLabel: {
        fontSize: 10,
        fontWeight: "700",
        color: "#94A3B8",
        textTransform: "uppercase",
        letterSpacing: 0.4,
    },

    infoValue: {
        marginTop: 3,
        fontSize: 13,
        fontWeight: "600",
        color: "#334155",
    },

    /* Account */

    accountRow: {
        minHeight: 72,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
    },

    accountIcon: {
        width: 40,
        height: 40,
        borderRadius: 11,
        backgroundColor: "#EFF6FF",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },

    accountText: {
        flex: 1,
    },

    accountTitle: {
        fontSize: 13,
        fontWeight: "800",
        color: "#0F172A",
    },

    accountSubtitle: {
        marginTop: 3,
        fontSize: 11,
        color: "#64748B",
    },

    footer: {
        textAlign: "center",
        marginTop: 25,
        fontSize: 10,
        color: "#94A3B8",
    },
});
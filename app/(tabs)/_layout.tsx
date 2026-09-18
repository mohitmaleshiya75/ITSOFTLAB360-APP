import React from "react";
import { Tabs, router, usePathname } from "expo-router";
import {
    Building2,
    LayoutDashboard,
    User,
} from "lucide-react-native";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import {
    StyleSheet,
    Text,
    View,
} from "react-native";

import ApplicationLauncher from "@/components/AppList";

export default function TabLayout() {
    const pathname = usePathname();
    const insets = useSafeAreaInsets();
    const isProfile = pathname.includes("/profile");

    return (
        <SafeAreaProvider>
            <Tabs
                screenOptions={{
                    headerShown: true,


                    header: () => (
                        <View
                            style={[
                                { paddingTop: insets.top+4, }
                                ,
                                styles.header
                            ]}
                        >
                            {/* LEFT */}
                            <View style={styles.headerLeft}>

                                <View style={styles.logo}>
                                    {isProfile ? (
                                        <User
                                            size={22}
                                            color="#FFFFFF"
                                        />
                                    ) : (
                                        <Building2
                                            size={22}
                                            color="#FFFFFF"
                                        />
                                    )}
                                </View>

                                <View>
                                    {isProfile ? (
                                        <>
                                            <Text style={styles.brand}>
                                                My Profile
                                            </Text>

                                            <Text style={styles.headerSubtitle}>
                                                Account & personal information
                                            </Text>
                                        </>
                                    ) : (
                                        <>
                                            <Text style={styles.brand}>
                                                ITSOFTLAB360
                                            </Text>

                                            <Text style={styles.headerSubtitle}>
                                                Unified Business Dashboard
                                            </Text>
                                        </>
                                    )}
                                </View>
                            </View>

                            {/* RIGHT */}
                            <View style={styles.headerRight}>
                                <ApplicationLauncher
                                    onSelectApplication={(application) => {
                                        router.push({
                                            pathname: "/application/[id]",
                                            params: {
                                                id: application.id,
                                            },
                                        });
                                    }}
                                />
                            </View>
                        </View>
                    ),
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Dashboard",

                        tabBarIcon: ({ color, size }) => (
                            <LayoutDashboard
                                size={size}
                                color={color}
                                strokeWidth={2.2}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",

                        tabBarIcon: ({ color, size }) => (
                            <User
                                size={size}
                                color={color}
                                strokeWidth={2.2}
                            />
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    header: {
        minHeight: 76,
        paddingHorizontal: 16,

        flexDirection: "row",
        alignItems: "center",

        // LEFT and RIGHT pushed apart
        justifyContent: "space-between",

        backgroundColor: "#FFFFFF",

        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },

    headerLeft: {
        flexDirection: "row",
        alignItems: "center",

        gap: 11,

        // Allows left side to take available space
        flex: 1,
    },

    headerRight: {
        marginLeft: 12,

        alignItems: "center",
        justifyContent: "center",
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
});
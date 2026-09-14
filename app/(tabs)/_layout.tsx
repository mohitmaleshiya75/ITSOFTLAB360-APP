import { Tabs } from "expo-router";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Truck,
} from "lucide-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0FA4AF",
        tabBarInactiveTintColor: "#64748B",
        tabBarStyle: {
          height: 65,
          paddingTop: 6,
          paddingBottom: 8,
          backgroundColor: "#FFFFFF",
          borderTopColor: "#E2E8F0",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <LayoutDashboard color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="sfa"
        options={{
          title: "SFA",
          tabBarIcon: ({ color, size }) => (
            <BriefcaseBusiness color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="supply-chain"
        options={{
          title: "Supply Chain",
          tabBarIcon: ({ color, size }) => (
            <Truck color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
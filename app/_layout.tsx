import React from "react";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthProvider, useAuth } from "@/components/login/useLogin";
import { Building2 } from "lucide-react-native";

function AppNavigator() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, isLoading } = useAuth();

  /**
   * Show smooth enterprise boot screen while loading stored authentication state
   */
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.logoBadge}>
          <Building2 size={36} color="#FFFFFF" />
        </View>
        <Text style={styles.appName}>ITSOFTLAB360</Text>
        <Text style={styles.loadingSubtitle}>
          Verifying security environment...
        </Text>
        <ActivityIndicator
          size="large"
          color="#3B82F6"
          style={{ marginTop: 24 }}
        />
      </View>
    );
  }

  return (
    <ThemeProvider
      value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen
            name="login"
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
        </Stack.Protected>

        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="application/[id]"
            options={{
              headerShown: false,
              gestureEnabled: true,
            }}
          />
        </Stack.Protected>
      </Stack>

      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
      <AuthProvider>
        <AppNavigator />
      </AuthProvider >
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logoBadge: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  appName: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  loadingSubtitle: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 6,
    fontWeight: "500",
  },
});
import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { AuthProvider, useAuth } from "@/components/login/useLogin";

function AppNavigator() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  

  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  /**
   * Wait until SecureStore authentication
   * has been checked.
   */
  if (!isAuthenticated && !isLoading) {
    console.log("inside login page")
    return (
      <SafeAreaProvider style={[
            {
                paddingTop: insets.top,
            },
        ]}>

      <ThemeProvider
      value={
        colorScheme === "dark"
          ? DarkTheme
          : DefaultTheme
      }
    >
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      </Stack>
    </ThemeProvider>
        </SafeAreaProvider>
    );
  }
  console.log("isAuthenticated",isAuthenticated)
  if(isAuthenticated&&!isLoading){

  return (
    <SafeAreaProvider style={[
            {
                paddingTop: insets.top,
            },
        ]}>

    <ThemeProvider
      value={
        colorScheme === "dark"
          ? DarkTheme
          : DefaultTheme
      }
    >
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        {/* LOGIN */}
        <Stack.Screen
          name="ITSOFTLAB360"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />

        {/* APPLICATION */}
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
          />
      </Stack>

      <StatusBar
        style={colorScheme === "dark" ? "light" : "dark"}
        />
    </ThemeProvider>
        </SafeAreaProvider>
  );
  }
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
  // import React from "react";
  // import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
  // import { Stack } from "expo-router";
  // import { StatusBar } from "expo-status-bar";
  // import "react-native-reanimated";
  
  // import { useColorScheme } from "@/hooks/use-color-scheme";
  
  // export default function RootLayout() {
  //   const colorScheme = useColorScheme();
  
  //   return (
  //     <ThemeProvider
  //       value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
  //     >
  //       <Stack>
  //         <Stack.Screen
  //           name="(tabs)"
  //           options={{ headerShown: false }}
  //         />
  
  //         <Stack.Screen
  //           name="ITSOFTLAB360"
  //           options={{ headerShown: false }}
  //         />
  //       </Stack>
  
  //       <StatusBar style="auto" />
  //     </ThemeProvider>
  //   );
  // }
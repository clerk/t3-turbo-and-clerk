import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";

import "../styles.css";

import { SignInSignUpScreen } from "../screens/signin";
import { TRPCProvider } from "../utils/api";
import { tokenCache } from "../utils/cache";

export default function RootLayout() {
  const publishable_key = Constants.expoConfig?.extra
    ?.CLERK_PUBLISHABLE_KEY as string;
  return (
    <ClerkProvider publishableKey={publishable_key} tokenCache={tokenCache}>
      <SignedIn>
        <TRPCProvider>
          <SafeAreaProvider>
            <Stack
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#f472b6",
                },
              }}
            />
            <StatusBar />
          </SafeAreaProvider>
        </TRPCProvider>
      </SignedIn>
      <SignedOut>
        <SignInSignUpScreen />
      </SignedOut>
    </ClerkProvider>
  );
}

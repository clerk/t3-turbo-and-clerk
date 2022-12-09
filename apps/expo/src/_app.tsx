import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TRPCAuthContext } from "./utils/trpc";

import { HomeScreen } from "./screens/home";
import { SignInScreen } from "./screens/signin";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { tokenCache } from "./utils/cache";

const clerk_frontend_api = "clerk.open.sawfly-58.lcl.dev";

export const App = () => {
  return (
    <ClerkProvider frontendApi={clerk_frontend_api} tokenCache={tokenCache}>
      <SignedIn>
        <TRPCAuthContext>
          <SafeAreaProvider>
            <HomeScreen />
            <StatusBar />
          </SafeAreaProvider>
        </TRPCAuthContext>
      </SignedIn>
      <SignedOut>
        <SignInScreen />
      </SignedOut>
    </ClerkProvider>
  );
};

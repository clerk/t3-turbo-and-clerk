import { useSignUp } from "@clerk/clerk-expo";
import React from "react";
import { Button, View } from "react-native";

import * as AuthSession from "expo-auth-session";

const SignUpWithOAuth = () => {
  const { isLoaded, signUp, setSession } = useSignUp();

  if (!isLoaded) return null;

  const handleSignUpWithDiscordPress = async () => {
    try {
      const redirectUrl = AuthSession.makeRedirectUri({
        path: "/oauth-native-callback",
      });

      await signUp.create({
        strategy: "oauth_discord",
        redirectUrl,
      });

      const {
        verifications: {
          externalAccount: { externalVerificationRedirectURL },
        },
      } = signUp;

      const result = await AuthSession.startAsync({
        authUrl: externalVerificationRedirectURL!.toString(),
        returnUrl: redirectUrl,
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { type, params } = result || {};
      console.log;
      if (type !== "success") {
        throw "Something went wrong during the OAuth flow. Try again.";
      }

      // Get the rotatingTokenNonce from the redirect URL parameters
      const { rotating_token_nonce: rotatingTokenNonce } = params;

      await signUp.reload({ rotatingTokenNonce });

      const { createdSessionId } = signUp;

      if (!createdSessionId) {
        throw "Something went wrong during the Sign in OAuth flow. Please ensure that all sign in requirements are met.";
      }

      await setSession(createdSessionId);

      return;
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
    }
  };

  return (
    <View className="my-8 rounded-lg border-2 border-gray-500 p-4">
      <Button
        title="Sign Up with Discord"
        onPress={handleSignUpWithDiscordPress}
      />
    </View>
  );
};

export default SignUpWithOAuth;

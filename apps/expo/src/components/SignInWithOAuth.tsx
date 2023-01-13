import { useSignUp, useSignIn } from "@clerk/clerk-expo";
import React from "react";
import { Button, View } from "react-native";

import * as AuthSession from "expo-auth-session";

const SignInWithOAuth = () => {
  const { isLoaded, signIn, setSession } = useSignIn();
  const { signUp } = useSignUp();
  if (!isLoaded) return null;

  const handleSignInWithDiscordPress = async () => {
    try {
      const redirectUrl = AuthSession.makeRedirectUri({
        path: "/oauth-native-callback",
      });

      await signIn.create({
        strategy: "oauth_discord",
        redirectUrl,
      });

      const {
        firstFactorVerification: { externalVerificationRedirectURL },
      } = signIn;

      const result = await AuthSession.startAsync({
        authUrl: externalVerificationRedirectURL.toString(),
        returnUrl: redirectUrl,
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { type, params } = result || {};

      if (type !== "success") {
        throw "Something went wrong during the OAuth flow. Try again.";
      }

      // Get the rotatingTokenNonce from the redirect URL parameters
      const { rotating_token_nonce: rotatingTokenNonce } = params;

      await signIn.reload({ rotatingTokenNonce });

      const { createdSessionId } = signIn;

      if (!createdSessionId) {
        if (signIn.firstFactorVerification.status === "transferable") {
          console.log("Didn't have an account transferring");

          await signUp.create({ transfer: true });

          const { rotating_token_nonce: rotatingTokenNonce } = params;

          await signUp.reload({ rotatingTokenNonce });

          const { createdSessionId } = signUp;
          if (!createdSessionId) {
            throw "Something went wrong during the Sign up OAuth flow. Please ensure that all sign up requirements are met.";
          }
          await setSession(createdSessionId);

          return;
        }
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
    <View className="rounded-lg border-2 border-gray-500 p-4">
      <Button
        title="Sign in with Discord"
        onPress={handleSignInWithDiscordPress}
      />
    </View>
  );
};

export default SignInWithOAuth;

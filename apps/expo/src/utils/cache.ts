import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export async function saveToken(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getToken(key: string) {
  const value = await SecureStore.getItemAsync(key);
  return value;
}

// SecureStore is not supported on the web
// https://github.com/expo/expo/issues/7744#issuecomment-611093485
export const tokenCache =
  Platform.OS !== "web"
    ? {
        getToken,
        saveToken,
      }
    : undefined;

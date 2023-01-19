/**
 * URL key for the Clerk auth API. You can find this in your Clerk dashboard:
 * https://dashboard.clerk.dev
 *
 * NOTE: we recommend putting the frontend api key / publishable key here instead of in your .env
 * files for two reasons:
 * 1. It's okay for this to be "public" (CLERK_API_KEY and CLERK_JWT_KEY should
 *    NEVER be public)
 * 2. Parsing the .env file in Metro/Expo runs the risk of including the
 *    variables above that we don't want (and it's obnoxious to do right as a
 *    result)
 */

// CLERK_FRONTEND_API is only for legacy apps
export const CLERK_FRONTEND_API = "";

// FOR CLERK APPS AFTER 1/18/2023 pk_test_XXXXXXXXXXXXXXXXXXXXXXXX
export const CLERK_PUBLISHABLE_KEY = undefined;

if (CLERK_FRONTEND_API === "" && CLERK_PUBLISHABLE_KEY === undefined) {
  throw new Error("CLERK_FRONTEND_API or CLERK_PUBLISHABLE_KEY is not defined");
}
